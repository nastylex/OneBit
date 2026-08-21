import Link from "next/link";
import { BrandMark } from "./Icons";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Artists", href: "/#artists" },
    { label: "Trending", href: "/#trending" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Resources: [
    { label: "Help Center", href: "#" },
    { label: "Developer API", href: "#" },
    { label: "Community", href: "#" },
    { label: "Guidelines", href: "#" },
  ],
  Legal: [
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Cookies", href: "#" },
    { label: "DMCA", href: "#" },
  ],
};

const socialIcons = [
  { label: "Twitter", path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
  { label: "Instagram", path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" },
  { label: "YouTube", path: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z M9.75 15.02V8.48l5.75 3.27-5.75 3.27z" },
  { label: "Spotify", path: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-soft pt-16 pb-8">
      <div className="mx-auto max-w-[1180px] px-[4%]">
        <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] gap-9 mb-12 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <div className="footer-brand">
            <Link href="/" className="flex items-center gap-[11px] font-display font-bold text-[21px] tracking-tight">
              <span className="grid h-[36px] w-[36px] place-items-center rounded-[11px] gradient-bg shadow-[0_6px_20px_-6px_rgba(236,72,153,.6)]">
                <BrandMark className="h-[18px] w-[18px] text-white" />
              </span>
              <span>
                OneBEAT
                <small className="block text-[9px] font-body font-semibold tracking-[.28em] text-muted -mt-1">MUSIC</small>
              </span>
            </Link>
            <p className="text-muted text-sm max-w-[260px] mt-4 mb-5">
              Experience music like never before. Every beat finds you on OneBEAT.
            </p>
            <div className="flex gap-2.5">
              {socialIcons.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-[38px] w-[38px] place-items-center rounded-[10px] bg-surface border border-border text-muted hover:text-white hover:border-brand/50 hover:bg-brand/10 hover:-translate-y-0.75 transition-all"
                >
                  <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer-col">
              <h4 className="text-xs font-bold tracking-[.1em] uppercase text-text font-display mb-[18px]">{title}</h4>
              <ul className="list-none flex flex-col gap-[11px]">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted text-sm hover:text-text transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-[26px] flex justify-between flex-wrap gap-3 items-center">
          <p className="text-muted text-[13px]">© 2025 OneBEAT Music. All rights reserved.</p>
          <p className="creators text-[13px] text-muted">
            Created by <strong className="text-text font-semibold">AirSPACEX</strong> × <strong className="text-text font-semibold">Rych BioTech</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
