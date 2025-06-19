-- Create quotes table if it doesn't exist
CREATE TABLE IF NOT EXISTS quotes (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  urgency VARCHAR(20) NOT NULL DEFAULT 'STANDARD',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_quotes_email ON quotes(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at); 