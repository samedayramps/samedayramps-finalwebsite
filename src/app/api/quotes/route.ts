import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        q.id,
        q."installationAddress",
        q.status,
        q.urgency,
        q."customerNotes",
        q."createdAt",
        q."estimatedCost",
        q."estimatedHeight",
        q."estimatedLength",
        c."firstName",
        c."lastName",
        c.email,
        c.phone
      FROM quotes q
      JOIN customers c ON q."customerId" = c.id
      ORDER BY q."createdAt" DESC
    `);
    
    // Transform the data to match the expected format
    const transformedQuotes = result.rows.map(quote => {
      return {
        id: quote.id,
        firstName: quote.firstName || '',
        lastName: quote.lastName || '',
        email: quote.email || '',
        phone: quote.phone || '',
        address: quote.installationAddress,
        urgency: quote.urgency,
        notes: quote.customerNotes,
        status: quote.status,
        createdAt: quote.createdAt,
        estimatedCost: quote.estimatedCost,
        estimatedHeight: quote.estimatedHeight,
        estimatedLength: quote.estimatedLength
      };
    });
    
    return NextResponse.json({ quotes: transformedQuotes }, { status: 200 });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ error: 'Error fetching quotes' }, { status: 500 });
  }
} 