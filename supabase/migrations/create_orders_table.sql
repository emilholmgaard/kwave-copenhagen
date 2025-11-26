-- Create orders table
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  order_number text unique not null,
  status text default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount decimal(10, 2) not null,
  currency text default 'DKK',
  items jsonb not null, -- Array of order items
  shipping_address jsonb,
  billing_address jsonb,
  payment_method text,
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table orders enable row level security;

-- Policy: Users can only view their own orders
create policy "Users can view own orders" on orders
  for select using (auth.uid() = user_id);

-- Policy: Users can insert their own orders
create policy "Users can insert own orders" on orders
  for insert with check (auth.uid() = user_id);

-- Create index for faster queries
create index orders_user_id_idx on orders(user_id);
create index orders_created_at_idx on orders(created_at desc);
create index orders_order_number_idx on orders(order_number);

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updated_at
create trigger update_orders_updated_at
  before update on orders
  for each row
  execute function update_updated_at_column();

