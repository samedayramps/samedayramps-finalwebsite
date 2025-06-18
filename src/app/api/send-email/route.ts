import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, address } = await req.json();

    if (!firstName || !lastName || !email || !phone || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Plain text email bodies
    const confirmationText = `Hi ${firstName},\n\nWe've received your request for a wheelchair ramp quote and our team is already on it! We understand the urgency and importance of your needs, and we're committed to providing you with a fast, no-obligation quote.\n\nYou can expect to hear from us within the next 24 hours. In the meantime, if you have any immediate questions, please don't hesitate to call us at (940) 536-9626.\n\nThank you for choosing Same Day Ramps.`;
    const notificationText = `New Quote Request:\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone: ${phone}\nInstallation Address: ${address}\n\nPlease follow up as soon as possible.`;

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

    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
} 