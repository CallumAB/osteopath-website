"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services & pricing" },
  { href: "/about", label: "Meet your osteopath" },
  { href: "/contact", label: "Contact" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrandMark() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
    >
      <Image
        src="/logo.png"
        alt=""
        width={464}
        height={380}
        preload
        className="h-12 w-auto sm:h-14"
      />
      <span className="flex flex-col leading-none">
        <span className="flex items-baseline gap-1.5 font-semibold tracking-tight">
          <span className="text-xl text-brand-orange sm:text-2xl">MMM</span>
          <span className="text-lg text-brand-charcoal sm:text-xl">
            OSTEOPATHY
          </span>
        </span>
        <span className="mt-1 text-[9px] font-medium tracking-[0.18em] text-brand-muted uppercase sm:text-[10px]">
          Structural Health & Wellness
        </span>
      </span>
      <span className="sr-only">MMM Osteopathy home</span>
    </Link>
  );
}

function BookButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/booking"
      onClick={onClick}
      className={className}
    >
      Book appointment
      <ArrowIcon className="h-4 w-4" />
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const drawerId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-900/5 bg-brand-cream text-brand-charcoal">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <BrandMark />

        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = isActivePath(pathname, link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative pb-1 text-sm font-medium transition-colors ${
                      active
                        ? "text-brand-charcoal"
                        : "text-stone-600 hover:text-brand-charcoal"
                    }`}
                  >
                    {link.label}
                    {active ? (
                      <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-brand-orange" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <BookButton className="inline-flex items-center gap-2 rounded-md bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d45229] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange" />
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-brand-charcoal lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
          aria-expanded={open}
          aria-controls={drawerId}
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6"
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      <div
        className={`lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        inert={!open}
      >
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setOpen(false)}
          />
          <div
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={`fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col bg-brand-charcoal text-stone-100 shadow-2xl transition-transform duration-200 ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <p className="text-sm font-semibold tracking-wide text-white">
                Menu
              </p>
              <button
                type="button"
                tabIndex={open ? 0 : -1}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-stone-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <ul className="flex flex-1 flex-col gap-1 px-3 py-2">
              {NAV_LINKS.map((link) => {
                const active = isActivePath(pathname, link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-md px-4 py-3 text-base font-medium ${
                        active
                          ? "bg-white/10 text-white"
                          : "text-stone-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="p-5">
              <BookButton
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-orange px-5 py-3 text-sm font-semibold text-white hover:bg-[#d45229]"
              />
            </div>
          </div>
      </div>
    </header>
  );
}
