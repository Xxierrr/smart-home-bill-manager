-- Create bill_splits table to store split information
CREATE TABLE IF NOT EXISTS bill_splits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bill_id UUID REFERENCES bills(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  split_type TEXT NOT NULL CHECK (split_type IN ('equal', 'custom')),
  number_of_people INTEGER NOT NULL CHECK (number_of_people >= 1),
  people JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE bill_splits ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own bill splits" 
  ON bill_splits FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bill splits" 
  ON bill_splits FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bill splits" 
  ON bill_splits FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bill splits" 
  ON bill_splits FOR DELETE 
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS bill_splits_bill_id_idx ON bill_splits(bill_id);
CREATE INDEX IF NOT EXISTS bill_splits_user_id_idx ON bill_splits(user_id);

-- Trigger for updated_at
CREATE TRIGGER update_bill_splits_updated_at 
  BEFORE UPDATE ON bill_splits 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
