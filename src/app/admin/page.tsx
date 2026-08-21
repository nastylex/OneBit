"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BrandMark,
  GridIcon,
  UsersIcon,
  FileIcon,
  MusicIcon,
  FlagIcon,
  ActivityIcon,
  DollarIcon,
  SettingsIcon,
  BellIcon,
  SearchIcon,
  MenuIcon,
  CheckIcon,
  CloseIcon,
} from "@/components/Icons";

const ADMIN_PAGES = [
  { id: "dashboard", label: "Dashboard", icon: <GridIcon className="w-[18px] h-[18px]" /> },
  { id: "artists", label: "Artists", icon: <UsersIcon className="w-[18px] h-[18px]" />, badge: 7 },
  { id: "applications", label: "Applications", icon: <FileIcon className="w-[18px] h-[18px]" />, badge: 3 },
  { id: "music", label: "Music Library", icon: <MusicIcon className="w-[18px] h-[18px]" /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon className="w-[18px] h-[18px]" /> },
];

const ARTISTS = [
  { name: "Kira Solace", initials: "KS", genre: "Pop", followers: "34.8K", streams: "582K", status: "active", color: "linear-gradient(135deg,#a855f7,#ec4899)" },
  { name: "DJ Kavana", initials: "DK", genre: "Afro House", followers: "28.1K", streams: "421K", status: "active", color: "linear-gradient(135deg,#0ea5e9,#16d1a0)" },
  { name: "The Velvet Echo", initials: "VE", genre: "Indie Rock", followers: "18.4K", streams: "298K", status: "active", color: "linear-gradient(135deg,#8b5cf6,#34d399)" },
  { name: "Lena Marr", initials: "LM", genre: "R&B", followers: "14.2K", streams: "185K", status: "active", color: "linear-gradient(135deg,#ec4899,#10b981)" },
  { name: "Aya Blaze", initials: "AB", genre: "Amapiano", followers: "12.1K", streams: "142K", status: "suspended", color: "linear-gradient(135deg,#f59e0b,#2ee57c)" },
  { name: "Zephyr", initials: "ZE", genre: "Electronic", followers: "8.7K", streams: "96K", status: "active", color: "linear-gradient(135deg,#f43f5e,#4ade80)" },
  { name: "Nova Rayne", initials: "NR", genre: "Pop", followers: "6.3K", streams: "67K", status: "pending", color: "linear-gradient(135deg,#22d3ee,#16d1a0)" },
];

const APPLICATIONS = [
  { name: "Marcus Johnson", genre: "Hip Hop", date: "2025-08-18", status: "pending", email: "marcus@email.com" },
  { name: "Sofia Reyes", genre: "Latin", date: "2025-08-17", status: "pending", email: "sofia@email.com" },
  { name: "Aisha Williams", genre: "R&B", date: "2025-08-16", status: "approved", email: "aisha@email.com" },
];

const ACTIVITY = [
  { text: "Kira Solace uploaded a new track", time: "2 hours ago", color: "#34d399" },
  { text: "Sofia Reyes submitted a registration application", time: "5 hours ago", color: "#fbbf24" },
  { text: "DJ Kavana's track was flagged for review", time: "1 day ago", color: "#f87171" },
  { text: "Nova Rayne was approved as an artist", time: "2 days ago", color: "#34d399" },
  { text: "System backup completed successfully", time: "3 days ago", color: "#60a5fa" },
];

const STATUS_MAP: Record<string, string> = {
  active: "bg-[rgba(52,211,153,.12)] text-[#34d399]",
  pending: "bg-[rgba(251,191,36,.12)] text-[#fbbf24]",
  suspended: "bg-[rgba(248,113,113,.12)] text-[#f87171]",
  approved: "bg-[rgba(52,211,153,.12)] text-[#34d399]",
  rejected: "bg-[rgba(248,113,113,.12)] text-[#f87171]",
};

export default function AdminPage() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const monthlyStreams = [120, 180, 240, 310, 380, 420, 490, 560, 620, 710, 780, 850];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const maxS = Math.max(...monthlyStreams);

  return (
    <div className="grid grid-cols-[var(--sidebar-w,260px)_1fr] h-screen overflow-hidden max-[1024px]:grid-cols-1">
      {/* SIDEBAR */}
      <aside className={`row-span-2 flex flex-col bg-bg-soft border-r border-border p-4 gap-1.5 overflow-y-auto max-[1024px]:fixed max-[1024px]:left-0 max-[1024px]:top-0 max-[1024px]:bottom-0 max-[1024px]:z-[60] max-[1024px]:w-[260px] max-[1024px]:transition-transform max-[1024px]:duration-300 ${sidebarOpen ? "max-[1024px]:translate-x-0" : "max-[1024px]:-translate-x-full"}`}>
        <Link href="/" className="flex items-center gap-2.5 p-2 font-display font-bold text-lg tracking-tight mb-2">
          <span className="grid h-8 w-8 place-items-center rounded-[9px] gradient-bg shadow-[0_6px_20px_-6px_rgba(236,72,153,.55)]"><BrandMark className="w-4 h-4 text-white" /></span>
          <span>OneBEAT<small className="block text-[8px] font-body font-semibold tracking-[.3em] text-[#9d9dab] -mt-0.5">ADMIN</small></span>
        </Link>
        <div className="text-[10px] font-bold tracking-[.14em] uppercase text-white/35 px-3 pt-4 pb-1.5">Main</div>
        {ADMIN_PAGES.map((item) => (
          <button key={item.id} onClick={() => { setPage(item.id); setSidebarOpen(false); }} className={`relative flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13.5px] font-semibold border-0 bg-transparent text-left w-full transition-all hover:text-text hover:bg-[rgba(255,255,255,.07)] ${page === item.id ? "text-white bg-[rgba(168,85,247,.18)]" : "text-[#9d9dab]"}`}>
            {item.icon}
            <span className="[&_svg]:opacity-70 [&_.active]:opacity-100">{item.label}</span>
            {item.badge && <span className="ml-auto bg-[#ec4899] text-white text-[10px] font-bold px-[7px] py-[2px] rounded-full min-w-[20px] text-center">{item.badge}</span>}
          </button>
        ))}
        <div className="mt-auto border-t border-[rgba(255,255,255,.09)] pt-3.5 px-2">
          <div className="flex items-center gap-2.5">
            <span className="w-[34px] h-[34px] rounded-full gradient-bg grid place-items-center font-bold text-xs shrink-0">AD</span>
            <div><div className="text-[13px] font-semibold">Admin User</div><div className="text-[11px] text-[#9d9dab]">Super Admin</div></div>
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
          <h1 className="font-display text-[22px] font-bold tracking-tight capitalize">{page}</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9d9dab] pointer-events-none" />
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-full py-2 pl-9 pr-3 text-text text-xs w-[240px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all max-[768px]:w-40" />
            </div>
            <button onClick={() => setNotifOpen(!notifOpen)} className="relative bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[10px] p-2 text-[#9d9dab] hover:text-text transition-all">
              <BellIcon className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ec4899] border-2 border-[var(--color-bg)]" />
            </button>
          </div>
        </div>

        <div className="px-7 pb-10 flex-1">
          {/* ============ DASHBOARD ============ */}
          {page === "dashboard" && (
            <>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mb-7">
                {[
                  { label: "Total Artists", value: "7", color: "var(--color-brand)", icon: <UsersIcon className="w-5 h-5" /> },
                  { label: "Pending Applications", value: "3", color: "#fbbf24", icon: <FileIcon className="w-5 h-5" /> },
                  { label: "Total Streams", value: "1.8M", color: "var(--color-brand-2)", icon: <ActivityIcon className="w-5 h-5" /> },
                  { label: "Active Tracks", value: "42", color: "#34d399", icon: <MusicIcon className="w-5 h-5" /> },
                  { label: "Revenue (MTD)", value: "$12.4K", color: "#34d399", icon: <DollarIcon className="w-5 h-5" /> },
                  { label: "Reports", value: "4", color: "#f87171", icon: <FlagIcon className="w-5 h-5" /> },
                ].map((s) => (
                  <div key={s.label} className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] p-5 transition-all hover:-translate-y-0.5 hover:border-white/16 relative overflow-hidden group">
                    <div className="w-10 h-10 rounded-[10px] grid place-items-center mb-3.5" style={{ background: `${s.color}22`, color: s.color }}>{s.icon}</div>
                    <h3 className="text-[26px] font-bold font-display tracking-tight">{s.value}</h3>
                    <p className="text-xs text-[#9d9dab] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] p-[22px] mb-7">
                <div className="flex items-center justify-between mb-[18px]"><h3 className="text-[15px] font-bold">Streams Overview</h3></div>
                <div className="relative h-[200px]">
                  <div className="flex items-end gap-1 h-full pb-6">
                    {monthlyStreams.map((v, i) => (
                      <div key={i} className="flex-1 rounded-t relative cursor-pointer gradient-bg min-h-1 transition-[height] hover:opacity-85" style={{ height: `${(v / maxS) * 100}%` }}>
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-[#9d9dab] whitespace-nowrap opacity-0 hover:opacity-100">{v}K</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 flex justify-between text-[10px] text-[#9d9dab]">
                    {months.map((m) => <span key={m}>{m}</span>)}
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] p-[22px]">
                <h3 className="text-[15px] font-bold mb-4">Recent Activity</h3>
                <div className="grid gap-0.5">
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 py-3 px-4 rounded-[10px] hover:bg-[rgba(255,255,255,.04)] transition-colors">
                      <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: a.color }} />
                      <div>
                        <div className="text-[13px] leading-relaxed">{a.text}</div>
                        <div className="text-[11px] text-[#9d9dab] mt-0.5">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ============ ARTISTS ============ */}
          {page === "artists" && (
            <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 gap-3 flex-wrap">
                <h3 className="text-[15px] font-bold">All Artists ({ARTISTS.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead><tr>
                    {["Artist", "Genre", "Followers", "Streams", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-[11px] font-bold tracking-[.08em] uppercase text-[#9d9dab] text-left px-4 py-3 border-b border-[rgba(255,255,255,.09)] whitespace-nowrap">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {ARTISTS.map((a) => (
                      <tr key={a.name} className="hover:bg-[rgba(255,255,255,.02)]">
                        <td className="px-4 py-3 border-b border-white/[.04] text-[13px]">
                          <div className="flex items-center">
                            <span className="w-9 h-9 rounded-full grid place-items-center font-bold text-[11px] shrink-0 mr-2.5 text-white" style={{ background: a.color }}>{a.initials}</span>
                            <strong>{a.name}</strong>
                          </div>
                        </td>
                        <td className="px-4 py-3 border-b border-white/[.04] text-[13px]">{a.genre}</td>
                        <td className="px-4 py-3 border-b border-white/[.04] text-[13px]">{a.followers}</td>
                        <td className="px-4 py-3 border-b border-white/[.04] text-[13px]">{a.streams}</td>
                        <td className="px-4 py-3 border-b border-white/[.04]">
                          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${STATUS_MAP[a.status] || "bg-[rgba(255,255,255,.06)] text-[#9d9dab]"}`}>{a.status}</span>
                        </td>
                        <td className="px-4 py-3 border-b border-white/[.04]">
                          <div className="flex gap-1.5 flex-wrap">
                            <button className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[10px] p-1.5 text-[#9d9dab] hover:text-text transition-all" title="View">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                            </button>
                            <button onClick={() => showToast(`${a.name} updated`)} className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[10px] p-1.5 text-[#9d9dab] hover:text-[#f87171] hover:border-[rgba(248,113,113,.4)] transition-all" title="Suspend">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============ APPLICATIONS ============ */}
          {page === "applications" && (
            <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 gap-3 flex-wrap">
                <h3 className="text-[15px] font-bold">Artist Applications ({APPLICATIONS.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead><tr>
                    {["Applicant", "Genre", "Email", "Date", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-[11px] font-bold tracking-[.08em] uppercase text-[#9d9dab] text-left px-4 py-3 border-b border-[rgba(255,255,255,.09)] whitespace-nowrap">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {APPLICATIONS.map((a) => (
                      <tr key={a.name} className="hover:bg-[rgba(255,255,255,.02)]">
                        <td className="px-4 py-3 border-b border-white/[.04] text-[13px]"><strong>{a.name}</strong></td>
                        <td className="px-4 py-3 border-b border-white/[.04] text-[13px]">{a.genre}</td>
                        <td className="px-4 py-3 border-b border-white/[.04] text-[13px]">{a.email}</td>
                        <td className="px-4 py-3 border-b border-white/[.04] text-[13px]">{a.date}</td>
                        <td className="px-4 py-3 border-b border-white/[.04]">
                          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${STATUS_MAP[a.status] || ""}`}>{a.status}</span>
                        </td>
                        <td className="px-4 py-3 border-b border-white/[.04]">
                          <div className="flex gap-1.5">
                            <button onClick={() => { showToast(`${a.name} approved`); }} className="bg-[rgba(52,211,153,.12)] text-[#34d399] border border-[rgba(52,211,153,.25)] rounded-[10px] px-2.5 py-1 text-[11px] font-semibold hover:bg-[rgba(52,211,153,.2)] transition-all">Approve</button>
                            <button onClick={() => { showToast(`${a.name} rejected`); }} className="bg-[rgba(248,113,113,.12)] text-[#f87171] border border-[rgba(248,113,113,.25)] rounded-[10px] px-2.5 py-1 text-[11px] font-semibold hover:bg-[rgba(248,113,113,.2)] transition-all">Reject</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============ MUSIC LIBRARY ============ */}
          {page === "music" && (
            <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] p-5">
              <h3 className="text-[15px] font-bold mb-4">Music Library</h3>
              <div className="text-center py-[60px] text-[#9d9dab]">
                <MusicIcon className="w-12 h-12 mx-auto mb-3.5 opacity-40" />
                <h3 className="text-[var(--color-text)] text-lg mb-1.5">42 tracks in library</h3>
                <p className="text-sm">Browse and manage all uploaded tracks across artists.</p>
              </div>
            </div>
          )}

          {/* ============ SETTINGS ============ */}
          {page === "settings" && (
            <>
              <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] p-[22px] mb-4">
                <h3 className="text-[15px] font-bold mb-4">Platform Settings</h3>
                {[
                  { label: "Require artist verification", desc: "New artists must verify identity before uploading", on: true },
                  { label: "Auto-approve tracks", desc: "Automatically publish tracks from verified artists", on: false },
                  { label: "Email notifications", desc: "Send email alerts for new applications and uploads", on: true },
                  { label: "Maintenance mode", desc: "Temporarily disable public access to the platform", on: false },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-3 border-b border-white/[.04] last:border-b-0">
                    <div>
                      <div className="text-[13.5px] font-medium">{s.label}</div>
                      <div className="text-xs text-[#9d9dab] mt-0.5">{s.desc}</div>
                    </div>
                    <div className={`w-11 h-6 rounded-full cursor-pointer transition-all flex-shrink-0 ${s.on ? "bg-[var(--color-brand)] border-[var(--color-brand)]" : "bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)]"}`}>
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${s.on ? "translate-x-[20px]" : "translate-x-[3px]"}`} style={{ marginTop: "3px" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] p-[22px]">
                <h3 className="text-[15px] font-bold mb-4">Danger Zone</h3>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-[13.5px] font-medium">Reset all data</div>
                    <div className="text-xs text-[#9d9dab] mt-0.5">Permanently delete all platform data</div>
                  </div>
                  <button className="inline-flex items-center gap-2 font-semibold text-xs px-4 py-2 rounded-[10px] bg-[rgba(248,113,113,.12)] text-[#f87171] border border-[rgba(248,113,113,.25)] transition-all hover:bg-[rgba(248,113,113,.2)]">Reset</button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Notification Panel */}
      <div className={`fixed top-0 right-0 w-[380px] h-full z-[90] bg-bg-soft border-l border-border p-5 overflow-y-auto transition-all duration-300 shadow-[-20px_0_60px_-20px_rgba(0,0,0,.6)] ${notifOpen ? "right-0" : "-right-[400px]"}`}>
        <div className="flex items-center justify-between mb-[18px]">
          <h3 className="text-base font-bold">Notifications</h3>
          <button onClick={() => setNotifOpen(false)} className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[10px] p-1.5 text-[#9d9dab] hover:text-text transition-all"><CloseIcon className="w-4 h-4" /></button>
        </div>
        {ACTIVITY.map((a, i) => (
          <div key={i} className={`p-3 rounded-[10px] border border-[rgba(255,255,255,.09)] mb-2 bg-[rgba(255,255,255,.04)] ${i < 2 ? "border-[rgba(168,85,247,.3)] bg-[rgba(168,85,247,.06)]" : ""}`}>
            <h4 className="text-[13px] font-semibold mb-1">{a.text}</h4>
            <div className="text-[11px] text-[#9d9dab] mt-1.5">{a.time}</div>
          </div>
        ))}
      </div>

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
