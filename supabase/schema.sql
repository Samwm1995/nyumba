-- Nyumba ya Wachagga — database schema v2 (offices, roles, approvals)
-- Run in Supabase → SQL Editor → New query → paste → Run.

create extension if not exists "pgcrypto";

-- ───────────────────────── Roles ─────────────────────────
-- admin > finance > editor > verifier (per dialect) > contributor > member/visitor
create type app_role as enum ('admin','finance','editor','verifier','contributor','partner');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  name text not null default '',
  phone text,
  dialect text,                      -- vunjo | machame | kibosho | rombo | other
  area text,
  audience text not null default 'chagga' check (audience in ('chagga','visitor')),
  country text
);

create table user_roles (
  user_id uuid references profiles(id) on delete cascade,
  role app_role not null,
  dialect text,                      -- for verifier: which dialect they may approve (null = all)
  granted_by uuid references profiles(id),
  granted_at timestamptz not null default now(),
  primary key (user_id, role, dialect)
);

create or replace function has_role(r app_role, d text default null) returns boolean language sql stable as $$
  select exists (
    select 1 from user_roles ur
    where ur.user_id = auth.uid() and ur.role = r and (ur.dialect is null or d is null or ur.dialect = d)
  ) or exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin');
$$;

-- ───────────────────────── Memberships & payments ─────────────────────────
create table memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  tier text not null check (tier in ('meku','mangi','chifu','friend','friend_plus')),
  starts_on date not null default current_date,
  expires_on date not null,
  status text not null default 'active' check (status in ('pending','active','lapsed','cancelled')),
  activated_by uuid references profiles(id),
  created_at timestamptz not null default now()
);
create index on memberships (user_id, expires_on desc);

create or replace function is_active_member() returns boolean language sql stable as $$
  select exists (select 1 from memberships where user_id = auth.uid() and status = 'active' and expires_on >= current_date);
$$;

create table payments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'selcom' check (source in ('selcom','card','cash','bank','other')),
  reference text unique,             -- Selcom transaction id
  payer_name text,
  payer_phone text,
  amount numeric(12,2) not null,
  currency text not null default 'TZS',
  paid_at timestamptz,
  matched_user uuid references profiles(id),
  matched_membership uuid references memberships(id),
  purpose text,                      -- membership | sponsorship | donation | event | trip
  status text not null default 'unmatched' check (status in ('unmatched','matched','refunded')),
  notes text
);

-- ───────────────────────── Content & approvals ─────────────────────────
create table contributions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  contributor uuid references profiles(id),
  kind text not null check (kind in ('phrase','proverb','story','song','clan','correction','attraction')),
  dialect text not null,
  chagga text not null,
  swahili text,
  english text,
  context text,
  topic text,
  speaker_name text,
  audio_path text,                   -- storage: audio/<dialect>/<id>.webm
  status text not null default 'pending' check (status in ('pending','approved_1','verified','rejected','published')),
  rejected_reason text
);

create table approvals (
  id uuid primary key default gen_random_uuid(),
  contribution_id uuid not null references contributions(id) on delete cascade,
  verifier uuid not null references profiles(id),
  decision text not null check (decision in ('approve','reject')),
  note text,
  created_at timestamptz not null default now(),
  unique (contribution_id, verifier)
);

-- two distinct verifier approvals → verified; one rejection → rejected
create or replace function apply_approval() returns trigger language plpgsql security definer as $$
declare n int;
begin
  if new.decision = 'reject' then
    update contributions set status = 'rejected', rejected_reason = new.note where id = new.contribution_id;
  else
    select count(*) into n from approvals where contribution_id = new.contribution_id and decision = 'approve';
    update contributions set status = case when n >= 2 then 'verified' else 'approved_1' end where id = new.contribution_id and status in ('pending','approved_1');
  end if;
  return new;
end $$;
create trigger trg_apply_approval after insert on approvals for each row execute function apply_approval();

create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null, starts_at timestamptz not null, location text, description text, dialect text,
  ticket_price numeric(12,2), published boolean not null default false, created_by uuid references profiles(id)
);

create table sponsors (
  id uuid primary key default gen_random_uuid(),
  company text not null, package text not null, amount numeric(12,2), dialect text, section text,
  logo_path text, contact_name text, contact text,
  status text not null default 'proposed' check (status in ('proposed','agreed','paid','live','ended')),
  starts_on date, ends_on date, created_by uuid references profiles(id)
);

create table leads (                 -- trip & climber leads for Flightfront
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid references profiles(id),
  name text, contact text, country text, travel_date date, operator text, interest text, source text,
  status text not null default 'new' check (status in ('new','contacted','quoted','booked','lost')),
  owner uuid references profiles(id), notes text
);

create table audit_log (
  id bigserial primary key,
  at timestamptz not null default now(),
  actor uuid,
  action text not null,
  entity text, entity_id text, detail jsonb
);

-- ───────────────────────── Row-level security ─────────────────────────
alter table profiles enable row level security;
alter table user_roles enable row level security;
alter table memberships enable row level security;
alter table payments enable row level security;
alter table contributions enable row level security;
alter table approvals enable row level security;
alter table events enable row level security;
alter table sponsors enable row level security;
alter table leads enable row level security;
alter table audit_log enable row level security;

-- profiles: own row; editors/admin read all
create policy "own profile" on profiles for select using (id = auth.uid() or has_role('editor') or has_role('finance'));
create policy "update own profile" on profiles for update using (id = auth.uid());
create policy "insert own profile" on profiles for insert with check (id = auth.uid());

-- roles: readable by self; only admin writes
create policy "see own roles" on user_roles for select using (user_id = auth.uid() or has_role('admin'));
create policy "admin manages roles" on user_roles for all using (has_role('admin')) with check (has_role('admin'));

-- memberships: own; finance/admin all
create policy "own membership" on memberships for select using (user_id = auth.uid() or has_role('finance'));
create policy "finance manages memberships" on memberships for all using (has_role('finance')) with check (has_role('finance'));

-- payments: finance only
create policy "finance payments" on payments for all using (has_role('finance')) with check (has_role('finance'));

-- contributions: anyone signed in can submit; own rows visible; verifiers see their dialect; published rows public
create policy "public published" on contributions for select using (status = 'published');
create policy "own contributions" on contributions for select using (contributor = auth.uid());
create policy "verifier reads dialect queue" on contributions for select using (has_role('verifier', dialect) or has_role('editor'));
create policy "submit contribution" on contributions for insert with check (auth.uid() is not null and contributor = auth.uid());
create policy "edit own pending" on contributions for update using (contributor = auth.uid() and status = 'pending');
create policy "editor manages" on contributions for update using (has_role('editor'));

-- approvals: verifiers of that dialect, not on own contribution
create policy "verifier approves" on approvals for insert with check (
  exists (select 1 from contributions c where c.id = contribution_id and has_role('verifier', c.dialect) and c.contributor is distinct from auth.uid())
);
create policy "read approvals" on approvals for select using (has_role('verifier') or has_role('editor'));

-- events: public when published; editor manages
create policy "public events" on events for select using (published or has_role('editor'));
create policy "editor events" on events for all using (has_role('editor')) with check (has_role('editor'));

-- sponsors: live ones public (company, package, logo); finance/admin manage
create policy "public sponsors" on sponsors for select using (status = 'live' or has_role('finance'));
create policy "finance sponsors" on sponsors for all using (has_role('finance')) with check (has_role('finance'));

-- leads: partner (Flightfront) + admin
create policy "partner leads" on leads for all using (has_role('partner')) with check (has_role('partner'));
create policy "create lead" on leads for insert with check (true);

-- audit: admin reads; inserts via service role only
create policy "admin audit" on audit_log for select using (has_role('admin'));

-- ───────────────────────── Storage ─────────────────────────
-- Buckets (create in Storage UI): audio (private), members (private: premium PDFs/audio), logos (public)
-- Then:
-- create policy "contributor uploads audio" on storage.objects for insert with check (bucket_id = 'audio' and auth.uid() is not null);
-- create policy "verifiers read audio" on storage.objects for select using (bucket_id = 'audio' and (has_role('verifier') or has_role('editor')));
-- create policy "members read premium" on storage.objects for select using (bucket_id = 'members' and is_active_member());
-- create policy "public logos" on storage.objects for select using (bucket_id = 'logos');

-- ───────────────────────── Bootstrap ─────────────────────────
-- After your first login, make yourself admin (replace the email):
-- insert into user_roles (user_id, role) select id, 'admin' from auth.users where email = 'smakundi91@gmail.com';
-- insert into user_roles (user_id, role) select id, 'finance' from auth.users where email = 'smakundi91@gmail.com';
-- insert into user_roles (user_id, role) select id, 'editor' from auth.users where email = 'smakundi91@gmail.com';
-- insert into user_roles (user_id, role) select id, 'partner' from auth.users where email = 'smakundi91@gmail.com';
