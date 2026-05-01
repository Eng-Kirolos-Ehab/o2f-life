-- O2F comments system
-- Run this file once in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  service text,
  comment text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  rating int not null default 5 check (rating between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists comments_set_updated_at on public.comments;
create trigger comments_set_updated_at
before update on public.comments
for each row execute function public.set_updated_at();

alter table public.comments enable row level security;
alter table public.admin_users enable row level security;

-- Public website: show only approved comments.
drop policy if exists comments_public_select_approved on public.comments;
create policy comments_public_select_approved
on public.comments
for select
to anon
using (status = 'approved');

-- Public website: visitors can submit pending comments only.
drop policy if exists comments_public_insert_pending on public.comments;
create policy comments_public_insert_pending
on public.comments
for insert
to anon
with check (status = 'pending');

-- Admin helper: only admins can see their admin record.
drop policy if exists admin_users_self_select on public.admin_users;
create policy admin_users_self_select
on public.admin_users
for select
to authenticated
using (user_id = auth.uid());

-- Admin panel: authenticated admins can read all comments.
drop policy if exists comments_admin_select_all on public.comments;
create policy comments_admin_select_all
on public.comments
for select
to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

-- Admin panel: authenticated admins can add manual approved comments.
drop policy if exists comments_admin_insert on public.comments;
create policy comments_admin_insert
on public.comments
for insert
to authenticated
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

-- Admin panel: authenticated admins can edit, approve, or reject comments.
drop policy if exists comments_admin_update on public.comments;
create policy comments_admin_update
on public.comments
for update
to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

-- Optional seed comments. Safe to remove.
insert into public.comments (name, service, comment, status, rating)
values
('Mariam A.', 'Transformation Plan', 'The follow-up made the difference. I finally understood how to eat without feeling restricted.', 'approved', 5),
('أحمد م.', 'خسارة وزن', 'أكتر حاجة عجبتني إن الخطة كانت واقعية ومش حرمان. المتابعة خلتني أكمل بدل ما أوقف بعد أسبوعين.', 'approved', 5),
('Noura K.', 'Nutrition Coaching', 'Simple, clear, and personalized. The plan fit my work schedule and helped me stay consistent.', 'approved', 5),
('سارة ع.', 'مكافحة الشيخوخة', 'حسيت إن البرنامج مركز على الطاقة والنوم والعادات مش بس الوزن. ده فرق معايا جدًا.', 'approved', 5)
on conflict do nothing;

-- After creating your admin user in Supabase Authentication, run:
-- insert into public.admin_users (user_id)
-- values ('PASTE_AUTH_USER_ID_HERE');
