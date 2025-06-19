import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import pool from '@/lib/db';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, address, urgency, notes } = await req.json();

    if (!firstName || !lastName || !email || !phone || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate unique IDs
    const customerId = `customer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const quoteId = `quote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const now = new Date();
    
    // First, create the customer record
    const customerQuery = `
      INSERT INTO customers (id, "firstName", "lastName", email, phone, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;
    
    const customerValues = [customerId, firstName, lastName, email, phone, now, now];
    
    const customerResult = await pool.query(customerQuery, customerValues);
    const savedCustomerId = customerResult.rows[0].id;
    
    console.log(`Customer created with ID: ${savedCustomerId}`);
    
    // Then, create the quote record
    const quoteQuery = `
      INSERT INTO quotes (
        id, 
        "customerId", 
        "installationAddress", 
        status, 
        urgency, 
        "customerNotes", 
        "createdAt", 
        "updatedAt",
        "hasLandings",
        "needsHandrails"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `;
    
    const quoteValues = [
      quoteId,
      savedCustomerId,
      address,
      'PENDING',
      urgency || 'STANDARD',
      notes || null,
      now,
      now,
      false, // hasLandings - default to false
      true   // needsHandrails - default to true for safety
    ];
    
    const quoteResult = await pool.query(quoteQuery, quoteValues);
    const savedQuoteId = quoteResult.rows[0].id;
    
    console.log(`Quote saved to database with ID: ${savedQuoteId}`);

    // Plain text email bodies
    const confirmationText = `Hi ${firstName},\n\nWe've received your request for a wheelchair ramp quote and our team is already on it! We understand the urgency and importance of your needs, and we're committed to providing you with a fast, no-obligation quote.\n\nYou can expect to hear from us within the next 24 hours. In the meantime, if you have any immediate questions, please don't hesitate to call us at (940) 536-9626.\n\nThank you for choosing Same Day Ramps.`;
    const notificationText = `New Quote Request (ID: ${savedQuoteId}):\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone: ${phone}\nInstallation Address: ${address}\nUrgency: ${urgency || 'STANDARD'}\nNotes: ${notes || 'None'}\n\nPlease follow up as soon as possible.`;

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'quote@samedayramps.com',
      to: email,
      subject: 'Your Quote Request has Been Received!',
      text: confirmationText,
    });

    // Send notification email to the admin
    await resend.emails.send({
      from: 'notification@samedayramps.com',
      to: 'ty@samedayramps.com',
      subject: `New Quote Request from ${firstName} ${lastName}`,
      text: notificationText,
    });

    return NextResponse.json({ 
      message: 'Quote saved and emails sent successfully',
      quoteId: savedQuoteId,
      customerId: savedCustomerId
    }, { status: 200 });
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json({ error: 'Error processing quote request' }, { status: 500 });
  }
} 