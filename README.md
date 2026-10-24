# Nyumba ya Wachagga

*Vijana wa Kichagga · Kilimanjaro ni Kwetu*

A community platform for learning Kichagga in its dialects and keeping Chagga culture alive.

- **Jifunze** — dialect lessons (Kivunjo ready; Kimachame, Kikibosho/Kiuru, Kirombo collecting speakers)
- **Linganisha** — the same phrase across dialects, side by side
- **Utamaduni** — customs, history, food, songs & proverbs, clans
- **Changia** — record words, proverbs and stories from your phone; reviewed by two speakers before going live
- **Jumuiya** — member register and events

Built with Next.js + Tailwind, data in Supabase, hosted on Vercel. Installs to the phone home screen as a PWA.

## Content sources

Vunjo lessons are drawn from *Chagga: A Course in the Vunjo Dialect of the KiChagga Language* by Bernard Leeman & Trilas Matesha Lauwo (2nd ed. 2015), used with the authors' permission. Culture articles are community-written; each names its source.

## Running locally

```bash
npm install
cp .env.example .env.local   # add your Supabase keys
npm run dev
```

Without Supabase keys the site runs read-only (lessons, culture); the contribute and join forms show a notice.

## Deploying — step by step (about 20 minutes, all free tiers)

### 1. Supabase (database + audio storage)
1. Go to supabase.com → **New project** (name: nyumba, region: closest to Tanzania — Frankfurt or Mumbai).
2. Open **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, click **Run**.
3. Open **Storage → New bucket**: name `audio`, tick **Public**. Then back in SQL Editor run the two `storage.objects` policies at the bottom of `schema.sql`.
4. Open **Project Settings → API** and copy the **Project URL** and the **anon public** key.

### 2. Vercel (hosting)
1. Go to vercel.com → **Add New → Project** → import this GitHub repo.
2. Under **Environment Variables** add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
3. Click **Deploy**. You get a `*.vercel.app` link immediately; add a custom domain under **Settings → Domains** when ready (e.g. nyumbayawachagga.co.tz).

### 3. Reviewing contributions
Contributions arrive with `status = 'pending'`. In Supabase → **Table Editor → contributions**, listen to the audio (Storage → audio), and set `status` to `verified` once two speakers confirm. Only verified rows are public.

Events: add rows in **Table Editor → events** and tick `published`.

## Adding a dialect's content

Each dialect is a file in `src/content/` (see `vunjo.ts`). Lessons are plain lists of `{ en, ch }` phrases or `{ en, q, yes, no }` drills; add an `audio` URL to any item once a recording is verified. The compare table reads the `salamu` lesson of each dialect, so keep the English prompts identical across dialects.

## Roadmap
- Audio playback from verified contributions directly in lessons
- Swahili UI toggle
- Offline lesson packs
- Moderator dashboard (replace the Supabase table editor)
- Native app wrapper once there is an audience
