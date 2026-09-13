# Baithak

Editorial restaurant website built with React, Vite, Tailwind CSS, and Supabase.

## Local setup

```bash
npm install
cp .env.example .env.local
# Add your Supabase URL and anon key to .env.local
npm run dev
```

Run `supabase/migrations/001_baithak.sql` in the Supabase SQL editor, then create an admin user under **Authentication -> Users**. The public site reads live menu items and settings from Supabase. If the database is empty or unavailable, it keeps the editorial shell usable and shows an explicit seasonal-menu empty state rather than inventing menu data. `/admin` is protected by Supabase email/password auth. Authenticated admins can manage menu items, categories, settings, and upload images to the public `menu-images` bucket.

Only rows with `is_live = true` are exposed by the public menu query and its RLS policy. Keep the anon key in the frontend; never expose a Supabase service-role key.

## Commands

- `npm run build` - typecheck and production build
- `npm run lint` - ESLint
- `npm run dev` - local development server

## Project

This repository is a GitHub Copilot hacking project. See the original project resources in the repository for the devcontainer, setup exercise, license, maintainers, and support information.
