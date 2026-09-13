import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Instagram, Menu as MenuIcon, X } from 'lucide-react'
import { getMenu, getSettings, supabase, type MenuItem } from './lib/supabase'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'

function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return <div className="grain min-h-screen">
    <header className="absolute z-20 w-full text-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
        <Link to="/" className="font-display text-3xl tracking-tight">baithak<span className="text-saffron">.</span></Link>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <MenuIcon/>}</button>
        <nav className={`${open ? 'absolute left-0 top-full flex w-full flex-col bg-ink px-6 py-5' : 'hidden'} gap-8 text-[11px] uppercase tracking-[.2em] md:static md:flex md:flex-row md:bg-transparent md:p-0`}>
          <a href="#story" onClick={() => setOpen(false)}>Our story</a><a href="#menu" onClick={() => setOpen(false)}>The menu</a><a href="#visit" onClick={() => setOpen(false)}>Visit us</a>
          <a href="#reserve" className="border-b border-saffron pb-1 text-saffron">Reserve a table ↗</a>
        </nav>
      </div>
    </header>{children}
    <footer className="bg-ink px-6 py-14 text-cream lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 md:flex-row"><div><p className="font-display text-4xl">baithak<span className="text-saffron">.</span></p><p className="mt-4 max-w-xs text-sm leading-6 text-cream/60">A room for good food, long conversations, and the pleasure of taking your time.</p></div><div className="grid grid-cols-2 gap-14 text-sm"><div><p className="mb-4 text-[10px] uppercase tracking-[.2em] text-saffron">Find us</p><p className="text-cream/70">14, Sunder Nagar<br/>New Delhi 110003</p></div><div><p className="mb-4 text-[10px] uppercase tracking-[.2em] text-saffron">Follow along</p><p className="text-cream/70">@baithak.restaurant</p><Instagram size={16} className="mt-3"/></div></div></div><div className="mx-auto mt-16 max-w-7xl border-t line pt-5 text-[10px] uppercase tracking-[.15em] text-cream/40">© 2025 Baithak · Made for lingering</div></footer>
  </div>
}

function Home() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [settings, setSettings] = useState<Record<string,string>>({})
  useEffect(() => { getMenu().then(({data}) => { if (data?.length) setItems(data as MenuItem[]) }); getSettings().then(({data}) => { if (data) setSettings(Object.fromEntries(data.map(s => [s.key, s.value]))) }) }, [])
  const groups = useMemo(() => items.reduce<Record<string,MenuItem[]>>((a, item) => { const key = item.category?.name ?? 'From the kitchen'; (a[key] ??= []).push(item); return a }, {}), [items])
  return <Layout><main>
    <section className="relative flex min-h-[720px] items-end overflow-hidden bg-ink px-6 pb-20 text-cream lg:min-h-[840px] lg:px-10"><img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=85" className="absolute inset-0 h-full w-full object-cover opacity-45" alt="Baithak dining room"/><div className="absolute inset-0 bg-ink/45"/><div className="relative mx-auto w-full max-w-7xl"><p className="mb-7 text-[11px] uppercase tracking-[.3em] text-saffron">New Delhi · Since 2024</p><h1 className="max-w-4xl font-display text-6xl leading-[.92] tracking-tight md:text-8xl lg:text-[9.5rem]">Come in,<br/><em className="text-saffron">stay awhile.</em></h1><div className="mt-10 flex items-end justify-between gap-8"><p className="max-w-xs text-sm leading-6 text-cream/70">{settings.intro ?? 'An Indian dining room for food that remembers where it came from — and people who like to take their time.'}</p><a href="#menu" className="flex items-center gap-2 border-b border-cream/50 pb-2 text-[11px] uppercase tracking-[.2em]">Explore the menu <ArrowUpRight size={14}/></a></div></div></section>
    <section id="story" className="bg-cream px-6 py-24 lg:px-10 lg:py-36"><div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_1.4fr]"><p className="text-[11px] uppercase tracking-[.25em] text-saffron">01 / The feeling</p><div><h2 className="max-w-3xl font-display text-4xl leading-tight md:text-6xl">Not a restaurant.<br/><em>A baithak.</em></h2><p className="mt-8 max-w-xl text-base leading-7 text-ink/65">A baithak is a room set aside for conversation. Ours just happens to have a kitchen at its heart. We cook with the generous, layered flavours of home, then make space for the unexpected.</p></div></div></section>
    <section id="menu" className="bg-paper px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><div className="mb-16 flex items-end justify-between"><div><p className="mb-5 text-[11px] uppercase tracking-[.25em] text-saffron">02 / The menu</p><h2 className="font-display text-5xl md:text-7xl">Made to share.</h2></div><p className="hidden max-w-xs text-right text-sm leading-6 text-ink/60 md:block">Our menu moves with the market.<br/>Here are a few things we love right now.</p></div>{Object.keys(groups).length ? Object.entries(groups).map(([category, rows]) => <div key={category} className="mb-16"><h3 className="mb-6 border-b line pb-4 font-display text-2xl italic">{category}</h3><div className="grid gap-x-8 gap-y-10 md:grid-cols-2">{rows.map(item => <article key={item.id} className="group grid grid-cols-[110px_1fr] gap-5">{item.image_url ? <img src={item.image_url} alt="" className="h-28 w-28 object-cover grayscale transition duration-500 group-hover:grayscale-0"/> : <div className="h-28 w-28 bg-ink/10"/>}<div><div className="flex justify-between gap-3"><h4 className="font-display text-xl">{item.name}</h4><span className="text-sm">₹{item.price}</span></div><p className="mt-2 text-sm leading-5 text-ink/60">{item.description}</p></div></article>)}</div></div>) : <p className="border-y line py-14 text-center text-ink/55">Our seasonal menu is being prepared. Please check back soon.</p>}</div></section>
    <section id="visit" className="bg-saffron px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2"><div><p className="mb-5 text-[11px] uppercase tracking-[.25em] text-ink/60">03 / Come over</p><h2 className="font-display text-5xl leading-[.95] md:text-7xl">Your table<br/><em>is waiting.</em></h2></div><div className="flex flex-col justify-end"><div className="grid grid-cols-2 border-y border-ink/25 py-5 text-sm"><div><p className="mb-2 text-[10px] uppercase tracking-[.2em] text-ink/60">Hours</p><p>Tuesday — Sunday<br/>12:00 pm — 11:00 pm</p></div><div><p className="mb-2 text-[10px] uppercase tracking-[.2em] text-ink/60">Address</p><p>14, Sunder Nagar<br/>New Delhi 110003</p></div></div><a id="reserve" href="mailto:hello@baithak.restaurant" className="mt-8 flex items-center justify-between border-b border-ink pb-3 text-xs uppercase tracking-[.2em]">Make a reservation <ArrowUpRight size={18}/></a></div></div></section>
  </main></Layout>
}

function Protected() { return supabase ? <Admin/> : <Navigate to="/admin/login" replace/> }
export default function App() { return <Routes><Route path="/" element={<Home/>}/><Route path="/admin/login" element={<AdminLogin/>}/><Route path="/admin/*" element={<Protected/>}/></Routes> }
