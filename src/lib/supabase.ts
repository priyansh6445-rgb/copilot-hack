import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = url && key ? createClient(url, key) : null

export type MenuItem = { id: string; category_id: string | null; name: string; description: string | null; price: number; image_url: string | null; is_live: boolean; sort_order: number; category?: { name: string } | null }
export type Category = { id: string; name: string; sort_order: number }
export type SiteSettings = { id: string; key: string; value: string }

export async function getMenu() {
  if (!supabase) return { data: [] as MenuItem[], error: null }
  return supabase.from('menu_items').select('*, category:categories(name)').eq('is_live', true).order('sort_order')
}
export async function getSettings() {
  if (!supabase) return { data: [] as SiteSettings[], error: null }
  return supabase.from('site_settings').select('*')
}
