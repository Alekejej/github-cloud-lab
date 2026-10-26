-- AX Studio: schemat początkowy.
-- Wszystkie kwoty przechowujemy w groszach (bigint), żeby uniknąć błędów zaokrągleń.
-- Każdy wiersz należy do zalogowanego użytkownika (owner_id) i jest chroniony przez RLS.

create table public.company_profiles (
  owner_id uuid primary key references auth.users (id) on delete cascade default auth.uid(),
  name text not null default '',
  nip text not null default '',
  address text not null default '',
  bank_account text not null default '',
  email text not null default '',
  phone text not null default '',
  updated_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  name text not null check (length(trim(name)) > 0),
  nip text not null default '',
  phone text not null default '',
  email text not null default '',
  address text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now()
);
create index clients_owner_idx on public.clients (owner_id, name);

create type public.invoice_status as enum ('unpaid', 'paid');

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  client_id uuid not null references public.clients (id) on delete restrict,
  number text not null,
  issue_date date not null default current_date,
  sale_date date not null default current_date,
  due_date date not null,
  status public.invoice_status not null default 'unpaid',
  paid_at date,
  net_total bigint not null default 0,
  vat_total bigint not null default 0,
  gross_total bigint not null default 0,
  notes text not null default '',
  created_at timestamptz not null default now(),
  unique (owner_id, number)
);
create index invoices_owner_idx on public.invoices (owner_id, issue_date desc);

create table public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  invoice_id uuid not null references public.invoices (id) on delete cascade,
  position int not null,
  description text not null,
  quantity numeric(12, 3) not null check (quantity > 0),
  unit text not null default 'szt.',
  unit_price_net bigint not null check (unit_price_net >= 0),
  vat_rate int not null check (vat_rate in (0, 5, 8, 23)),
  net bigint not null,
  vat bigint not null,
  gross bigint not null
);
create index invoice_items_invoice_idx on public.invoice_items (invoice_id, position);

create type public.transaction_kind as enum ('income', 'expense');

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  kind public.transaction_kind not null,
  occurred_on date not null default current_date,
  amount bigint not null check (amount > 0),
  description text not null,
  client_id uuid references public.clients (id) on delete set null,
  invoice_id uuid references public.invoices (id) on delete set null,
  created_at timestamptz not null default now()
);
create index transactions_owner_idx on public.transactions (owner_id, occurred_on desc);

create table public.reminders (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  title text not null check (length(trim(title)) > 0),
  due_on date not null,
  client_id uuid references public.clients (id) on delete set null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);
create index reminders_owner_idx on public.reminders (owner_id, done, due_on);

-- Row Level Security: użytkownik widzi i zmienia wyłącznie własne dane.
do $$
declare t text;
begin
  foreach t in array array['company_profiles', 'clients', 'invoices', 'invoice_items', 'transactions', 'reminders']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format(
      'create policy "owner_all" on public.%I for all to authenticated
         using (owner_id = (select auth.uid()))
         with check (owner_id = (select auth.uid()))', t);
  end loop;
end $$;
