"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/src/data/profile";
import { ThemeToggle } from "@/src/components/ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/80 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8"
        aria-label="Primary"
      >
        <a href="#top" className="text-sm font-medium tracking-wide text-ink">
          {profile.navInitials}
        </a>
        <ul className="hidden items-center gap-4 text-sm text-mute sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-sm transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
          type="button"
          className="rounded-md p-2 text-ink sm:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
        </div>
      </nav>
      {open ? (
        <ul
          id="mobile-nav"
          className="border-t border-line px-5 py-3 sm:hidden"
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block py-2 text-sm text-mute hover:text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
