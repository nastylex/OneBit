"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandMark, MenuIcon, CloseIcon } from "./Icons";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#trending", label: "Trending" },
  { href: "/#artists", label: "Artists" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#feedback", label: "Feedback" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-[rgba(7,7,11,.85)] backdrop-blur-xl border-b border-border transition-all duration-300">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-[4%] h-[72px]">
          <Link href="/" className="flex items-center gap-[11px] font-display font-bold text-[21px] tracking-tight">
            <span className="grid h-[36px] w-[36px] place-items-center rounded-[11px] gradient-bg shadow-[0_6px_20px_-6px_rgba(236,72,153,.6)]">
              <BrandMark className="h-[18px] w-[18px] text-white" />
            </span>
            <span>
              OneBEAT
              <small className="block text-[9px] font-body font-semibold tracking-[.28em] text-muted -mt-1">MUSIC</small>
            </span>
          </Link>

          <nav aria-label="Primary">
            <ul className="hidden md:flex items-center gap-[34px] list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[14.5px] font-medium text-muted hover:text-text transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:rounded after:gradient-bg after:transition-[width] after:duration-300 hover:after:w-full">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-[14px]">
            <Link href="/register" className="hidden md:inline-block text-[14.5px] font-medium text-brand hover:text-text transition-colors">
              Register as Artist
            </Link>
            <Link href="/player" className="hidden md:inline-block text-[14.5px] font-medium text-muted hover:text-text transition-colors">
              Listen
            </Link>
            <Link href="/#cta" className="hidden md:inline-flex items-center justify-center gap-2 px-[26px] py-[13px] text-[15px] font-semibold rounded-full gradient-bg text-white shadow-[0_8px_30px_-8px_rgba(236,72,153,.55)] hover:-translate-y-0.5 transition-all">
              Get the app
            </Link>
            <button
              className="md:hidden p-2 text-text"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden fixed top-[72px] inset-x-0 z-[99] bg-[rgba(7,7,11,.96)] backdrop-blur-xl border-b border-border px-[5%] py-[18px] flex flex-col gap-1 animate-[menuDrop_0.3s_ease]">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="py-3 px-1.5 font-semibold text-[16px] text-muted hover:text-text border-b border-white/5" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/player" className="py-3 px-1.5 font-semibold text-[16px] text-muted hover:text-text border-b border-white/5" onClick={() => setOpen(false)}>
            Listen Now
          </Link>
          <Link href="/register" className="py-3 px-1.5 font-semibold text-[16px] text-brand border-b border-white/5" onClick={() => setOpen(false)}>
            Register as Artist
          </Link>
          <Link href="/admin" className="py-3 px-1.5 font-semibold text-[16px] text-muted border-b border-white/5" onClick={() => setOpen(false)}>
            Admin
          </Link>
          <Link href="/#cta" className="mt-4 flex items-center justify-center rounded-full py-3 gradient-bg text-white font-semibold text-[16px]" onClick={() => setOpen(false)}>
            Get the app
          </Link>
        </div>
      )}
    </>
  );
}
