"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BrandMark,
  NoteIcon,
  HeartIcon,
  PlayIcon,
  PauseIcon,
  CheckIcon,
  ChevronRightIcon,
  StarIcon,
} from "@/components/Icons";

/* ============ DATA ============ */
const GENRES = [
  { name: "Alt Pop", color: "#3ddc84" },
  { name: "Indie Rock", color: "#8b5cf6" },
  { name: "Amapiano", color: "#f59e0b" },
  { name: "Afro House", color: "#0ea5e9" },
  { name: "R&B", color: "#ec4899" },
  { name: "Electronic", color: "#f43f5e" },
  { name: "Lo-Fi", color: "#6b7280" },
  { name: "Pop", color: "#a855f7" },
  { name: "Soul", color: "#34d399" },
  { name: "Afrobeat", color: "#f97316" },
];

const FEATURES = [
  {
    title: "Lossless Hi-Fi Audio",
    desc: "Crystal-clear 24-bit audio that captures every nuance. Feel the music the way artists intended.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Smart Playlists",
    desc: "AI-powered playlists that learn your taste and surface the perfect tracks every time you hit play.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    title: "Live Sessions",
    desc: "Exclusive live performances and behind-the-scenes content from your favorite artists.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    title: "Lyrics & Stories",
    desc: "Follow along with synced lyrics and artist stories that bring deeper meaning to every track.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Social Sharing",
    desc: "Share your favorite tracks, playlists, and moments with friends across all your social platforms.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  {
    title: "Offline Mode",
    desc: "Download your favorites and listen anywhere — on flights, commutes, or off the grid.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

const TRENDING = [
  { id: 0, title: "Neon Dreams", artist: "Kira Solace", dur: "3:24", rank: 1, grad: "linear-gradient(135deg,#3ddc84,#1b7f5e 60%,#0e3b2b)" },
  { id: 1, title: "Golden Hour", artist: "The Velvet Echo", dur: "2:58", rank: 2, grad: "linear-gradient(135deg,#2ee57c,#7c3aed)" },
  { id: 2, title: "Midnight Drive", artist: "Aya Blaze", dur: "4:12", rank: 3, grad: "linear-gradient(135deg,#16d1a0,#f59e0b)" },
  { id: 3, title: "Sugar Rush", artist: "DJ Kavana", dur: "3:01", rank: 4, grad: "linear-gradient(135deg,#2ee57c,#0ea5e9)" },
  { id: 4, title: "Ocean Eyes", artist: "Lena Marr", dur: "3:47", rank: 5, grad: "linear-gradient(135deg,#34d399,#6366f1)" },
  { id: 5, title: "Pulse", artist: "Zephyr", dur: "2:41", rank: 6, grad: "linear-gradient(135deg,#4ade80,#f43f5e)" },
  { id: 6, title: "Velvet Sky", artist: "Kira Solace", dur: "3:33", rank: 7, grad: "linear-gradient(135deg,#10b981,#0ea5e9)" },
  { id: 7, title: "Lagos Nights", artist: "DJ Kavana", dur: "3:18", rank: 8, grad: "linear-gradient(135deg,#f97316,#2ee57c)" },
];

const ARTISTS = [
  { name: "Kira Solace", followers: "34.8K", genre: "Alt Pop", initials: "KS", color: "linear-gradient(135deg,#a855f7,#ec4899)" },
  { name: "DJ Kavana", followers: "28.1K", genre: "Afro House", initials: "DK", color: "linear-gradient(135deg,#0ea5e9,#16d1a0)" },
  { name: "The Velvet Echo", followers: "18.4K", genre: "Indie Rock", initials: "VE", color: "linear-gradient(135deg,#8b5cf6,#34d399)" },
  { name: "Lena Marr", followers: "14.2K", genre: "R&B", initials: "LM", color: "linear-gradient(135deg,#ec4899,#10b981)" },
  { name: "Aya Blaze", followers: "12.1K", genre: "Amapiano", initials: "AB", color: "linear-gradient(135deg,#f59e0b,#2ee57c)" },
  { name: "Zephyr", followers: "8.7K", genre: "Electronic", initials: "ZE", color: "linear-gradient(135deg,#f43f5e,#4ade80)" },
];

const STATS = [
  { value: "2M+", label: "Monthly Listeners" },
  { value: "50K+", label: "Artists" },
  { value: "10M+", label: "Tracks" },
  { value: "150+", label: "Countries" },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["Ad-supported streaming", "Standard audio quality", "Basic playlists", "30 skips/day"],
    missing: ["Offline listening", "Lossless audio", "No ads"],
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "/month",
    featured: true,
    features: ["Ad-free streaming", "Lossless Hi-Fi audio", "Unlimited offline", "Unlimited skips", "Exclusive content"],
    missing: [],
  },
  {
    name: "Family",
    price: "$14.99",
    period: "/month",
    features: ["Up to 6 accounts", "Premium features for all", "Family Mix playlist", "Parental controls", "Offline for all"],
    missing: [],
  },
];

/* ============ COMPONENT ============ */
export default function LandingPage() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [liked, setLiked] = useState<Set<number>>(new Set([0, 5]));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Marquee
  useEffect(() => {
    if (marqueeRef.current) {
      const el = marqueeRef.current;
      const clone = el.innerHTML;
      el.innerHTML = clone + clone;
    }
  }, []);

  // Auto-play progress
  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.5));
      }, 100);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing]);

  // Popup after 8s
  useEffect(() => {
    const t = setTimeout(() => setShowPopup(true), 8000);
    return () => clearTimeout(t);
  }, []);

  const togglePlay = () => setPlaying(!playing);
  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <Navbar />

      <main id="top">
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden pt-[clamp(140px,18vh,190px)] pb-[clamp(70px,9vw,110px)]">
          {/* Background effects */}
          <div className="absolute inset-0 -z-20 pointer-events-none bg-[radial-gradient(55%_45%_at_78%_18%,rgba(236,72,153,.16),transparent_62%),radial-gradient(45%_40%_at_18%_78%,rgba(168,85,247,.15),transparent_62%),radial-gradient(40%_35%_at_55%_55%,rgba(249,115,22,.07),transparent_60%),var(--color-bg)]" />
          <div className="absolute inset-0 -z-10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(70%_70%_at_50%_30%,#000_30%,transparent_75%)]" />

          <div className="mx-auto max-w-[1180px] px-[4%] grid grid-cols-[1.05fr_.95fr] gap-[clamp(40px,6vw,80px)] items-center max-[1024px]:grid-cols-1 max-[1024px]:text-center">
            {/* Copy */}
            <div>
              <span className="inline-flex items-center gap-2 text-[13px] font-medium text-muted bg-surface border border-border rounded-full px-4 py-2 backdrop-blur-lg">
                <span className="relative h-2 w-2 rounded-full bg-green">
                  <span className="absolute inset-[-4px] rounded-full border border-green animate-[ping_1.8s_ease_infinite]" />
                </span>
                Now streaming — growing every day
              </span>

              <h1 className="text-[clamp(44px,6.4vw,74px)] font-display font-bold leading-[1.12] tracking-tight mt-7 mb-6">
                <span className="block">Every beat.</span>
                <span className="block gradient-text">One place.</span>
              </h1>

              <p className="text-lg text-muted max-w-[500px] mb-[34px] max-[1024px]:mx-auto">
                Stream millions of songs in crystal-clear audio, discover artists before the world does, and build playlists that feel like they were made just for you.
              </p>

              <div className="flex flex-wrap gap-3.5 mb-10 max-[1024px]:justify-center">
                <Link href="/app" className="inline-flex items-center justify-center gap-2 px-[26px] py-[13px] text-[15px] font-semibold rounded-full gradient-bg text-white shadow-[0_8px_30px_-8px_rgba(236,72,153,.55)] hover:-translate-y-0.5 transition-all">
                  <PlayIcon className="w-[17px] h-[17px]" />
                  Start listening — it&apos;s free
                </Link>
                <Link href="/register" className="inline-flex items-center justify-center gap-2 px-[26px] py-[13px] text-[15px] font-semibold rounded-full bg-surface border border-brand/40 text-brand hover:-translate-y-0.5 transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Register as an Artist
                </Link>
              </div>

              <div className="flex items-center gap-4 max-[1024px]:justify-center">
                <div className="flex" aria-hidden>
                  {["KA", "JO", "MI", "LE", "++"].map((initials, i) => (
                    <span
                      key={i}
                      className="h-[38px] w-[38px] rounded-full border-[2.5px] border-[var(--color-bg)] grid place-items-center text-xs font-bold text-white -ml-2.5 first:ml-0 font-display"
                      style={{
                        background: ["linear-gradient(135deg,#7c3aed,#ec4899)", "linear-gradient(135deg,#0ea5e9,#6366f1)", "linear-gradient(135deg,#f59e0b,#ef4444)", "linear-gradient(135deg,#10b981,#0ea5e9)", "linear-gradient(135deg,#f472b6,#a855f7)"][i],
                      }}
                    >
                      {initials}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="text-yellow-400 text-[13px] tracking-widest" aria-label="4.9 out of 5 stars">★★★★★</p>
                  <p className="text-[13.5px] text-muted">
                    <strong className="text-text">4.8/5</strong> from <strong className="text-text">12K+ listeners</strong> · and growing
                  </p>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative grid place-items-center min-h-[520px] max-[1024px]:min-h-[480px] max-[1024px]:mt-2.5 max-[768px]:min-h-[420px]">
              {/* Vinyl */}
              <div className="absolute w-[min(440px,82%)] aspect-square rounded-full bg-[repeating-radial-gradient(circle_at_50%_50%,#0b0b12_0_2px,#13131d_2px_4px)] shadow-[0_40px_120px_-30px_rgba(0,0,0,.8),inset_0_0_0_1px_rgba(255,255,255,.05)] -z-10 animate-[spin_22s_linear_infinite]">
                <div className="absolute inset-[22%] rounded-full bg-[conic-gradient(from_210deg,#a855f7,#ec4899,#f97316,#a855f7)] shadow-[0_0_60px_rgba(236,72,153,.35)]" />
                <div className="absolute inset-[46%] rounded-full bg-[var(--color-bg)] border border-white/12" />
              </div>

              {/* Player card */}
              <div className="animate-[floaty_6s_ease-in-out_infinite] w-[min(340px,90%)]">
                <div className="w-full bg-[rgba(20,20,30,.78)] border border-white/10 rounded-3xl p-[18px] backdrop-blur-[22px] shadow-[0_30px_80px_-20px_rgba(0,0,0,.7)]">
                  {/* Cover */}
                  <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 bg-[linear-gradient(135deg,#7c3aed,#db2777_55%,#f97316)] shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)]">
                    <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_25%_15%,rgba(255,255,255,.3),transparent_55%)]" />
                    <NoteIcon className="absolute inset-0 m-auto w-[46%] h-[46%] text-white/22" />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div>
                      <h3 className="text-[17px] font-semibold">Neon Dreams</h3>
                      <p className="text-[13px] text-muted">Kira Solace</p>
                    </div>
                    <button onClick={() => toggleLike(0)} className="bg-transparent border-0 text-muted p-1 hover:text-brand-2 hover:scale-110 transition-all" aria-label="Like this track">
                      {liked.has(0) ? (
                        <HeartIcon className="w-5 h-5" filled />
                      ) : (
                        <HeartIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Progress */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="text-[11px] text-muted font-mono min-w-[34px]">0:{Math.floor(progress * 2.04 / 10).toString().padStart(2, "0")}</span>
                    <div className="flex-1 h-1 rounded-full bg-white/12 overflow-hidden">
                      <div className="h-full rounded-full gradient-bg transition-[width] duration-300" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-[11px] text-muted font-mono">3:24</span>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-[22px]">
                    <button className="bg-transparent border-0 text-text hover:scale-110 transition-transform" aria-label="Previous">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M6 5h2v14H6zM20 5v14l-9-7z" /></svg>
                    </button>
                    <button onClick={togglePlay} className="w-12 h-12 rounded-full gradient-bg text-white grid place-items-center shadow-[0_8px_24px_-6px_rgba(236,72,153,.6)] hover:scale-105 transition-transform" aria-label={playing ? "Pause" : "Play"}>
                      {playing ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                    </button>
                    <button className="bg-transparent border-0 text-text hover:scale-110 transition-transform" aria-label="Next">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M16 5h2v14h-2zM4 5v14l9-7z" /></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating chips */}
              <div className="absolute top-[12%] left-0 flex items-center gap-2.5 bg-[rgba(20,20,30,.8)] border border-white/10 rounded-[14px] p-3 backdrop-blur-[14px] shadow-[0_18px_50px_-14px_rgba(0,0,0,.7)] text-[13px] font-medium animate-[floaty_5s_ease-in-out_infinite] max-[768px]:hidden" style={{ animationDelay: "0.8s" }}>
                <span className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-[linear-gradient(135deg,#0ea5e9,#6366f1)] text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4"><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 22v-2M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M3 12h2M19 12h2M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" /></svg>
                </span>
                <span>Lossless audio<small className="block text-[11px] text-muted font-normal">Hi-Fi · 24-bit</small></span>
              </div>

              <div className="absolute bottom-[10%] right-0 flex items-center gap-2.5 bg-[rgba(20,20,30,.8)] border border-white/10 rounded-[14px] p-3 backdrop-blur-[14px] shadow-[0_18px_50px_-14px_rgba(0,0,0,.7)] text-[13px] font-medium animate-[floaty_5s_ease-in-out_infinite] max-[768px]:hidden" style={{ animationDelay: "1.6s" }}>
                <span className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-[linear-gradient(135deg,#f59e0b,#ef4444)] text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 2v4M12 22v-4M4.9 4.9l2.8 2.8M19.1 4.9l-2.8 2.8M2 12h4M22 12h-4M4.9 19.1l2.8-2.8M19.1 19.1l-2.8-2.8" /></svg>
                </span>
                <span>2,847,210 plays<small className="block text-[11px] text-muted font-normal">and counting</small></span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ MARQUEE ============ */}
        <div className="relative py-[26px] border-y border-border bg-bg-soft overflow-hidden" aria-hidden>
          <div ref={marqueeRef} className="flex gap-3.5 w-max animate-[scrollX_30s_linear_infinite]">
            {GENRES.map((g) => (
              <span key={g.name} className="inline-flex items-center gap-2.5 whitespace-nowrap px-5 py-2.5 rounded-full font-semibold text-sm text-muted border border-border bg-surface hover:text-text hover:border-brand/50 hover:-translate-y-0.5 transition-all cursor-default">
                <span className="w-2 h-2 rounded-full" style={{ background: g.color }} />
                {g.name}
              </span>
            ))}
          </div>
        </div>

        {/* ============ FEATURES ============ */}
        <section className="section py-[clamp(72px,9vw,120px)]" id="features">
          <div className="mx-auto max-w-[1180px] px-[4%]">
            <div className="text-center max-w-[640px] mx-auto mb-[clamp(40px,6vw,64px)]">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-brand bg-brand/10 border border-brand/25 rounded-full px-3.5 py-[7px]">
                <span className="w-1.5 h-1.5 rounded-full gradient-bg" />
                Why OneBEAT
              </span>
              <h2 className="font-display text-[clamp(30px,4.6vw,46px)] font-bold mt-[18px] mb-3.5 leading-[1.12]">Built for every music lover</h2>
              <p className="text-muted text-[17px]">Everything you need to feel every track — engineered for pure listening.</p>
            </div>

            <div className="grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[768px]:grid-cols-1">
              {FEATURES.map((f) => (
                <div key={f.title} className="relative bg-surface border border-border rounded-[18px] p-[30px_28px] overflow-hidden hover:-translate-y-1.5 hover:border-white/16 hover:bg-surface-strong transition-all group">
                  <div className="absolute inset-x-0 top-0 h-[3px] gradient-bg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center bg-[var(--grad-soft)] border border-brand/22 text-brand mb-5 group-hover:scale-105 group-hover:-rotate-1 group-hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,.5)] transition-all">
                    {f.icon}
                  </div>
                  <h3 className="text-[19px] font-semibold mb-2.5">{f.title}</h3>
                  <p className="text-muted text-[14.5px]">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TRENDING ============ */}
        <section className="section py-[clamp(72px,9vw,120px)]" id="trending">
          <div className="mx-auto max-w-[1180px] px-[4%]">
            <div className="text-center max-w-[640px] mx-auto mb-[clamp(40px,6vw,64px)]">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-brand bg-brand/10 border border-brand/25 rounded-full px-3.5 py-[7px]">
                <span className="w-1.5 h-1.5 rounded-full gradient-bg" />
                What&apos;s Hot
              </span>
              <h2 className="font-display text-[clamp(30px,4.6vw,46px)] font-bold mt-[18px] mb-3.5 leading-[1.12]">Trending right now</h2>
              <p className="text-muted text-[17px]">The tracks everyone&apos;s talking about this week.</p>
            </div>

            <div className="flex gap-[18px] overflow-x-auto pb-5 snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden">
              {TRENDING.map((t) => (
                <article key={t.id} className="snap-start bg-surface border border-border rounded-[18px] p-3.5 cursor-pointer hover:-translate-y-1.5 hover:border-white/18 hover:bg-surface-strong transition-all min-w-[200px]">
                  <div className="relative rounded-xl aspect-square overflow-hidden mb-3.5" style={{ background: t.grad }}>
                    <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_25%_12%,rgba(255,255,255,.25),transparent_55%)]" />
                    <NoteIcon className="absolute inset-0 m-auto w-[42%] h-[42%] text-white/25" />
                    <span className="absolute top-2.5 left-2.5 z-[2] font-display font-bold text-xs tracking-[.06em] text-white/85 bg-black/45 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/15">
                      #{t.rank}
                    </span>
                    <button
                      onClick={() => { setCurrentTrack(t.id); setPlaying(true); }}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full gradient-bg border-0 text-white grid place-items-center shadow-[0_10px_30px_-6px_rgba(236,72,153,.7)] opacity-0 scale-75 hover:opacity-100 hover:scale-100 transition-all z-[2] group-hover:opacity-100 group-hover:scale-100"
                      aria-label={`Play ${t.title}`}
                    >
                      <PlayIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="track-info">
                    <h4 className="text-[15px] font-semibold truncate">{t.title}</h4>
                    <p className="text-[13px] text-muted truncate">{t.artist}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted font-mono">{t.dur}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ ARTISTS ============ */}
        <section className="section py-[clamp(72px,9vw,120px)]" id="artists">
          <div className="mx-auto max-w-[1180px] px-[4%]">
            <div className="text-center max-w-[640px] mx-auto mb-[clamp(40px,6vw,64px)]">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-brand bg-brand/10 border border-brand/25 rounded-full px-3.5 py-[7px]">
                <span className="w-1.5 h-1.5 rounded-full gradient-bg" />
                Discover
              </span>
              <h2 className="font-display text-[clamp(30px,4.6vw,46px)] font-bold mt-[18px] mb-3.5 leading-[1.12]">Featured artists</h2>
              <p className="text-muted text-[17px]">The voices shaping the sound of tomorrow.</p>
            </div>

            <div className="grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[768px]:grid-cols-1">
              {ARTISTS.map((a) => (
                <div key={a.name} className="flex items-center gap-[18px] bg-surface border border-border rounded-[18px] p-[22px] hover:-translate-y-1.5 hover:border-white/18 hover:bg-surface-strong transition-all">
                  <div className="w-[74px] h-[74px] rounded-full shrink-0 relative overflow-hidden shadow-[0_10px_26px_-8px_rgba(0,0,0,.6)]" style={{ background: a.color }}>
                    <NoteIcon className="absolute inset-0 m-auto w-[42%] h-[42%] text-white/40" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[17.5px] font-semibold">{a.name}</h3>
                    <p className="text-[13px] text-muted mt-0.5">{a.followers} followers</p>
                    <span className="inline-block mt-2 text-[11px] font-bold tracking-[.06em] uppercase text-brand bg-brand/10 px-2.5 py-1 rounded-full">{a.genre}</span>
                  </div>
                  <button className="ml-auto shrink-0 bg-transparent border border-border text-text font-semibold text-[13px] px-[18px] py-2 rounded-full hover:gradient-bg hover:border-transparent hover:text-white hover:-translate-y-0.5 transition-all">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className="section py-[clamp(72px,9vw,120px)] border-y border-border bg-bg-soft relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(50%_120%_at_50%_0%,rgba(168,85,247,.09),transparent_60%)] pointer-events-none" />
          <div className="mx-auto max-w-[1180px] px-[4%] grid grid-cols-4 gap-7 text-center max-[1024px]:grid-cols-2 max-[1024px]:row-gap-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <h3 className="font-display text-[clamp(36px,4.4vw,54px)] font-bold tracking-tight gradient-text">{s.value}</h3>
                <p className="text-muted text-sm mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ PRICING ============ */}
        <section className="section py-[clamp(72px,9vw,120px)]" id="pricing">
          <div className="mx-auto max-w-[1180px] px-[4%]">
            <div className="text-center max-w-[640px] mx-auto mb-[clamp(40px,6vw,64px)]">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-brand bg-brand/10 border border-brand/25 rounded-full px-3.5 py-[7px]">
                <span className="w-1.5 h-1.5 rounded-full gradient-bg" />
                Simple Pricing
              </span>
              <h2 className="font-display text-[clamp(30px,4.6vw,46px)] font-bold mt-[18px] mb-3.5 leading-[1.12]">Choose your plan</h2>
              <p className="text-muted text-[17px]">Start free, upgrade when you&apos;re ready.</p>
            </div>

            <div className="grid grid-cols-3 gap-[22px] items-stretch max-[1024px]:grid-cols-1 max-[1024px]:max-w-[480px] max-[1024px]:mx-auto">
              {PRICING.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col bg-surface border rounded-[22px] p-8 transition-all hover:-translate-y-1.5 hover:border-white/18 ${
                    plan.featured
                      ? "border-brand/40 bg-[linear-gradient(180deg,rgba(168,85,247,.12),rgba(236,72,153,.06)_55%,var(--color-surface))] shadow-[0_24px_70px_-24px_rgba(168,85,247,.35)]"
                      : "border-border"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-bold tracking-[.12em] gradient-bg text-white px-3.5 py-1.5 rounded-full shadow-[0_8px_20px_-6px_rgba(236,72,153,.6)]">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                  <div className="font-display text-[42px] font-bold tracking-tight my-3 mb-1">
                    {plan.price}
                    <small className="text-sm text-muted font-medium tracking-normal">{plan.period}</small>
                  </div>
                  <ul className="list-none flex flex-col gap-3 mb-7 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm text-muted items-start">
                        <CheckIcon className="w-[17px] h-[17px] text-brand shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                    {plan.missing?.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm text-muted items-start opacity-45 line-through">
                        <CheckIcon className="w-[17px] h-[17px] text-muted shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/register"
                    className={`flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all ${
                      plan.featured
                        ? "gradient-bg text-white shadow-[0_8px_28px_-8px_rgba(236,72,153,.5)] hover:-translate-y-0.5"
                        : "bg-surface border border-border text-text hover:bg-surface-strong hover:border-white/18"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="section py-[clamp(72px,9vw,120px)]" id="cta">
          <div className="mx-auto max-w-[1180px] px-[4%]">
            <div className="relative overflow-hidden rounded-[28px] text-center py-[clamp(60px,8vw,96px)] px-[clamp(24px,5vw,72px)] bg-[linear-gradient(135deg,rgba(124,58,237,.22),rgba(236,72,153,.16)_50%,rgba(249,115,22,.18))] border border-brand/30">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:46px_46px] [mask-image:radial-gradient(60%_80%_at_50%_50%,#000_20%,transparent_75%)] pointer-events-none" />
              <h2 className="font-display text-[clamp(32px,5vw,52px)] font-bold mb-4 leading-[1.12]">Ready to feel the beat?</h2>
              <p className="text-white/75 max-w-[520px] mx-auto mb-9 text-[17px]">
                Download OneBEAT and start your musical journey today. Available on all platforms.
              </p>
              <div className="flex justify-center flex-wrap gap-3.5">
                <a href="#" className="flex items-center gap-3 bg-black/55 border border-white/18 rounded-[14px] px-[22px] py-3 text-white hover:-translate-y-0.75 hover:border-white/40 hover:bg-black/75 transition-all text-left">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[26px] h-[26px]"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                  <div>
                    <small className="block text-[11px] text-white/60 leading-tight">Download on the</small>
                    <strong className="block text-[15px] font-semibold leading-tight">App Store</strong>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 bg-black/55 border border-white/18 rounded-[14px] px-[22px] py-3 text-white hover:-translate-y-0.75 hover:border-white/40 hover:bg-black/75 transition-all text-left">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[26px] h-[26px]"><path d="M3.18 23.04c.87.5 1.95.46 2.77-.09l11.09-6.4L3.18.96C2.31 1.46 1.23 1.5.36.96A2.08 2.08 0 0 0-.54 2.71v18.58c0 .76.31 1.49.9 2.75zm2.15-2.69L14.9 12 5.33 3.65l-2.15 1.24v11.5zm7.57 2.93l3.58-2.07 3.12 1.8c.7.4.7.4 0 .8l-3.12 1.8-3.58-2.07v-.26zm3.58-14.52L6.93 7.65l11.64 6.75 2.96-1.71-3.2-3.56z" /></svg>
                  <div>
                    <small className="block text-[11px] text-white/60 leading-tight">Get it on</small>
                    <strong className="block text-[15px] font-semibold leading-tight">Google Play</strong>
                  </div>
                </a>
              </div>
              <p className="mt-7 text-[13px] text-white/55">Free to download · No credit card required</p>
            </div>
          </div>
        </section>

        {/* ============ FEEDBACK ============ */}
        <section className="section py-[clamp(72px,9vw,120px)]" id="feedback">
          <div className="mx-auto max-w-[1180px] px-[4%]">
            <div className="grid grid-cols-[1fr_1.1fr] gap-[clamp(28px,4vw,56px)] items-start max-[1024px]:grid-cols-1">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-brand bg-brand/10 border border-brand/25 rounded-full px-3.5 py-[7px]">
                  <span className="w-1.5 h-1.5 rounded-full gradient-bg" />
                  Feedback
                </span>
                <h2 className="font-display text-[clamp(30px,4.4vw,44px)] font-bold mt-4 mb-3.5 leading-[1.12]">We&apos;d love your thoughts</h2>
                <p className="text-muted text-[16.5px] mb-6">Help us make OneBEAT better for everyone.</p>
                <ul className="list-none grid gap-3.5">
                  {[
                    "Tell us what features you'd like to see",
                    "Share your experience with music discovery",
                    "Let us know what's working and what isn't",
                    "Suggest improvements to the player experience",
                  ].map((point) => (
                    <li key={point} className="flex gap-3 text-muted text-[14.5px] items-start">
                      <CheckIcon className="w-[18px] h-[18px] text-brand shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-surface border border-border rounded-[22px] p-[30px] backdrop-blur-[10px] grid gap-3.5">
                <div className="grid grid-cols-2 gap-3.5 max-[520px]:grid-cols-1">
                  <div className="grid gap-1.5">
                    <span className="text-[12.5px] font-semibold text-muted">Name</span>
                    <input type="text" placeholder="Your name" className="bg-white/5 border border-border rounded-xl px-3.5 py-3 text-text text-[14.5px] outline-none focus:border-brand/55 focus:bg-brand/[.06] transition-all w-full" />
                  </div>
                  <div className="grid gap-1.5">
                    <span className="text-[12.5px] font-semibold text-muted">Email</span>
                    <input type="email" placeholder="you@example.com" className="bg-white/5 border border-border rounded-xl px-3.5 py-3 text-text text-[14.5px] outline-none focus:border-brand/55 focus:bg-brand/[.06] transition-all w-full" />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <span className="text-[12.5px] font-semibold text-muted">Category</span>
                  <select className="bg-white/5 border border-border rounded-xl px-3.5 py-3 text-text text-[14.5px] outline-none focus:border-brand/55 focus:bg-brand/[.06] transition-all w-full">
                    <option>Feature Request</option>
                    <option>Bug Report</option>
                    <option>General Feedback</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="grid gap-1.5">
                  <span className="text-[12.5px] font-semibold text-muted">Message</span>
                  <textarea placeholder="Tell us what you think..." className="bg-white/5 border border-border rounded-xl px-3.5 py-3 text-text text-[14.5px] outline-none focus:border-brand/55 focus:bg-brand/[.06] transition-all w-full resize-y min-h-[120px]" />
                </div>
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-full gradient-bg text-white shadow-[0_8px_28px_-8px_rgba(236,72,153,.5)] hover:-translate-y-0.5 transition-all">
                  Send Feedback
                </button>
                <p className="text-[12.5px] text-muted text-center">We read every piece of feedback. Thank you! 🙏</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ============ BETA POPUP ============ */}
      {showPopup && (
        <div className="fixed inset-0 z-[300] grid place-items-center p-5 bg-[rgba(7,7,11,.72)] backdrop-blur-[14px] animate-[fadeIn_0.3s_ease]" onClick={() => setShowPopup(false)}>
          <div className="relative w-[min(460px,100%)] text-center bg-[linear-gradient(180deg,rgba(26,22,38,.92),rgba(14,14,22,.96))] border border-brand/35 rounded-[26px] p-[34px_30px_28px] shadow-[0_40px_120px_-20px_rgba(0,0,0,.9)] animate-[popIn_0.45s_ease]" onClick={(e) => e.stopPropagation()}>
            <div className="absolute inset-x-0 top-0 h-[3px] gradient-bg rounded-t-[26px]" />
            <button onClick={() => setShowPopup(false)} className="absolute top-3.5 right-3.5 w-[34px] h-[34px] rounded-[10px] bg-surface border border-border text-muted grid place-items-center hover:text-white hover:border-brand/50 hover:rotate-90 transition-all">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>

            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[.16em] uppercase text-brand-2 bg-brand-2/10 border border-brand-2/30 rounded-full px-3.5 py-1.5">
              <span className="h-[7px] w-[7px] rounded-full bg-[#f472b6]" />
              Beta Access
            </span>

            <h3 className="font-display text-[clamp(26px,4.5vw,34px)] font-bold mt-[18px] mb-2.5 tracking-tight">
              Get <span className="gradient-text">early access</span> to OneBEAT
            </h3>
            <p className="text-muted text-[15px] mb-5">Be among the first to experience the future of music.</p>

            <ul className="list-none grid gap-2.5 text-left mb-6">
              {["Free premium access for 3 months", "Exclusive early artist features", "Priority customer support", "Help shape the product roadmap"].map((item) => (
                <li key={item} className="flex gap-2.5 text-[13.5px] text-muted items-start">
                  <CheckIcon className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 items-center">
              <input type="email" placeholder="Enter your email" className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-text text-[14.5px] outline-none focus:border-brand/55 focus:bg-brand/[.06] transition-all" />
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-full gradient-bg text-white shadow-[0_8px_28px_-8px_rgba(236,72,153,.5)] hover:-translate-y-0.5 transition-all">
                Join the Beta
              </button>
              <button onClick={() => setShowPopup(false)} className="bg-transparent border-0 text-muted text-[13px] font-medium hover:text-text transition-colors">
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ TOAST ============ */}
      <div className="fixed left-1/2 bottom-6 -translate-x-1/2 translate-y-20 z-[200] flex items-center gap-3 bg-[rgba(20,20,30,.92)] border border-white/14 rounded-[14px] px-[18px] py-3 text-[13.5px] font-medium shadow-[0_20px_60px_-12px_rgba(0,0,0,.8)] backdrop-blur-[16px] opacity-0 max-w-[88vw] animate-[fadeIn_0.4s_ease_2s_both]">
        <span className="grid h-[30px] w-[30px] place-items-center rounded-[8px] gradient-bg text-white shrink-0">
          <CheckIcon className="w-3.5 h-3.5" />
        </span>
        <span>
          <strong className="block leading-tight">Welcome to OneBEAT</strong>
          <small className="text-muted font-normal">Start exploring millions of tracks</small>
        </span>
      </div>
    </>
  );
}
