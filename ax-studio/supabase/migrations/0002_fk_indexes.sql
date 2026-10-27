-- Indeksy na kluczach obcych (zalecenie doradcy wydajności Supabase).
create index invoice_items_owner_idx on public.invoice_items (owner_id);
create index invoices_client_idx on public.invoices (client_id);
create index reminders_client_idx on public.reminders (client_id);
create index transactions_client_idx on public.transactions (client_id);
create index transactions_invoice_idx on public.transactions (invoice_id);
