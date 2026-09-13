create extension if not exists "pgcrypto";
create table if not exists public.categories (id uuid primary key default gen_random_uuid(), name text not null unique, sort_order int not null default 0);
create table if not exists public.menu_items (id uuid primary key default gen_random_uuid(), category_id uuid references public.categories(id) on delete set null, name text not null, description text, price numeric(10,2) not null default 0, image_url text, is_live boolean not null default true, sort_order int not null default 0, created_at timestamptz not null default now());
create table if not exists public.site_settings (id uuid primary key default gen_random_uuid(), key text not null unique, value text not null default '');
alter table public.categories enable row level security; alter table public.menu_items enable row level security; alter table public.site_settings enable row level security;
drop policy if exists "Public can read categories" on public.categories; create policy "Public can read categories" on public.categories for select using (true);
drop policy if exists "Public can read live menu" on public.menu_items; create policy "Public can read live menu" on public.menu_items for select using (is_live = true);
drop policy if exists "Public can read settings" on public.site_settings; create policy "Public can read settings" on public.site_settings for select using (true);
drop policy if exists "Authenticated admins manage categories" on public.categories;
drop policy if exists "Authenticated admins manage menu" on public.menu_items;
drop policy if exists "Authenticated admins manage settings" on public.site_settings;
create policy "Authenticated admins manage categories" on public.categories for all to authenticated using (true) with check (true);
create policy "Authenticated admins manage menu" on public.menu_items for all to authenticated using (true) with check (true);
create policy "Authenticated admins manage settings" on public.site_settings for all to authenticated using (true) with check (true);
insert into public.categories (name, sort_order) values
  ('Small plates', 10),
  ('From the hearth', 20),
  ('Sweet endings', 30)
on conflict (name) do nothing;
insert into public.site_settings (key,value) values ('intro','An Indian dining room for food that remembers where it came from — and people who like to take their time.') on conflict (key) do nothing;
insert into storage.buckets (id,name,public) values ('menu-images','menu-images',true) on conflict (id) do nothing;
drop policy if exists "Public can view menu images" on storage.objects;
drop policy if exists "Admins upload menu images" on storage.objects;
drop policy if exists "Admins update menu images" on storage.objects;
drop policy if exists "Admins delete menu images" on storage.objects;
create policy "Public can view menu images" on storage.objects for select using (bucket_id = 'menu-images');
create policy "Admins upload menu images" on storage.objects for insert to authenticated with check (bucket_id = 'menu-images');
create policy "Admins update menu images" on storage.objects for update to authenticated using (bucket_id = 'menu-images');
create policy "Admins delete menu images" on storage.objects for delete to authenticated using (bucket_id = 'menu-images');
