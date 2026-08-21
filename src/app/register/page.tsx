"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandMark, CheckCircleIcon } from "@/components/Icons";

const GENRES = ["Pop", "R&B", "Hip Hop", "Afrobeat", "Electronic", "Rock", "Indie", "Jazz", "Soul", "Latin", "Country", "Classical", "Reggae", "Metal", "Folk", "Blues"];
const COUNTRIES = ["Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil", "Canada", "Chile", "China", "Colombia", "Czech Republic", "Denmark", "Egypt", "Ethiopia", "Finland", "France", "Germany", "Ghana", "Greece", "Hungary", "India", "Indonesia", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Kenya", "Malaysia", "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia", "South Africa", "South Korea", "Spain", "Sweden", "Switzerland", "Tanzania", "Thailand", "Turkey", "UAE", "Uganda", "Ukraine", "United Kingdom", "United States", "Vietnam", "Zimbabwe"];

const STEPS = ["Artist Info", "Contact", "Online Presence", "Verify", "Submit"];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    stageName: "", legalName: "", email: "", phone: "", country: "", location: "",
    type: "Solo", genre: "Pop", bio: "",
    instagram: "", twitter: "", facebook: "", spotify: "", youtube: "",
    label: "", manager: "", sample: "", verificationInfo: "", terms: false,
  });

  const update = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  const validate = () => {
    if (step === 1 && !form.stageName) { alert("Please enter your stage name."); return false; }
    if (step === 1 && !form.legalName) { alert("Please enter your legal name."); return false; }
    if (step === 2 && !form.email) { alert("Please enter your email."); return false; }
    return true;
  };

  const next = () => { if (validate() && step < 5) { setStep(step + 1); window.scrollTo(0, 0); } };
  const prev = () => { if (step > 1) { setStep(step - 1); window.scrollTo(0, 0); } };
  const submit = () => {
    if (!form.terms) { alert("Please agree to the terms and conditions."); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col">
        <div className="fixed inset-0 -z-10 pointer-events-none bg-[radial-gradient(50%_40%_at_50%_0%,rgba(168,85,247,.1),transparent_60%),var(--color-bg)]" />
        <header className="flex items-center justify-between px-[5%] py-4 border-b border-[rgba(255,255,255,.09)]">
          <Link href="/" className="flex items-center gap-2.5 font-display font-bold text-lg">
            <span className="grid h-8 w-8 place-items-center rounded-[9px] gradient-bg"><BrandMark className="w-4 h-4 text-white" /></span>
            <span>OneBEAT<small className="block text-[8px] font-body font-semibold tracking-[.3em] text-[#9d9dab] -mt-0.5">MUSIC</small></span>
          </Link>
          <div className="flex items-center gap-3.5">
            <Link href="/player" className="text-[13.5px] font-medium text-[#9d9dab] hover:text-[var(--color-text)] transition-colors">Public Platform</Link>
            <Link href="/admin" className="text-[13.5px] font-medium text-[#9d9dab] hover:text-[var(--color-text)] transition-colors" style={{ color: "var(--color-brand)" }}>Admin</Link>
            <Link href="/artist" className="text-[13.5px] font-medium text-[#9d9dab] hover:text-[var(--color-text)] transition-colors" style={{ color: "var(--color-green)" }}>Artist Portal</Link>
          </div>
        </header>
        <div className="flex-1 flex justify-center px-[5%] py-[clamp(24px,5vw,60px)]">
          <div className="w-[min(520px,100%)] text-center">
            <div className="w-20 h-20 rounded-full bg-[rgba(52,211,153,.12)] border-2 border-[rgba(52,211,153,.3)] grid place-items-center mx-auto mb-6">
              <CheckCircleIcon className="w-9 h-9 text-[#34d399]" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-3">Application Submitted!</h1>
            <p className="text-[#9d9dab] text-[15px] leading-relaxed mb-2">Your artist application has been submitted and is awaiting administrative review.</p>
            <p className="text-[#9d9dab] text-[13px] mb-8">We&apos;ll review your application and notify you via email once a decision has been made.</p>
            <div className="text-left mb-8">
              {[
                { label: "Application Submitted", desc: "Your application is now in the review queue", current: true },
                { label: "Under Review", desc: "Our team will review your application", current: false },
                { label: "Decision", desc: "You&apos;ll receive an approval, rejection, or request for changes", current: false },
                { label: "Artist Dashboard", desc: "Once approved, you&apos;ll get access to your artist portal", current: false },
              ].map((item) => (
                <div key={item.label} className={`flex gap-3.5 py-3 border-b border-white/[.04] ${item.current ? "" : ""}`}>
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${item.current ? "bg-[var(--color-brand)] shadow-[0_0_12px_rgba(168,85,247,.5)]" : "bg-[rgba(255,255,255,.09)]"}`} />
                  <div className="text-[13px]"><strong className="block mb-0.5">{item.label}</strong><span className="text-[#9d9dab] text-xs">{item.desc}</span></div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 justify-center">
              <Link href="/" className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-[10px] bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] text-[var(--color-text)] transition-all hover:bg-[rgba(255,255,255,.07)]">Back to Home</Link>
              <Link href="/player" className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-[10px] gradient-bg text-white shadow-[0_8px_28px_-8px_rgba(236,72,153,.5)] hover:-translate-y-0.5 transition-all">Explore Music</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col">
      <div className="fixed inset-0 -z-10 pointer-events-none bg-[radial-gradient(50%_40%_at_50%_0%,rgba(168,85,247,.1),transparent_60%),var(--color-bg)]" />

      <header className="flex items-center justify-between px-[5%] py-4 border-b border-[rgba(255,255,255,.09)]">
        <Link href="/" className="flex items-center gap-2.5 font-display font-bold text-lg">
          <span className="grid h-8 w-8 place-items-center rounded-[9px] gradient-bg"><BrandMark className="w-4 h-4 text-white" /></span>
          <span>OneBEAT<small className="block text-[8px] font-body font-semibold tracking-[.3em] text-[#9d9dab] -mt-0.5">MUSIC</small></span>
        </Link>
        <div className="flex items-center gap-3.5">
          <Link href="/player" className="text-[13.5px] font-medium text-[#9d9dab] hover:text-[var(--color-text)] transition-colors">Public Platform</Link>
          <Link href="/admin" className="text-[13.5px] font-medium hover:text-[var(--color-text)] transition-colors" style={{ color: "var(--color-brand)" }}>Admin</Link>
          <Link href="/artist" className="text-[13.5px] font-medium hover:text-[var(--color-text)] transition-colors" style={{ color: "var(--color-green)" }}>Artist Portal</Link>
        </div>
      </header>

      <div className="flex-1 flex justify-center px-[5%] py-[clamp(24px,5vw,60px)] max-sm:px-[4%]">
        <div className="w-[min(720px,100%)]">
          <h1 className="font-display text-[clamp(28px,4vw,38px)] font-bold tracking-tight mb-2">Register as an Artist</h1>
          <p className="text-[#9d9dab] text-base mb-8">Join OneBEAT and share your music with the world.</p>

          {/* Stepper */}
          <div className="flex items-center gap-0 mb-9 relative">
            {STEPS.map((label, i) => {
              const s = i + 1;
              const cls = s < step ? "done" : s === step ? "active" : "";
              return (
                <div key={label} className={`flex items-center gap-2 flex-1 relative ${cls}`}>
                  <div className={`w-8 h-8 rounded-full grid place-items-center font-bold text-xs border-2 shrink-0 transition-all ${
                    cls === "done" ? "border-[#34d399] bg-[rgba(52,211,153,.15)] text-[#34d399]" :
                    cls === "active" ? "border-[var(--color-brand)] bg-[rgba(168,85,247,.15)] text-[var(--color-brand)]" :
                    "border-[rgba(255,255,255,.09)] text-[#9d9dab]"
                  }`}>
                    {cls === "done" ? "✓" : s}
                  </div>
                  <div className={`text-xs font-semibold whitespace-nowrap max-[640px]:hidden ${cls === "active" ? "text-[var(--color-text)]" : cls === "done" ? "text-[#34d399]" : "text-[#9d9dab]"}`}>{label}</div>
                  {s < 5 && <div className={`absolute left-[calc(100%+0px)] top-1/2 w-full h-[2px] -z-10 ${cls === "done" ? "bg-[#34d399]" : "bg-[rgba(255,255,255,.09)]"}`} />}
                </div>
              );
            })}
          </div>

          {/* Step content */}
          <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] rounded-[14px] p-7 mb-5">
            {step === 1 && (
              <>
                <h3 className="text-base font-bold mb-[18px] flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--color-brand)]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> Artist Information</h3>
                <label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Artist / Stage Name <span className="text-[#f87171]">*</span></label>
                <input value={form.stageName} onChange={(e) => update("stageName", e.target.value)} placeholder="Your stage or artist name" className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] focus:shadow-[0_0_0_3px_rgba(168,85,247,.1)] transition-all mb-4" />
                <label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Legal Name <span className="text-[#f87171]">*</span></label>
                <input value={form.legalName} onChange={(e) => update("legalName", e.target.value)} placeholder="Your full legal name" className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] focus:shadow-[0_0_0_3px_rgba(168,85,247,.1)] transition-all mb-4" />
                <div className="grid grid-cols-3 gap-4 max-[640px]:grid-cols-1 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Artist Type <span className="text-[#f87171]">*</span></label>
                    <select value={form.type} onChange={(e) => update("type", e.target.value)} className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none"><option>Solo</option><option>Group</option><option>Band</option></select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Primary Genre <span className="text-[#f87171]">*</span></label>
                    <select value={form.genre} onChange={(e) => update("genre", e.target.value)} className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none">{GENRES.map((g) => <option key={g}>{g}</option>)}</select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Country <span className="text-[#f87171]">*</span></label>
                    <select value={form.country} onChange={(e) => update("country", e.target.value)} className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none"><option value="">Select...</option>{COUNTRIES.map((c) => <option key={c}>{c}</option>)}</select>
                  </div>
                </div>
                <label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Location / City</label>
                <input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="City, State/Province" className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all mb-4" />
                <label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Biography <span className="text-[#f87171]">*</span></label>
                <textarea value={form.bio} onChange={(e) => update("bio", e.target.value)} placeholder="Tell us about yourself, your music, your journey..." className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all resize-y min-h-[90px]" />
                <p className="text-[11px] text-[#9d9dab] mt-1">Max 2000 characters. This will appear on your public profile.</p>
              </>
            )}
            {step === 2 && (
              <>
                <h3 className="text-base font-bold mb-[18px] flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--color-brand)]"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> Contact Information</h3>
                <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Email Address <span className="text-[#f87171]">*</span></label>
                    <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Phone Number</label>
                    <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1-555-000-0000" className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
                  <div>
                    <label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Management / Manager</label>
                    <input value={form.manager} onChange={(e) => update("manager", e.target.value)} placeholder="Manager name or N/A" className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Record Label</label>
                    <input value={form.label} onChange={(e) => update("label", e.target.value)} placeholder="Label name or Independent" className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all" />
                  </div>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h3 className="text-base font-bold mb-[18px] flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--color-brand)]"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg> Online Presence</h3>
                <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1 mb-4">
                  <div><label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Instagram</label><input value={form.instagram} onChange={(e) => update("instagram", e.target.value)} placeholder="@username" className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all" /></div>
                  <div><label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Twitter / X</label><input value={form.twitter} onChange={(e) => update("twitter", e.target.value)} placeholder="@username" className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1 mb-4">
                  <div><label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Facebook</label><input value={form.facebook} onChange={(e) => update("facebook", e.target.value)} placeholder="Page URL or username" className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all" /></div>
                  <div><label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Spotify</label><input value={form.spotify} onChange={(e) => update("spotify", e.target.value)} placeholder="Artist name" className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all" /></div>
                </div>
                <label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">YouTube</label>
                <input value={form.youtube} onChange={(e) => update("youtube", e.target.value)} placeholder="Channel URL or name" className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all mb-4" />
                <label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Music Sample / Demo</label>
                <input value={form.sample} onChange={(e) => update("sample", e.target.value)} placeholder="Link to your music (SoundCloud, YouTube, etc.)" className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all mb-4" />
                <label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Profile Image</label>
                <div className="border-2 border-dashed border-[rgba(255,255,255,.09)] rounded-[14px] p-8 text-center cursor-pointer hover:border-[rgba(168,85,247,.5)] hover:bg-[rgba(168,85,247,.04)] transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-[#9d9dab] mx-auto mb-2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                  <h4 className="text-sm mb-1">Upload profile photo</h4>
                  <p className="text-[#9d9dab] text-xs">JPG or PNG, min 800x800px</p>
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <h3 className="text-base font-bold mb-[18px] flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--color-brand)]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> Verification & Additional Info</h3>
                <label className="block text-xs font-semibold text-[#9d9dab] mb-1.5">Verification Information</label>
                <textarea value={form.verificationInfo} onChange={(e) => update("verificationInfo", e.target.value)} placeholder="Please provide any verification information: existing releases, press coverage, previous performances, music industry references, etc." className="w-full bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.09)] rounded-[10px] px-3.5 py-[11px] text-[var(--color-text)] text-[13.5px] outline-none focus:border-[rgba(168,85,247,.5)] transition-all resize-y min-h-[90px] mb-4" />
                <p className="text-[11px] text-[#9d9dab] mb-4">Helps us verify your identity as a professional artist.</p>
                <div className="flex items-start gap-2.5 py-3">
                  <input type="checkbox" checked={form.terms} onChange={(e) => update("terms", e.target.checked)} className="w-[18px] h-[18px] accent-[var(--color-brand)] shrink-0 mt-0.5" />
                  <label className="text-[13px] text-[#9d9dab] leading-relaxed">I agree to the <a href="#" className="text-[var(--color-brand)] underline">Terms &amp; Conditions</a>, <a href="#" className="text-[var(--color-brand)] underline">Privacy Policy</a>, and <a href="#" className="text-[var(--color-brand)] underline">Artist Agreement</a>. I confirm that all information provided is accurate and that I have the rights to distribute my music through OneBEAT.</label>
                </div>
              </>
            )}
            {step === 5 && (
              <>
                <h3 className="text-base font-bold mb-[18px] flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--color-brand)]"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> Review Your Application</h3>
                <div className="grid gap-2">
                  {[["Stage Name", form.stageName], ["Legal Name", form.legalName || "—"], ["Type", form.type], ["Genre", form.genre], ["Country", form.country || "—"], ["Location", form.location || "—"], ["Email", form.email || "—"], ["Phone", form.phone || "—"], ["Bio", form.bio ? form.bio.substring(0, 150) + (form.bio.length > 150 ? "..." : "") : "—"], ["Label", form.label || "Independent"], ["Manager", form.manager || "—"]].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2 border-b border-white/[.04] text-[13px]">
                      <span className="text-[#9d9dab]">{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3.5 mt-6">
            {step > 1 ? (
              <button onClick={prev} className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-[10px] bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.09)] text-[var(--color-text)] transition-all hover:bg-[rgba(255,255,255,.07)]">← Previous</button>
            ) : <div />}
            {step < 5 ? (
              <button onClick={next} className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-[10px] gradient-bg text-white shadow-[0_8px_28px_-8px_rgba(236,72,153,.5)] hover:-translate-y-0.5 transition-all">Continue →</button>
            ) : (
              <button onClick={submit} className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-[10px] gradient-bg text-white shadow-[0_8px_28px_-8px_rgba(236,72,153,.5)] hover:-translate-y-0.5 transition-all">Submit Application</button>
            )}
          </div>
        </div>
      </div>

      <div className="text-center py-5 text-xs text-white/30 border-t border-[rgba(255,255,255,.09)] mt-auto">© 2025 OneBEAT Music · Artist Registration</div>
    </div>
  );
}
