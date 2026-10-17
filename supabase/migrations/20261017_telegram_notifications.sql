-- Telegram alerts for o2-f.com (bot @o2flife_bot).
-- The bot token itself is NOT in this file: it is stored once in Vault as 'tg_bot_token'.

-- Who receives the alerts. Managed from inside the bot by admins (approve / remove buttons).
create table public.notify_recipients (
  chat_id bigint primary key,
  name text,
  username text,
  phone text,
  status text not null default 'pending' check (status in ('pending','active','removed')),
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Pre-approved phones: whoever shares one of these in the bot is activated automatically.
create table public.notify_allow_phones (
  phone text primary key,
  is_admin boolean not null default false,
  note text
);
insert into public.notify_allow_phones(phone, is_admin, note)
values ('201279777609', true, 'initial recipient (Kirolos 2026-10-17)');

-- Abuse guard for the public notify endpoint.
create table public.notify_log (
  id bigserial primary key,
  kind text not null,
  ip_hash text,
  ok boolean,
  created_at timestamptz not null default now()
);
create index notify_log_created on public.notify_log(created_at);

-- RLS on, no policies: only the service role used by the edge functions can touch these.
alter table public.notify_recipients enable row level security;
alter table public.notify_allow_phones enable row level security;
alter table public.notify_log enable row level security;

-- Secrets live in Vault; only the service role may read them.
create or replace function public.tg_secret(p_name text) returns text
language sql security definer set search_path = '' as $$
  select decrypted_secret from vault.decrypted_secrets
  where name = p_name and p_name in ('tg_bot_token', 'tg_webhook_secret') limit 1
$$;
revoke all on function public.tg_secret(text) from public, anon, authenticated;
grant execute on function public.tg_secret(text) to service_role;

select vault.create_secret(encode(extensions.gen_random_bytes(24), 'hex'), 'tg_webhook_secret', 'Telegram webhook header secret');
