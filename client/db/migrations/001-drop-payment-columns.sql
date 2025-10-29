-- Migration: drop optional payment columns if they exist
-- Run this in Supabase SQL editor or via psql

ALTER TABLE IF EXISTS public.orders
  DROP COLUMN IF EXISTS cf_payment_id,
  DROP COLUMN IF EXISTS payment_completion_time,
  DROP COLUMN IF EXISTS payment_method,
  DROP COLUMN IF EXISTS updated_at;

-- Verify the table structure after running:
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name='orders';
