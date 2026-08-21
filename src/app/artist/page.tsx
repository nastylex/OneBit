"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BrandMark,
  GridIcon,
  UserIcon,
  MusicIcon,
  UploadIcon,
  BarChartIcon,
  MessageIcon,
  DollarIcon,
  SettingsIcon,
  MenuIcon,
  CheckIcon,
} from "@/components/Icons";

const PAGES = [
  { id: "overview", label: "Overview", icon: <GridIcon className="w-[18px] h-[18px]" /> },
  { id: "profile", label: "My Profile", icon: <UserIcon className="w-[18px] h-[18px]" /> },
  { id: "songs", label: "My Songs", icon: <MusicIcon className="w-[18px] h-[18px]" />, badge: 12 },
  { id: "upload", label: "Upload Music", icon: <UploadIcon className="w-[18px] h-[18px]" /> },
  { id: "analytics", label: "Analytics", icon: <BarChartIcon className="w-[18px] h-[18px]" /> },
  { id: "comments", label: "Comments", icon: <MessageIcon className="w-[18px] h-[18px]" />, badge: 8 },
  { id: "earnings", label: "Earnings", icon: <DollarIcon className="w-[18px] h-[18px]" /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon className="w-[18px] h-[18px]" /> },
];

const PROFILE = {
  stageName: "Kira Solace", legalName: "Kira M. Solace", email: "kira@onebeat.io",
  country: "United States", location: "Los Angeles, CA", genre: "Pop",
  bio: "Independent pop artist known for ethereal vocals and cinematic production. Blending electronic textures with organic instrumentation to create immersive sonic landscapes.",
  verified: true, followers: 84200, monthlyListeners: 34800, totalStreams: 582000,
  label: "Independent",
  avatar: "linear-gradient(135deg,#a855f7,#ec4899)",
  cover: "linear-gradient(135deg,#a855f7,#ec4899 55%,#f97316)",
  socials: { instagram: "@kirasolace", twitter: "@kira_solace", spotify: "Kira Solace", youtube: "Kira Solace Music" },
};

const MY_SONGS = [
  { title: "Neon Dreams", album: "Electric Sky", genre: "Pop", dur: 204, status: "published", streams: 142000, likes: 8900, date: "2024-09-15" },
  { title: "Velvet Sky", album: "Electric Sky", genre: "Pop", dur: 213, status: "published", streams: 52000, likes: 3400, date: "2024-09-15" },
  { title: "Ember & Ash", album: "Electric Sky", genre: "Pop", dur: 241, status: "published", streams: 48000, likes: 2800, date: "2024-09-15" },
  { title: "Electric Feel", album: "Electric Sky", genre: "Pop", dur: 198, status: "published", streams: 42000, likes: 2200, date: "2024-09-15" },
  { title: "Crystal Waves", album: "Electric Sky", genre: "Pop", dur: 215, status: "published", streams: 36000, likes: 1900, date: "2024-09-15" },
  { title: "Horizon", album: "", genre: "Pop", dur: 210, status: "pending_review", streams: 0, likes: 0, date: "2025-08-18" },
  { title: "After Midnight", album: "", genre: "Pop", dur: 195, status: "draft", streams: 0, likes: 0, date: "2025-08-19" },
];

const COMMENTS = [
  { user: "MusicLover99", song: "Neon Dreams", text: "This song is absolutely incredible! The production is next level 🔥", time: "2 hours ago", likes: 42 },
  { user: "BeatDropper", song: "Velvet Sky", text: "Kira never misses. This album is a masterpiece.", time: "5 hours ago", likes: 28 },
  { user: "SynthWave_Fan", song: "Neon Dreams", text: "The synth work in this is so unique. More like this please!", time: "1 day ago", likes: 35 },
  { user: "IndieVibes", song: "Ember & Ash", text: "Underrated track. This deserves more streams.", time: "1 day ago", likes: 19 },
];

function fmt(n: number) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toString();
}

function fmtDur(s: number) {
  return Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60);
}

const STATUS_MAP: Record<string, string> = {
  published: "bg-[rgba(52,211,153,.12)] text-[#34d399]",
  pending_review: "bg-[rgba(251,191,36,.12)] text-[#fbbf24]",
  draft: "bg-[rgba(255,255,255,.06)] text-[#9d9dab]",
};

export default function ArtistPage() {
  const [page, setPage] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [uploadStep, setUploadStep] = useState(1);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const totalStreams = MY_SONGS.filter((s) => s.status === "published").reduce((a, s) => a + s.streams, 0);
  const totalLikes = MY_SONGS.filter((s) => s.status === "published").reduce((a, s) => a + s.likes, 0);

  const monthlyStreams = [42, 48, 56, 68, 78, 88, 96, 108, 124, 142, 158, 172];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const maxS = Math.max(...monthlyStreams);

  return (
    <div className="grid grid-cols-[var(--sidebar-w,250px)_1fr] h-screen overflow-hidden max-[1024px]:grid-cols-1">
      {/* SIDEBAR */}
      <aside className={`row-span-2 flex flex-col bg-bg-soft border-r border-border p-4 gap-1 overflow-y-auto max-[1024px]:fixed max-[1024px]:left-0 max-[1024px]:top-0 max-[1024px]:bottom-0 max-[1024px]:z-[60] max-[1024px]:w-[250px] max-[1024px]:transition-transform max-[1024px]:duration-300 ${sidebarOpen ? "max-[1024px]:translate-x-0" : "max-[1024px]:-translate-x-full"}`}>
        <Link href="/" className="flex items-center gap-2.5 p-2 font-display font-bold text-lg tracking-tight mb-3">
          <span className="grid h-8 w-8 place-items-center rounded-[9px] gradient-bg shadow-[0_6px_20px_-6px_rgba(236,72,153,.55)]"><BrandMark className="w-4 h-4 text-white" /></span>
          <span>OneBEAT<small className="block text-[8px] font-body font-semibold tracking-[.3em] text-[#9d9dab] -mt-0.5">ARTIST</small></span>
        </Link>
        <div className="text-[10px] font-bold tracking-[.14em] uppercase text-white/35 px-3 pt-3.5 pb-1.5">Main</div>
        {PAGES.slice(0, 2).map((item) => (
          <button key={item.id} onClick={() => { setPage(item.id); setSidebarOpen(false); }} className={`relative flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13.5px] font-semibold border-0 bg-transparent text-left w-full transition-all hover:text-text hover:bg-[rgba(255,255,255,.07)] ${page === item.id ? "text-white bg-[rgba(168,85,247,.18)]" : "text-[#9d9dab]"}`}>
            {item.icon}{item.label}
          </button>
        ))}
        <div className="text-[10px] font-bold tracking-[.14em] uppercase text-white/35 px-3 pt-3.5 pb-1.5">Music</div>
        {PAGES.slice(2, 6).map((item) => (
          <button key={item.id} onClick={() => { setPage(item.id); setSidebarOpen(false); }} className={`relative flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13.5px] font-semibold border-0 bg-transparent text-left w-full transition-all hover:text-text hover:bg-[rgba(255,255,255,.07)] ${page === item.id ? "text-white bg-[rgba(168,85,247,.18)]" : "text-[#9d9dab]"}`}>
            {item.icon}{item.label}
            {item.badge && <span className="ml-auto bg-[#ec4899] text-white text-[10px] font-bold px-[7px] py-[2px] rounded-full min-w-[20px] text-center">{item.badge}</span>}
          </button>
        ))}
        <div className="text-[10px] font-bold tracking-[.14em] uppercase text-white/35 px-3 pt-3.5 pb-1.5">More</div>
        {PAGES.slice(6).map((item) => (
          <button key={item.id} onClick={() => { setPage(item.id); setSidebarOpen(false); }} className={`relative flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13.5px] font-semibold border-0 bg-transparent text-left w-full transition-all hover:text-text hover:bg-[rgba(255,255,255,.07)] ${page === item.id ? "text-white bg-[rgba(168,85,247,.18)]" : "text-[#9d9dab]"}`}>
            {item.icon}{item.label}
          </button>
        ))}
        <div className="mt-auto border-t border-[rgba(255,255,255,.09)] pt-3.5 px-2">
          <div className="flex items-center gap-2.5">
            <span className="w-[34px] h-[34px] rounded-full grid place-items-center font-bold text-xs shrink-0 text-white" style={{ background: PROFILE.avatar }}>KS</span>
            <div><div className="text-[13px] font-semibold">{PROFILE.stageName}</div><div className="text-[11px] text-[#34d399]">✓ Verified Artist</div></div>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-[55] max-[1024px]:block" onClick={() => setSidebarOpen(false)} />}

      {/* MAIN */}
      <main className="row-1 overflow-y-auto flex flex-col">
        <div className="sticky top-0 z-20 flex items-center gap-3.5 px-7 py-3.5 bg-gradient-to-b from-[var(--color-bg)] to-transparent backdrop-blur-[12px]">
          <button className="hidden max-[1024px]:flex bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[10px] p-2 text-[var(--color-text)]" onClick={() => setSidebarOpen(true)}>
            <MenuIcon className="w-[18px] h-[18px]" />
          </button>
          <h1 className="font-display text-[22px] font-bold tracking-tight capitalize">{PAGES.find((p) => p.id === page)?.label || page}</h1>
          <div className="ml-auto flex items-center gap-3">
            <Link href="/player" className="text-xs font-semibold px-3.5 py-2 rounded-[10px] bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] text-[#9d9dab] hover:text-text transition-all">Public Platform</Link>
          </div>
        </div>

        <div className="px-7 pb-10 flex-1">
          {/* ============ OVERVIEW ============ */}
          {page === "overview" && (
            <>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 mb-7">
                {[
                  { label: "Total Streams", value: fmt(totalStreams) },
                  { label: "Monthly Listeners", value: fmt(PROFILE.monthlyListeners) },
                  { label: "Followers", value: fmt(PROFILE.followers) },
                  { label: "Total Likes", value: fmt(totalLikes) },
                  { label: "Songs", value: MY_SONGS.filter((s) => s.status === "published").length.toString() },
                  { label: "Albums", value: "2" },
                ].map((s) => (
                  <div key={s.label} className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] p-5 transition-all hover:-translate-y-0.5 hover:border-white/16">
                    <h3 className="text-[26px] font-bold font-display tracking-tight">{s.value}</h3>
                    <p className="text-xs text-[#9d9dab] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Stream Growth */}
              <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] p-[22px] mb-7">
                <div className="flex items-center justify-between mb-[18px]"><h3 className="text-[15px] font-bold">Stream Growth</h3></div>
                <div className="relative h-[200px]">
                  <div className="flex items-end gap-1 h-full pb-6">
                    {monthlyStreams.map((v, i) => (
                      <div key={i} className="flex-1 rounded-t gradient-bg min-h-1 cursor-pointer transition-[height]" style={{ height: `${(v / maxS) * 100}%` }} />
                    ))}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 flex justify-between text-[10px] text-[#9d9dab]">
                    {months.map((m) => <span key={m}>{m}</span>)}
                  </div>
                </div>
              </div>

              {/* Top Songs */}
              <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] p-[22px]">
                <h3 className="text-[15px] font-bold mb-4">Top Songs</h3>
                <div className="grid gap-2">
                  {MY_SONGS.filter((s) => s.status === "published").sort((a, b) => b.streams - a.streams).slice(0, 5).map((s, i) => {
                    const pct = Math.round((s.streams / MY_SONGS[0].streams) * 100);
                    return (
                      <div key={s.title} className="flex items-center gap-2.5">
                        <span className="text-[13px] font-bold text-[#9d9dab] min-w-5 text-right">{i + 1}</span>
                        <div className="flex-1">
                          <div className="flex justify-between mb-0.5">
                            <span className="text-[13px] font-semibold">{s.title}</span>
                            <span className="text-xs text-[#9d9dab]">{fmt(s.streams)}</span>
                          </div>
                          <div className="h-1 rounded-full bg-[rgba(255,255,255,.07)] overflow-hidden">
                            <div className="h-full rounded-full gradient-bg" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* ============ PROFILE ============ */}
          {page === "profile" && (
            <>
              <div className="relative rounded-[22px] overflow-hidden mb-6">
                <div className="h-[200px] relative" style={{ background: PROFILE.cover }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />
                </div>
                <div className="relative px-7 -mt-12 pb-7 flex items-end gap-5 max-[768px]:flex-col max-[768px]:items-start">
                  <div className="w-[100px] h-[100px] rounded-full grid place-items-center text-[32px] font-bold flex-shrink-0 border-4 border-[var(--color-bg)] relative z-[1] shadow-[0_10px_30px_rgba(0,0,0,.6)] text-white" style={{ background: PROFILE.avatar }}>KS</div>
                  <div>
                    <h2 className="font-display text-2xl font-bold">{PROFILE.stageName} <span className="text-[var(--color-brand)]">✓ Verified</span></h2>
                    <p className="text-[#9d9dab] text-[13px] mt-0.5">{PROFILE.genre} · {PROFILE.location}</p>
                    <div className="flex gap-6 mt-2.5">
                      {[{ v: fmt(PROFILE.followers), l: "Followers" }, { v: fmt(PROFILE.monthlyListeners), l: "Monthly Listeners" }, { v: fmt(PROFILE.totalStreams), l: "Total Streams" }].map((s) => (
                        <div key={s.l} className="text-center"><strong className="block text-base font-bold">{s.v}</strong><span className="text-[11px] text-[#9d9dab]">{s.l}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] p-[22px] mb-4">
                <h3 className="text-[15px] font-bold mb-4">Biography</h3>
                <p className="text-[#9d9dab] text-[13.5px] leading-relaxed">{PROFILE.bio}</p>
              </div>
              <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] p-[22px]">
                <h3 className="text-[15px] font-bold mb-4">Social Links</h3>
                {Object.entries(PROFILE.socials).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-3 border-b border-white/[.04] last:border-b-0">
                    <div className="text-[13.5px] font-medium capitalize">{k}</div>
                    <span className="text-[var(--color-brand)] text-[13px]">{v}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ============ SONGS ============ */}
          {page === "songs" && (
            <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 flex-wrap gap-3">
                <h3 className="text-[15px] font-bold">My Songs ({MY_SONGS.length})</h3>
                <button onClick={() => setPage("upload")} className="inline-flex items-center gap-2 font-semibold text-xs px-3.5 py-2 rounded-[10px] gradient-bg text-white shadow-[0_6px_20px_-6px_rgba(236,72,153,.5)] hover:-translate-y-0.5 transition-all">+ Upload New</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead><tr>
                    {["Title", "Album", "Genre", "Duration", "Streams", "Likes", "Status", "Date"].map((h) => (
                      <th key={h} className="text-[11px] font-bold tracking-[.08em] uppercase text-[#9d9dab] text-left px-4 py-3 border-b border-[rgba(255,255,255,.09)] whitespace-nowrap">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {MY_SONGS.map((s) => (
                      <tr key={s.title} className="hover:bg-[rgba(255,255,255,.02)]">
                        <td className="px-4 py-3 border-b border-white/[.04] text-[13px]"><strong>{s.title}</strong></td>
                        <td className="px-4 py-3 border-b border-white/[.04] text-[13px]">{s.album || "—"}</td>
                        <td className="px-4 py-3 border-b border-white/[.04] text-[13px]">{s.genre}</td>
                        <td className="px-4 py-3 border-b border-white/[.04] text-[13px]">{fmtDur(s.dur)}</td>
                        <td className="px-4 py-3 border-b border-white/[.04] text-[13px]">{fmt(s.streams)}</td>
                        <td className="px-4 py-3 border-b border-white/[.04] text-[13px]">{fmt(s.likes)}</td>
                        <td className="px-4 py-3 border-b border-white/[.04]">
                          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${STATUS_MAP[s.status] || ""}`}>{s.status.replace(/_/g, " ")}</span>
                        </td>
                        <td className="px-4 py-3 border-b border-white/[.04] text-[13px]">{s.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============ UPLOAD ============ */}
          {page === "upload" && (
            <>
              <div className="flex items-center gap-0 mb-8">
                {["Upload Audio", "Metadata", "Artwork", "Preview", "Submit"].map((label, i) => {
                  const s = i + 1;
                  const cls = s < uploadStep ? "done" : s === uploadStep ? "active" : "";
                  return (
                    <div key={label} className={`flex items-center gap-2.5 flex-1 relative ${cls}`}>
                      <div className={`w-9 h-9 rounded-full grid place-items-center font-bold text-[13px] border-2 shrink-0 transition-all ${cls === "done" ? "border-[#34d399] bg-[rgba(52,211,153,.15)] text-[#34d399]" : cls === "active" ? "border-[var(--color-brand)] bg-[rgba(168,85,247,.15)] text-[var(--color-brand)]" : "border-[rgba(255,255,255,.09)] text-[#9d9dab]"}`}>
                        {cls === "done" ? "✓" : s}
                      </div>
                      <div className={`text-xs font-semibold whitespace-nowrap max-[768px]:hidden ${cls === "active" ? "text-[var(--color-text)]" : cls === "done" ? "text-[#34d399]" : "text-[#9d9dab]"}`}>{label}</div>
                      {s < 5 && <div className={`absolute left-[calc(100%+0px)] top-1/2 w-full h-[2px] -z-10 ${cls === "done" ? "bg-[#34d399]" : "bg-[rgba(255,255,255,.09)]"}`} />}
                    </div>
                  );
                })}
              </div>

              <div className="max-w-[640px]">
                {uploadStep === 1 && (
                  <div className="border-2 border-dashed border-[rgba(255,255,255,.09)] rounded-[14px] p-12 text-center cursor-pointer hover:border-[rgba(168,85,247,.5)] hover:bg-[rgba(168,85,247,.04)] transition-all">
                    <UploadIcon className="w-12 h-12 text-[#9d9dab] mx-auto mb-3.5" />
                    <h3 className="text-base mb-1.5">Drop your audio file here</h3>
                    <p className="text-[#9d9dab] text-[13px]">or click to browse · MP3, WAV, FLAC, AAC up to 50MB</p>
                  </div>
                )}
                {uploadStep === 2 && (
                  <div className="grid gap-4">
                    <div><label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Song Title *</label><input placeholder="Enter song title" className="w-full bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-2.5 text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all" /></div>
                    <div className="grid grid-cols-2 gap-3.5 max-[640px]:grid-cols-1">
                      <div><label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Featured Artists</label><input placeholder="Optional" className="w-full bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-2.5 text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all" /></div>
                      <div><label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Album / EP</label><input placeholder="Optional" className="w-full bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-2.5 text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3.5 max-[640px]:grid-cols-1">
                      <div><label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Genre *</label><select className="w-full bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-2.5 text-[var(--color-text)] text-[13.5px] outline-none"><option>Pop</option><option>R&B</option><option>Hip Hop</option></select></div>
                      <div><label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Release Date</label><input type="date" className="w-full bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-2.5 text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all" /></div>
                    </div>
                    <div><label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Description</label><textarea placeholder="About this track..." className="w-full bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-2.5 text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all resize-y min-h-[80px]" /></div>
                  </div>
                )}
                {uploadStep === 3 && (
                  <div className="border-2 border-dashed border-[rgba(255,255,255,.09)] rounded-[14px] p-12 text-center cursor-pointer hover:border-[rgba(168,85,247,.5)] hover:bg-[rgba(168,85,247,.04)] transition-all">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#9d9dab] mx-auto mb-3.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                    <h3 className="text-base mb-1.5">Upload Cover Artwork</h3>
                    <p className="text-[#9d9dab] text-[13px]">Recommended 3000x3000px · JPG, PNG up to 10MB</p>
                  </div>
                )}
                {uploadStep === 4 && (
                  <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] p-[22px]">
                    <h4 className="mb-3">Release Preview</h4>
                    {[["Title", "Untitled"], ["Artist", "Kira Solace"], ["Genre", "Pop"], ["Status", "Pending Review"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between py-2 border-b border-white/[.04] text-[13px] last:border-b-0"><span className="text-[#9d9dab]">{k}</span><strong>{v}</strong></div>
                    ))}
                  </div>
                )}
                {uploadStep === 5 && (
                  <div className="text-center py-[60px] text-[#9d9dab]">
                    <CheckIcon className="w-12 h-12 mx-auto mb-3.5 opacity-40 text-[#34d399]" />
                    <h3 className="text-[var(--color-text)] text-lg mb-1.5">Ready to Submit</h3>
                    <p className="text-sm max-w-[400px] mx-auto mb-5">Your release will be submitted for administrative review. You&apos;ll be notified once it&apos;s approved and published.</p>
                    <button onClick={() => { showToast("Release submitted for review!"); setUploadStep(1); }} className="inline-flex items-center gap-2 font-bold text-[15px] px-8 py-3 rounded-[10px] gradient-bg text-white shadow-[0_8px_28px_-8px_rgba(236,72,153,.5)] hover:-translate-y-0.5 transition-all">Submit for Review</button>
                  </div>
                )}

                <div className="flex gap-2.5 justify-end mt-5">
                  {uploadStep > 1 && uploadStep < 5 && (
                    <button onClick={() => setUploadStep(uploadStep - 1)} className="inline-flex items-center gap-2 font-semibold text-xs px-4 py-2 rounded-[10px] bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] text-[var(--color-text)] transition-all hover:bg-[rgba(255,255,255,.07)]">← Back</button>
                  )}
                  {uploadStep < 5 && (
                    <button onClick={() => setUploadStep(uploadStep + 1)} className="inline-flex items-center gap-2 font-semibold text-xs px-4 py-2 rounded-[10px] gradient-bg text-white shadow-[0_6px_20px_-6px_rgba(236,72,153,.5)] hover:-translate-y-0.5 transition-all">Continue →</button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ============ COMMENTS ============ */}
          {page === "comments" && (
            <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] p-[22px]">
              <h3 className="text-[15px] font-bold mb-4">Recent Comments</h3>
              <div className="grid gap-2">
                {COMMENTS.map((c, i) => (
                  <div key={i} className="p-3.5 rounded-[10px] border border-[rgba(255,255,255,.09)] bg-[rgba(255,255,255,.04)]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-7 h-7 rounded-full gradient-bg grid place-items-center font-bold text-[10px] text-white shrink-0">{c.user[0]}</span>
                      <strong className="text-[13px]">{c.user}</strong>
                      <span className="text-[11px] text-[#9d9dab]">on {c.song}</span>
                    </div>
                    <p className="text-[13px] text-[#9d9dab] leading-relaxed">{c.text}</p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-[#9d9dab]">
                      <span>{c.time}</span>
                      <span>♥ {c.likes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============ ANALYTICS / EARNINGS / SETTINGS ============ */}
          {(page === "analytics" || page === "earnings" || page === "settings") && (
            <div className="text-center py-[60px] text-[#9d9dab]">
              <BarChartIcon className="w-12 h-12 mx-auto mb-3.5 opacity-40" />
              <h3 className="text-[var(--color-text)] text-lg mb-1.5">{PAGES.find((p) => p.id === page)?.label}</h3>
              <p className="text-sm">This section is coming soon. Stay tuned for updates!</p>
            </div>
          )}
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-2.5 bg-[rgba(20,20,32,.95)] border border-[rgba(255,255,255,.09)] rounded-[14px] px-[18px] py-3 text-[13px] font-medium shadow-[0_20px_60px_-12px_rgba(0,0,0,.8)] backdrop-blur-[16px] max-w-[380px] animate-[fadeIn_0.4s_ease]">
          <CheckIcon className="w-[18px] h-[18px] text-[#34d399] shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
