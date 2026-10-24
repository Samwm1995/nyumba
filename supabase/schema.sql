-- Nyumba ya Wachagga — database schema
-- Run this in Supabase: SQL Editor → New query → paste → Run.

create extension if not exists "pgcrypto";

-- Members (community sign-up). Email is kept private; name/area are public.
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null unique,
  phone text,
  dialect text,
  area text,
  can_record boolean not null default false,
  note text
);

-- Contributions: a word/phrase/proverb/story, optionally with audio.
create table if not exists contributions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('phrase','proverb','story','song','clan','correction')),
  dialect text not null,
  chagga text not null,
  swahili text,
  english text,
  context text,
  topic text,
  contributor_name text not null,
  contributor_area text,
  contributor_contact text,
  speaker_name text,
  audio_path text,
  status text not null default 'pending' check (status in ('pending','verified','rejected')),
  verified_by text[]
);

-- Events: meetups, home visits, ceremonies.
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  starts_at timestamptz not null,
  location text,
  description text,
  dialect text,
  published boolean not null default false
);

-- Row-level security: anyone can submit, only the owner (service role / dashboard) can read private data.
alter table members enable row level security;
alter table contributions enable row level security;
alter table events enable row level security;

create policy "anyone can join" on members for insert with check (true);
create policy "anyone can contribute" on contributions for insert with check (true);
create policy "verified contributions are public" on contributions for select using (status = 'verified');
create policy "published events are public" on events for select using (published);

-- Storage bucket for audio. Create it in Supabase → Storage → New bucket → name: audio, public: yes.
-- Then run:
-- create policy "anyone can upload audio" on storage.objects for insert with check (bucket_id = 'audio');
-- create policy "audio is public" on storage.objects for select using (bucket_id = 'audio');
