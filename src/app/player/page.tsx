"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  BrandMark,
  NoteIcon,
  PlayIcon,
  PauseIcon,
  HeartIcon,
  SkipBackIcon,
  SkipForwardIcon,
  ShuffleIcon,
  RepeatIcon,
  VolumeIcon,
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusIcon,
  MenuIcon,
} from "@/components/Icons";

/* ============ DATA ============ */
const TRACKS = [
  { id: 0, title: "Neon Dreams", artist: "Kira Solace", album: "Electric Sky", dur: 204, genre: "Alt Pop", grad: "linear-gradient(135deg,#3ddc84,#1b7f5e 60%,#0e3b2b)" },
  { id: 1, title: "Golden Hour", artist: "The Velvet Echo", album: "Daylight", dur: 178, genre: "Indie Rock", grad: "linear-gradient(135deg,#2ee57c,#7c3aed)" },
  { id: 2, title: "Midnight Drive", artist: "Aya Blaze", album: "Night Routes", dur: 252, genre: "Amapiano", grad: "linear-gradient(135deg,#16d1a0,#f59e0b)" },
  { id: 3, title: "Sugar Rush", artist: "DJ Kavana", album: "High Voltage", dur: 181, genre: "Afro House", grad: "linear-gradient(135deg,#2ee57c,#0ea5e9)" },
  { id: 4, title: "Ocean Eyes", artist: "Lena Marr", album: "Tides", dur: 227, genre: "R&B", grad: "linear-gradient(135deg,#34d399,#6366f1)" },
  { id: 5, title: "Pulse", artist: "Zephyr", album: "Signal", dur: 161, genre: "Electronic", grad: "linear-gradient(135deg,#4ade80,#f43f5e)" },
  { id: 6, title: "Velvet Sky", artist: "Kira Solace", album: "Electric Sky", dur: 213, genre: "Alt Pop", grad: "linear-gradient(135deg,#10b981,#0ea5e9)" },
  { id: 7, title: "Lagos Nights", artist: "DJ Kavana", album: "High Voltage", dur: 198, genre: "Afrobeat", grad: "linear-gradient(135deg,#f97316,#2ee57c)" },
  { id: 8, title: "Chrome Hearts", artist: "Nova Rayne", album: "Static Love", dur: 185, genre: "Pop", grad: "linear-gradient(135deg,#ec4899,#10b981)" },
  { id: 9, title: "Afterglow", artist: "The Velvet Echo", album: "Daylight", dur: 232, genre: "Indie Rock", grad: "linear-gradient(135deg,#8b5cf6,#34d399)" },
  { id: 10, title: "Static Bloom", artist: "Zephyr", album: "Signal", dur: 176, genre: "Lo-Fi", grad: "linear-gradient(135deg,#3f4a42,#2ee57c)" },
  { id: 11, title: "Ember & Ash", artist: "Kira Solace", album: "Electric Sky", dur: 241, genre: "Soul", grad: "linear-gradient(135deg,#a16207,#16d1a0)" },
  { id: 12, title: "Silver Lining", artist: "Lena Marr", album: "Tides", dur: 192, genre: "R&B", grad: "linear-gradient(135deg,#94a3b8,#10b981)" },
  { id: 13, title: "Hyperspace", artist: "Aya Blaze", album: "Night Routes", dur: 209, genre: "Electronic", grad: "linear-gradient(135deg,#22d3ee,#4ade80)" },
  { id: 14, title: "Wildfire", artist: "Nova Rayne", album: "Static Love", dur: 224, genre: "Pop", grad: "linear-gradient(135deg,#fb923c,#2ee57c)" },
  { id: 15, title: "Quiet Storm", artist: "The Velvet Echo", album: "Daylight", dur: 248, genre: "Soul", grad: "linear-gradient(135deg,#3b82f6,#34d399)" },
];

const PLAYLISTS = [
  { id: "focus", title: "Focus Flow", desc: "Deep work, zero noise", grad: "linear-gradient(135deg,#111812,#2ee57c)", tracks: [10, 12, 14, 4, 8] },
  { id: "gym", title: "Gym Rush", desc: "High energy for heavy reps", grad: "linear-gradient(135deg,#f43f5e,#2ee57c)", tracks: [3, 5, 9, 13, 15] },
  { id: "drive", title: "Night Drive", desc: "Neon streets, late hours", grad: "linear-gradient(135deg,#0ea5e9,#2ee57c)", tracks: [2, 6, 8, 11, 13] },
  { id: "lofi", title: "Lo-Fi Study", desc: "Calm loops for focus", grad: "linear-gradient(135deg,#57534e,#34d399)", tracks: [10, 1, 14, 12, 7] },
  { id: "afro", title: "Afrobeats Rising", desc: "Fresh rhythms from the continent", grad: "linear-gradient(135deg,#f97316,#2ee57c)", tracks: [7, 3, 9, 2, 15] },
  { id: "soul", title: "Sunday Soul", desc: "Slow mornings, warm voices", grad: "linear-gradient(135deg,#8b5cf6,#10b981)", tracks: [12, 6, 4, 11, 1] },
];

const ARTISTS_DATA = [
  { name: "Kira Solace", initials: "KS", listeners: "34.8K", genre: "Alt Pop", color: "linear-gradient(135deg,#2ee57c,#16d1a0)" },
  { name: "DJ Kavana", initials: "DK", listeners: "28.1K", genre: "Afro House", color: "linear-gradient(135deg,#0ea5e9,#16d1a0)" },
  { name: "The Velvet Echo", initials: "VE", listeners: "18.4K", genre: "Indie Rock", color: "linear-gradient(135deg,#8b5cf6,#34d399)" },
  { name: "Lena Marr", initials: "LM", listeners: "14.2K", genre: "R&B", color: "linear-gradient(135deg,#ec4899,#10b981)" },
  { name: "Aya Blaze", initials: "AB", listeners: "12.1K", genre: "Amapiano", color: "linear-gradient(135deg,#f59e0b,#2ee57c)" },
  { name: "Zephyr", initials: "ZE", listeners: "8.7K", genre: "Electronic", color: "linear-gradient(135deg,#f43f5e,#4ade80)" },
  { name: "Nova Rayne", initials: "NR", listeners: "6.3K", genre: "Pop", color: "linear-gradient(135deg,#22d3ee,#16d1a0)" },
];

const GENRES = ["All", "Alt Pop", "Afro House", "Amapiano", "Electronic", "Indie Rock", "Lo-Fi", "Pop", "R&B", "Soul", "Afrobeat"];

const THEMES = [
  { id: "emerald", color: "#2ee57c" },
  { id: "peach", color: "#ffb37e" },
  { id: "blue", color: "#5aa8ff" },
  { id: "purple", color: "#a78bfa" },
];

const THEME_MAP: Record<string, Record<string, string>> = {
  peach: { "--color-accent": "#ffb37e", "--color-accent-deep": "#ff8c5a" },
  blue: { "--color-accent": "#5aa8ff", "--color-accent-deep": "#3b82f6" },
  purple: { "--color-accent": "#a78bfa", "--color-accent-deep": "#8b5cf6" },
};

/* ============ HELPERS ============ */
function fmt(s: number) {
  s = Math.max(0, Math.floor(s));
  return Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60);
}

/* ============ COMPONENT ============ */
export default function AppPage() {
  const [view, setView] = useState<"home" | "search" | "library" | "playlist">("home");
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<"off" | "all" | "one">("off");
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [liked, setLiked] = useState<Set<number>>(new Set([0, 5, 9, 13]));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchGenre, setSearchGenre] = useState("All");
  const [activePlaylist, setActivePlaylist] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState("emerald");
  const [playlists, setPlaylists] = useState(PLAYLISTS);
  const [recent] = useState([8, 3, 11, 5, 13, 1]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentTrack = TRACKS[current];

  // Player progress
  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= currentTrack.dur) {
            setCurrent((c) => (c + 1) % TRACKS.length);
            return 0;
          }
          return p + 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, currentTrack.dur]);

  const playTrack = useCallback((id: number) => {
    setCurrent(id);
    setProgress(0);
    setPlaying(true);
  }, []);

  const togglePlay = () => setPlaying(!playing);

  const prev = () => {
    setCurrent((c) => (c - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const next = () => {
    setCurrent((c) => (c + 1) % TRACKS.length);
    setProgress(0);
  };

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const applyTheme = (id: string) => {
    setCurrentTheme(id);
    const vars = THEME_MAP[id];
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
    } else {
      document.documentElement.style.removeProperty("--color-accent");
      document.documentElement.style.removeProperty("--color-accent-deep");
    }
  };

  const filteredTracks = TRACKS.filter((t) => {
    const matchSearch = !searchTerm || t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGenre = searchGenre === "All" || t.genre === searchGenre;
    return matchSearch && matchGenre;
  });

  const recentTracks = recent.map((id) => TRACKS[id]).filter(Boolean);
  const playlist = activePlaylist ? playlists.find((p) => p.id === activePlaylist) : null;
  const playlistTracks = playlist ? playlist.tracks.map((id) => TRACKS[id]).filter(Boolean) : [];

  return (
    <div className="grid grid-cols-[264px_1fr] grid-rows-[1fr_auto] h-screen max-[1024px]:grid-cols-[216px_1fr] max-[768px]:grid-cols-1">
      {/* ============ SIDEBAR ============ */}
      <aside className={`row-span-2 flex flex-col bg-bg-soft border-r border-border p-5 pb-3 gap-4 overflow-hidden max-[768px]:fixed max-[768px]:inset-y-0 max-[768px]:left-0 max-[768px]:z-[60] max-[768px]:w-[264px] max-[768px]:transition-transform max-[768px]:duration-300 ${sidebarOpen ? "max-[768px]:translate-x-0" : "max-[768px]:-translate-x-full"}`}>
        <Link href="/" className="flex items-center gap-[11px] font-display font-bold text-xl tracking-tight p-0.5">
          <span className="grid h-[34px] w-[34px] place-items-center rounded-[10px] gradient-bg shadow-[0_6px_20px_-6px_rgba(236,72,153,.55)]">
            <BrandMark className="h-[17px] w-[17px] text-[#04110a]" />
          </span>
          <span>OneBEAT<small className="block text-[8.5px] font-body font-semibold tracking-[.3em] text-muted -mt-0.5">MUSIC</small></span>
        </Link>

        <nav className="grid gap-1">
          {[
            { id: "home", icon: <HomeIcon className="w-5 h-5" />, label: "Home" },
            { id: "search", icon: <SearchIcon className="w-5 h-5" />, label: "Search" },
            { id: "library", icon: <LibraryIcon className="w-5 h-5" />, label: "Library" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setView(item.id as typeof view); setSidebarOpen(false); }}
              className={`flex items-center gap-3.5 px-3 py-[11px] rounded-xl text-[14.5px] font-semibold border-0 bg-transparent text-left w-full transition-all hover:text-text hover:bg-white/5 ${view === item.id ? "text-[var(--color-brand,#2ee57c)] bg-[var(--color-accent-soft,rgba(46,229,124,.12))]" : "text-muted"}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center justify-between text-[11.5px] font-bold tracking-[.14em] uppercase text-muted px-3">
          <span>Playlists</span>
          <button
            onClick={() => {
              const name = prompt("Playlist name:");
              if (name) {
                setPlaylists((prev) => [...prev, {
                  id: `pl_${Date.now()}`,
                  title: name,
                  desc: "New playlist",
                  grad: `linear-gradient(135deg,${THEMES[Math.floor(Math.random() * THEMES.length)].color}33,#2ee57c)`,
                  tracks: [],
                }]);
              }
            }}
            className="bg-transparent border-0 text-muted p-1 hover:text-[var(--color-brand,#2ee57c)] hover:scale-110 transition-all"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>

        <ul className="list-none grid gap-0.5 overflow-y-auto flex-1 min-h-0 pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {playlists.map((pl) => (
            <li key={pl.id}>
              <button
                onClick={() => { setActivePlaylist(pl.id); setView("playlist"); setSidebarOpen(false); }}
                className={`flex-1 flex items-center gap-2.5 overflow-hidden bg-transparent border-0 text-muted text-[13.5px] font-medium px-3 py-[9px] rounded-[10px] w-full transition-all hover:text-text hover:bg-white/5 ${activePlaylist === pl.id && view === "playlist" ? "text-[var(--color-brand,#2ee57c)] bg-[var(--color-accent-soft,rgba(46,229,124,.12))]" : ""}`}
              >
                <span className="w-[26px] h-[26px] rounded-lg shrink-0 grid place-items-center" style={{ background: pl.grad }}>
                  <PlayIcon className="w-3 h-3 text-white/85" />
                </span>
                <span className="truncate">{pl.title}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="text-[10px] font-bold tracking-[.14em] uppercase text-muted px-3">Theme</div>
        <div className="flex items-center gap-2.5 px-3 mb-3">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => applyTheme(t.id)}
              className={`w-[26px] h-[26px] rounded-full p-0 border-2 border-white/15 transition-all hover:scale-110 ${currentTheme === t.id ? "border-white shadow-[0_0_0_3px_rgba(255,255,255,.22)]" : ""}`}
              style={{ background: t.color }}
            />
          ))}
        </div>

        <div className="border-t border-border pt-3 px-2">
          <p className="text-[11px] text-muted leading-relaxed">Streaming on OneBEAT · <strong className="text-[var(--color-brand,#2ee57c)]">V2.1.1 LTS BETA</strong></p>
          <div className="flex gap-2 mt-2.5 flex-wrap">
            <Link href="/register" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand/12 text-brand text-[11px] font-semibold no-underline">🎵 Artist Portal</Link>
            <Link href="/admin" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 text-muted text-[11px] font-semibold no-underline">⚙ Admin</Link>
          </div>
        </div>
      </aside>

      {/* Scrim for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/55 z-[55] max-[768px]:block" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ============ MAIN ============ */}
      <main className="row-1 overflow-y-auto min-w-0">
        <div className="max-w-[1560px] mx-auto p-[18px_28px_90px] max-[1024px]:p-[14px_18px_90px] max-[768px]:p-[10px_14px_90px]">
          {/* Topbar */}
          <div className="sticky top-0 z-20 flex items-center gap-3.5 py-3 pb-4 bg-gradient-to-b from-[var(--color-bg)] to-transparent">
            <button className="hidden max-[768px]:block bg-white/5 border border-border text-text p-[9px] rounded-[10px]" onClick={() => setSidebarOpen(true)}>
              <MenuIcon className="w-[19px] h-[19px]" />
            </button>
            <div className="relative flex-1 max-w-[460px]">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-muted pointer-events-none" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search songs, artists, playlists…"
                className="w-full bg-bg-card border border-border rounded-full py-[11px] pl-[42px] pr-4 text-text text-sm font-body outline-none focus:border-[var(--color-brand,#2ee57c)]/50 focus:shadow-[0_0_0_3px_rgba(46,229,124,.12)] transition-all placeholder:text-muted"
              />
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Link href="/" className="bg-bg-card border border-border rounded-[var(--radius-sm)] px-3.5 py-2 text-muted text-xs font-semibold no-underline transition-all hover:text-text">Home</Link>
              <button className="hidden max-[1024px]:block border border-[var(--color-brand,#2ee57c)]/40 text-[var(--color-brand,#2ee57c)] font-bold text-[12.5px] px-[18px] py-[9px] rounded-full bg-transparent hover:bg-[var(--color-brand,#2ee57c)] hover:text-[#04110a] transition-all">Go Premium</button>
              <button className="flex items-center gap-2.5 bg-bg-card border border-border px-3.5 py-[5px] pr-3.5 rounded-full text-[13px] font-semibold">
                <span className="w-7 h-7 rounded-full gradient-bg text-[#04110a] grid place-items-center font-bold text-xs">LK</span>
                <span>Laker</span>
              </button>
            </div>
          </div>

          {/* ============ HOME VIEW ============ */}
          {view === "home" && (
            <>
              <h2 className="font-display text-[clamp(26px,3vw,34px)] font-bold tracking-tight mb-4">
                Good evening <span className="gradient-text">Laker</span>
              </h2>

              {/* Quick picks */}
              <section className="mt-1.5">
                <div className="flex items-center justify-between mb-4 gap-3">
                  <h2 className="font-display text-[21px] font-bold tracking-tight">Recently Played</h2>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-3.5 snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden">
                  {recentTracks.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => playTrack(t.id)}
                      className={`snap-start bg-bg-card border border-border rounded-[var(--radius)] p-3 cursor-pointer text-left hover:bg-bg-card-hover hover:-translate-y-1 transition-all min-w-[172px] ${current === t.id && playing ? "ring-2 ring-[var(--color-brand,#2ee57c)] shadow-[0_14px_34px_-10px_rgba(46,229,124,.5)]" : ""}`}
                    >
                      <div className="relative rounded-xl aspect-square overflow-hidden mb-3" style={{ background: t.grad }}>
                        <NoteIcon className="absolute inset-0 m-auto w-[42%] h-[42%] text-white/28" />
                        <button className="absolute right-2.5 bottom-2.5 z-[3] w-[42px] h-[42px] rounded-full bg-[var(--color-brand,#2ee57c)] text-[#04110a] border-0 grid place-items-center shadow-[0_8px_24px_-6px_rgba(46,229,124,.6)] opacity-0 translate-y-2 scale-75 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                          <PlayIcon className="w-[18px] h-[18px]" />
                        </button>
                      </div>
                      <h4 className="text-[14.5px] font-semibold truncate">{t.title}</h4>
                      <p className="text-[12.5px] text-muted mt-0.5 truncate">{t.artist}</p>
                    </button>
                  ))}
                </div>
              </section>

              {/* Featured Playlists */}
              <section className="mt-9">
                <div className="flex items-center justify-between mb-4 gap-3">
                  <h2 className="font-display text-[21px] font-bold tracking-tight">Playlists For You</h2>
                  <button className="text-muted text-[12.5px] font-semibold hover:text-[var(--color-brand,#2ee57c)] transition-colors">See all</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-3.5 snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden">
                  {playlists.map((pl) => (
                    <button
                      key={pl.id}
                      onClick={() => { setActivePlaylist(pl.id); setView("playlist"); }}
                      className="snap-start bg-bg-card border border-border rounded-[var(--radius)] p-3 cursor-pointer text-left hover:bg-bg-card-hover hover:-translate-y-1 transition-all min-w-[172px]"
                    >
                      <div className="relative rounded-xl aspect-square overflow-hidden mb-3 grid place-items-center" style={{ background: pl.grad }}>
                        <PlayIcon className="w-[34%] h-[34%] text-white/90" />
                      </div>
                      <h4 className="text-[14.5px] font-semibold truncate">{pl.title}</h4>
                      <p className="text-[12.5px] text-muted mt-0.5 truncate">{pl.desc}</p>
                    </button>
                  ))}
                </div>
              </section>

              {/* New Releases */}
              <section className="mt-9">
                <div className="flex items-center justify-between mb-4 gap-3">
                  <h2 className="font-display text-[21px] font-bold tracking-tight">New Releases</h2>
                  <button className="text-muted text-[12.5px] font-semibold hover:text-[var(--color-brand,#2ee57c)] transition-colors">See all</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-3.5 snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden">
                  {TRACKS.slice(8).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => playTrack(t.id)}
                      className="snap-start bg-bg-card border border-border rounded-[var(--radius)] p-3 cursor-pointer text-left hover:bg-bg-card-hover hover:-translate-y-1 transition-all min-w-[172px]"
                    >
                      <div className="relative rounded-xl aspect-square overflow-hidden mb-3" style={{ background: t.grad }}>
                        <NoteIcon className="absolute inset-0 m-auto w-[42%] h-[42%] text-white/28" />
                        <button className="absolute right-2.5 bottom-2.5 z-[3] w-[42px] h-[42px] rounded-full bg-[var(--color-brand,#2ee57c)] text-[#04110a] border-0 grid place-items-center opacity-0 translate-y-2 scale-75 transition-all hover:opacity-100 hover:translate-y-0 hover:scale-100">
                          <PlayIcon className="w-[18px] h-[18px]" />
                        </button>
                      </div>
                      <h4 className="text-[14.5px] font-semibold truncate">{t.title}</h4>
                      <p className="text-[12.5px] text-muted mt-0.5 truncate">{t.artist}</p>
                    </button>
                  ))}
                </div>
              </section>

              {/* Artists */}
              <section className="mt-9">
                <div className="flex items-center justify-between mb-4 gap-3">
                  <h2 className="font-display text-[21px] font-bold tracking-tight">Popular Artists</h2>
                  <button className="text-muted text-[12.5px] font-semibold hover:text-[var(--color-brand,#2ee57c)] transition-colors">See all</button>
                </div>
                <div className="flex gap-3.5 overflow-x-auto pb-3.5 snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden">
                  {ARTISTS_DATA.map((a) => (
                    <div key={a.name} className="snap-center bg-transparent border-0 text-center cursor-pointer p-2.5 rounded-[var(--radius)] hover:bg-bg-card transition-all min-w-[132px]">
                      <div className="relative w-full aspect-square rounded-full overflow-hidden grid place-items-center mb-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,.1),0_12px_30px_-12px_rgba(0,0,0,.7)]" style={{ background: a.color }}>
                        <span className="font-display text-[clamp(20px,2.4vw,30px)] font-bold text-white/92 tracking-tight relative z-[1]">{a.initials}</span>
                      </div>
                      <h4 className="text-[14.5px] font-semibold">{a.name}</h4>
                      <p className="text-xs text-muted mt-0.5">{a.genre}</p>
                      <span className="inline-flex items-center gap-1 mt-[7px] text-[10.5px] font-bold tracking-[.08em] uppercase text-[var(--color-brand,#2ee57c)] bg-[var(--color-accent-soft,rgba(46,229,124,.12))] px-[9px] py-[3px] rounded-full">{a.listeners}</span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* ============ SEARCH VIEW ============ */}
          {view === "search" && (
            <>
              <h2 className="font-display text-[clamp(26px,3vw,34px)] font-bold tracking-tight mb-5">Search</h2>
              <div className="flex gap-2.5 flex-wrap mb-6">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSearchGenre(g)}
                    className={`bg-bg-card border border-border text-muted text-[13px] font-semibold px-[18px] py-2 rounded-full transition-all hover:text-text hover:-translate-y-px ${searchGenre === g ? "bg-[var(--color-brand,#2ee57c)] border-transparent text-[#04110a]" : ""}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              {filteredTracks.length === 0 ? (
                <div className="text-center py-[60px] px-5 text-muted">
                  <SearchIcon className="w-[46px] h-[46px] mx-auto mb-3.5 opacity-50" />
                  <h3 className="font-display text-text text-lg mb-1.5">No results found</h3>
                  <p className="text-sm">Try a different search term or genre.</p>
                </div>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(168px,1fr))] gap-4">
                  {filteredTracks.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => playTrack(t.id)}
                      className={`bg-bg-card border border-border rounded-[var(--radius)] p-3 cursor-pointer text-left hover:bg-bg-card-hover hover:-translate-y-1 transition-all ${current === t.id && playing ? "ring-2 ring-[var(--color-brand,#2ee57c)]" : ""}`}
                    >
                      <div className="relative rounded-xl aspect-square overflow-hidden mb-3" style={{ background: t.grad }}>
                        <NoteIcon className="absolute inset-0 m-auto w-[42%] h-[42%] text-white/28" />
                        <button className="absolute right-2.5 bottom-2.5 z-[3] w-[42px] h-[42px] rounded-full bg-[var(--color-brand,#2ee57c)] text-[#04110a] border-0 grid place-items-center opacity-0 translate-y-2 scale-75 transition-all hover:opacity-100 hover:translate-y-0">
                          <PlayIcon className="w-[18px] h-[18px]" />
                        </button>
                      </div>
                      <h4 className="text-[14.5px] font-semibold truncate">{t.title}</h4>
                      <p className="text-[12.5px] text-muted mt-0.5 truncate">{t.artist}</p>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ============ LIBRARY VIEW ============ */}
          {view === "library" && (
            <>
              <h2 className="font-display text-[clamp(26px,3vw,34px)] font-bold tracking-tight mb-5">Your Library</h2>
              <section className="mb-9">
                <h2 className="font-display text-[21px] font-bold tracking-tight mb-4">Liked Songs</h2>
                {liked.size === 0 ? (
                  <div className="text-center py-[60px] text-muted">
                    <HeartIcon className="w-[46px] h-[46px] mx-auto mb-3.5 opacity-50" />
                    <h3 className="font-display text-text text-lg mb-1.5">No liked songs yet</h3>
                    <p className="text-sm">Songs you like will appear here.</p>
                  </div>
                ) : (
                  <div className="grid gap-0.5">
                    {TRACKS.filter((t) => liked.has(t.id)).map((t, i) => (
                      <div
                        key={t.id}
                        onClick={() => playTrack(t.id)}
                        className={`grid grid-cols-[28px_1fr_90px_44px] gap-3.5 items-center px-3 py-2.5 rounded-xl cursor-pointer transition-colors hover:bg-bg-card ${current === t.id && playing ? "bg-[var(--color-accent-soft,rgba(46,229,124,.12))]" : ""}`}
                      >
                        <span className={`text-sm font-mono text-center ${current === t.id ? "text-[var(--color-brand,#2ee57c)]" : "text-muted"}`}>{i + 1}</span>
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-[42px] h-[42px] rounded-lg shrink-0" style={{ background: t.grad }} />
                          <div className="min-w-0">
                            <h4 className={`text-sm font-semibold truncate ${current === t.id ? "text-[var(--color-brand,#2ee57c)]" : ""}`}>{t.title}</h4>
                            <p className="text-[12.5px] text-muted truncate">{t.artist}</p>
                          </div>
                        </div>
                        <span className="text-[12.5px] text-muted font-mono text-right">{fmt(t.dur)}</span>
                        <button onClick={(e) => { e.stopPropagation(); toggleLike(t.id); }} className={`bg-transparent border-0 text-muted p-1 rounded-lg transition-colors justify-self-end ${liked.has(t.id) ? "text-[var(--color-brand,#2ee57c)]" : "hover:text-text"}`}>
                          <HeartIcon className="w-4 h-4" filled={liked.has(t.id)} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}

          {/* ============ PLAYLIST VIEW ============ */}
          {view === "playlist" && playlist && (
            <>
              <div className="flex items-end gap-[22px] p-[26px] rounded-[22px] mb-[26px] border border-border relative overflow-hidden bg-[linear-gradient(160deg,rgba(46,229,124,.16),rgba(7,11,8,.4)_60%)]">
                <div className="w-[148px] h-[148px] rounded-2xl shrink-0 grid place-items-center shadow-[0_18px_44px_-14px_rgba(0,0,0,.7)] max-[480px]:w-[110px] max-[480px]:h-[110px]" style={{ background: playlist.grad }}>
                  <PlayIcon className="w-[46%] h-[46%] text-white/90" />
                </div>
                <div>
                  <div className="text-[11.5px] font-bold tracking-[.16em] uppercase text-[var(--color-brand,#2ee57c)]">Playlist</div>
                  <h1 className="font-display text-[clamp(28px,4vw,44px)] font-bold tracking-tight mt-1.5 mb-2">{playlist.title}</h1>
                  <p className="text-muted text-[13.5px]">{playlist.desc} · {playlistTracks.length} tracks</p>
                  <button
                    onClick={() => { if (playlistTracks.length > 0) playTrack(playlistTracks[0].id); }}
                    className="mt-4 inline-flex items-center gap-2.5 bg-[var(--color-brand,#2ee57c)] text-[#04110a] border-0 font-bold text-sm px-[26px] py-3 rounded-full shadow-[0_10px_28px_-8px_rgba(46,229,124,.6)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-8px_rgba(46,229,124,.75)] transition-all"
                  >
                    <PlayIcon className="w-[17px] h-[17px]" />
                    Play All
                  </button>
                </div>
              </div>

              <div className="grid gap-0.5">
                {playlistTracks.map((t, i) => (
                  <div
                    key={t.id}
                    onClick={() => playTrack(t.id)}
                    className={`grid grid-cols-[28px_1fr_90px_44px] gap-3.5 items-center px-3 py-2.5 rounded-xl cursor-pointer transition-colors hover:bg-bg-card ${current === t.id && playing ? "bg-[var(--color-accent-soft,rgba(46,229,124,.12))]" : ""}`}
                  >
                    <span className={`text-sm font-mono text-center ${current === t.id ? "text-[var(--color-brand,#2ee57c)]" : "text-muted"}`}>{i + 1}</span>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-[42px] h-[42px] rounded-lg shrink-0" style={{ background: t.grad }} />
                      <div className="min-w-0">
                        <h4 className={`text-sm font-semibold truncate ${current === t.id ? "text-[var(--color-brand,#2ee57c)]" : ""}`}>{t.title}</h4>
                        <p className="text-[12.5px] text-muted truncate">{t.artist}</p>
                      </div>
                    </div>
                    <span className="text-[12.5px] text-muted font-mono text-right">{fmt(t.dur)}</span>
                    <button onClick={(e) => { e.stopPropagation(); toggleLike(t.id); }} className={`bg-transparent border-0 text-muted p-1 rounded-lg transition-colors justify-self-end ${liked.has(t.id) ? "text-[var(--color-brand,#2ee57c)]" : "hover:text-text"}`}>
                      <HeartIcon className="w-4 h-4" filled={liked.has(t.id)} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* ============ PLAYER BAR ============ */}
      <footer className="col-span-2 z-30 grid grid-cols-[1fr_auto_1fr] items-center gap-[18px] px-[22px] py-3 bg-[rgba(10,15,11,.92)] border-t border-border backdrop-blur-[20px] max-[1024px]:grid-cols-[1fr_auto] max-[1024px]:gap-2 max-[768px]:col-span-1 max-[768px]:grid-cols-1 max-[768px]:gap-2 max-[768px]:px-4">
        {/* Left */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative w-14 h-14 rounded-xl shrink-0 overflow-hidden shadow-[0_8px_22px_-8px_rgba(0,0,0,.8)]" style={{ background: currentTrack.grad }}>
            <NoteIcon className="absolute inset-0 m-auto w-[40%] h-[40%] text-white/50" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold truncate">{currentTrack.title}</h4>
            <p className="text-xs text-muted truncate">{currentTrack.artist}</p>
          </div>
          <button onClick={() => toggleLike(current)} className={`bg-transparent border-0 text-muted p-1.5 transition-all hover:text-text hover:scale-110 ${liked.has(current) ? "text-[var(--color-brand,#2ee57c)]" : ""}`}>
            <HeartIcon className="w-[17px] h-[17px]" filled={liked.has(current)} />
          </button>
        </div>

        {/* Center */}
        <div className="flex flex-col items-center gap-2 min-w-[300px] max-w-[560px] w-full max-[1024px]:min-w-0 max-[1024px]:w-full max-[768px]:min-w-0">
          <div className="flex items-center gap-5">
            <button onClick={() => setShuffle(!shuffle)} className={`bg-transparent border-0 text-muted p-1 transition-all hover:text-text hover:scale-110 ${shuffle ? "text-[var(--color-brand,#2ee57c)]" : ""}`}>
              <ShuffleIcon className="w-[19px] h-[19px]" />
            </button>
            <button onClick={prev} className="bg-transparent border-0 text-muted p-1 transition-all hover:text-text hover:scale-110">
              <SkipBackIcon className="w-[19px] h-[19px]" />
            </button>
            <button onClick={togglePlay} className="w-[46px] h-[46px] rounded-full bg-[var(--color-brand,#2ee57c)] text-[#04110a] border-0 grid place-items-center shadow-[0_8px_24px_-6px_rgba(46,229,124,.55)] hover:scale-[1.07] hover:shadow-[0_12px_30px_-6px_rgba(46,229,124,.7)] transition-all">
              {playing ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
            </button>
            <button onClick={next} className="bg-transparent border-0 text-muted p-1 transition-all hover:text-text hover:scale-110">
              <SkipForwardIcon className="w-[19px] h-[19px]" />
            </button>
            <button onClick={() => setRepeat(repeat === "off" ? "all" : repeat === "all" ? "one" : "off")} className={`bg-transparent border-0 text-muted p-1 transition-all hover:text-text hover:scale-110 relative ${repeat !== "off" ? "text-[var(--color-brand,#2ee57c)]" : ""}`}>
              <RepeatIcon className="w-[19px] h-[19px]" />
              {repeat === "one" && <span className="absolute -right-0.5 -top-0.5 text-[8px] font-bold text-[#04110a] bg-[var(--color-brand,#2ee57c)] w-3 h-3 rounded-full grid place-items-center">1</span>}
            </button>
          </div>
          <div className="flex items-center gap-2.5 w-full">
            <span className="text-[11px] text-muted font-mono min-w-[36px]">{fmt(progress)}</span>
            <div className="relative flex-1 h-3.5 flex items-center cursor-pointer group">
              <div className="absolute inset-x-0 top-0 h-[5px] rounded-full bg-white/14 overflow-visible">
                <div className="absolute h-full rounded-full gradient-bg shadow-[0_0_10px_rgba(46,229,124,.5)]" style={{ width: `${(progress / currentTrack.dur) * 100}%` }} />
              </div>
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[13px] h-[13px] rounded-full bg-white shadow-[0_0_8px_rgba(46,229,124,.8)] scale-0 group-hover:scale-100 transition-transform" style={{ left: `${(progress / currentTrack.dur) * 100}%` }} />
            </div>
            <span className="text-[11px] text-muted font-mono min-w-[36px] text-right">{fmt(currentTrack.dur)}</span>
          </div>
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-2.5 justify-self-end">
          <div className="flex items-center gap-2">
            <VolumeIcon className="w-[17px] h-[17px] text-muted" />
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 h-[5px] rounded-full bg-white/14 outline-none cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[13px] [&::-webkit-slider-thumb]:h-[13px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(46,229,124,.7)]"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
