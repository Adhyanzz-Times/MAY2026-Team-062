import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, Check, Clock3, MapPin, ShieldCheck, Sparkles, Star, Trophy, Users } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const facilities = [
    { name: 'Badminton Courts', desc: 'Top-grade indoor courts with excellent LED lighting.', img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=700' },
    { name: 'Football Turf', desc: 'Premium artificial turf suitable for 5-a-side and 7-a-side.', img: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=700' },
    { name: 'Tennis Courts', desc: 'Professional synthetically surfaced clay courts.', img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=700' },
    { name: 'Basketball Court', desc: 'Standard indoor wooden court with dynamic hoops.', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=700' }
  ];

  return (
    <div className="w-full overflow-hidden bg-white text-gray-800">
      <section className="relative isolate overflow-hidden bg-charcoal-dark px-6 pb-16 pt-16 text-white md:pb-24 md:pt-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(109,40,217,0.45),transparent_28%),radial-gradient(circle_at_82%_78%,rgba(34,197,94,0.18),transparent_24%)]" />
        <div className="absolute -right-24 top-12 -z-10 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -right-4 top-28 -z-10 h-56 w-56 rounded-full border border-white/10" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-violet-100 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 fill-current" />
              <span>One place for your entire sports life</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl">More time playing.<br /><span className="text-violet-300">Less time planning.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">Discover your next game, reserve a court, and stay part of the action at IIT Madras—all from one simple club hub.</p>
            <div className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row lg:items-start">
              <button onClick={() => navigate('/register')} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-charcoal shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-violet-50 sm:w-auto"><span>Explore SportSync</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
              <button onClick={() => navigate('/login')} className="w-full rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10 sm:w-auto">Sign In</button>
            </div>
            <div className="mt-9 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-300 lg:justify-start">
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Instant bookings</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Events & coaching</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Club updates</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-primary/30 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-white p-2 shadow-2xl shadow-black/40">
              <img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200" alt="Players enjoying an outdoor sports session" className="h-64 w-full rounded-2xl object-cover sm:h-80" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-xl sm:left-7 sm:right-7 sm:p-5">
                <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Next up</p><h2 className="mt-1 text-base font-bold text-gray-900 sm:text-lg">Badminton · Court 03</h2></div><div className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">Available</div></div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500"><span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5 text-primary" /> Today</span><span className="flex items-center gap-1"><Clock3 className="h-3.5 w-3.5 text-primary" /> 6:00 PM</span><span className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-primary" /> 2 spots left</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white px-6 py-5"><div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-gray-100 text-center"><div><p className="text-lg font-extrabold text-gray-900 md:text-2xl">4+</p><p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 md:text-xs">Sports</p></div><div><p className="text-lg font-extrabold text-gray-900 md:text-2xl">24/7</p><p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 md:text-xs">Club access</p></div><div><p className="text-lg font-extrabold text-gray-900 md:text-2xl">1 hub</p><p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 md:text-xs">For members</p></div></div></section>

      <section id="facilities" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div className="max-w-xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Facilities</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">Your next game starts here.</h2><p className="mt-3 text-sm leading-relaxed text-gray-500">Purpose-built spaces for a quick rally, a serious match, or your new weekly ritual.</p></div><button onClick={() => navigate('/login')} className="group inline-flex items-center gap-1.5 self-start text-sm font-bold text-primary transition hover:text-primary-dark md:self-auto">Check availability <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button></div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{facilities.map((fac) => <div key={fac.name} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60"><div className="h-48 overflow-hidden bg-gray-100"><img src={fac.img} alt={fac.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-5"><h3 className="mb-2 text-lg font-bold text-gray-900">{fac.name}</h3><p className="text-sm leading-relaxed text-gray-500">{fac.desc}</p></div></div>)}</div>
      </section>

      <section id="about" className="bg-violet-50/60 px-6 py-20 md:py-24"><div className="mx-auto max-w-7xl"><div className="mb-10 max-w-xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Built around players</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900">Everything your club needs, in sync.</h2></div><div className="grid gap-5 md:grid-cols-3"><Feature icon={<Star className="h-5 w-5" />} title="AI Recommendations" text="Get personalized court times and matching practice partners based on your gaming history." /><Feature icon={<Trophy className="h-5 w-5" />} title="Tournaments & Camps" text="Sign up for coaching events and competitive tournaments organized directly by our team." /><Feature icon={<ShieldCheck className="h-5 w-5" />} title="Quick Issue Reporting" text="Upload pictures of malfunctioning equipment to trigger automated maintenance dispatches." /></div></div></section>

      <section id="events" className="mx-auto max-w-7xl px-6 py-20 md:py-28"><div className="mb-12 text-center"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Club calendar</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900">Make your next weekend count.</h2><p className="mt-3 text-sm text-gray-500">See what’s happening at the club and reserve a spot to compete.</p></div><div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2"><EventCard dark label="Badminton" title="Summer Badminton Tournament" text="Join the annual amateur tournament. Singles and doubles matches with grand trophies." action="Register to play" /><EventCard label="Tennis" title="Weekend Tennis Coaching Camp" text="Interactive masterclass drills under pro coaches. Limited to 15 intermediate players." action="Reserve your spot" /></div></section>

      <section id="contact" className="px-6 pb-20 pt-8 md:pb-28"><div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-primary px-7 py-10 text-white md:px-12 md:py-12"><div className="grid gap-9 md:grid-cols-[1fr_0.95fr] md:items-center"><div className="text-center md:text-left"><p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-200">Need a hand?</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight">We’re here to help you play more.</h2><p className="mt-3 text-sm leading-relaxed text-violet-100">Questions about memberships or facilities? Reach out to the club support team.</p></div><div className="space-y-4 rounded-2xl bg-white p-6 text-left text-gray-800 shadow-lg"><div><span className="block text-[10px] font-semibold uppercase text-gray-400">Support Email</span><span className="text-sm font-semibold text-gray-800">support@sportsync.iitm.ac.in</span></div><div className="border-t border-gray-100 pt-4"><span className="block text-[10px] font-semibold uppercase text-gray-400">Club Office Address</span><span className="flex items-start gap-1.5 text-sm font-semibold text-gray-800"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> IIT Madras Campus, Adyar, Chennai - 600036</span></div></div></div></div></section>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return <div className="flex flex-col space-y-4 rounded-2xl border border-violet-100 bg-white p-6 shadow-sm"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">{icon}</div><h3 className="text-lg font-bold text-gray-900">{title}</h3><p className="text-sm leading-relaxed text-gray-500">{text}</p></div>;
}

function EventCard({ dark, label, title, text, action }) {
  const navigate = useNavigate();
  return <div className={`flex min-h-64 flex-col justify-between rounded-2xl p-7 ${dark ? 'bg-charcoal text-white shadow-lg shadow-gray-300/50' : 'border border-gray-100 bg-white shadow-sm'}`}><div><span className={`mb-5 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${dark ? 'bg-violet-400/20 text-violet-200' : 'bg-amber-50 text-amber-700'}`}>{label}</span><h3 className={`mb-3 text-2xl font-bold ${dark ? '' : 'text-gray-900'}`}>{title}</h3><p className={`text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-gray-500'}`}>{text}</p></div><button onClick={() => navigate('/login')} className={`mt-6 flex items-center gap-1.5 text-sm font-bold transition ${dark ? 'text-violet-300 hover:text-white' : 'text-primary hover:text-primary-dark'}`}>{action} <ArrowRight className="h-4 w-4" /></button></div>;
}
