import pool from './db';
import fs from 'fs';
import path from 'path';

export const initDatabase = async () => {
  try {
    // Read the schema file
    const schemaPath = path.join(process.cwd(), 'src/lib/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute the schema
    await pool.query(schema);
    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Error initializing database schema:', error);
    throw error;
  }
};

// Initialize database on module load (for development)
if (process.env.NODE_ENV === 'development') {
  initDatabase().catch(console.error);
} 