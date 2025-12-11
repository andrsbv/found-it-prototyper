-- Add reward_amount column to item_reports table for lost items
ALTER TABLE public.item_reports 
ADD COLUMN reward_amount DECIMAL(10,2) DEFAULT NULL;