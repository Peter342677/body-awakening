"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/nav";
import Button from "@/components/Button";
import MobileMenu from "@/components/MobileMenu";

export default function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Close the mobile overlay whenever the route changes underneath it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  const dark = solid || mobileOpen;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-[9997] transition-colors duration-500",
          dark
            ? "bg-[color:var(--cream)]/90 backdrop-blur border-b border-[color:var(--line)]"
            : "bg-transparent"
        )}
      >
        {!dark && (
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(20,14,26,0.55) 0%, rgba(20,14,26,0.0) 100%)",
            }}
            aria-hidden="true"
          />
        )}
        <div className="container-brand flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/brand/mark.svg"
              alt=""
              width={34}
              height={34}
              priority
            />
            <span
              className={clsx(
                "font-display italic text-xl tracking-tight",
                dark ? "text-ink" : "text-[color:var(--cream-on-night)]"
              )}
            >
              Body Awakening
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <div
                  key={item.href}
                  className="relative shrink-0"
                  onMouseEnter={() => item.children && setServicesOpen(true)}
                  onMouseLeave={() => item.children && setServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={clsx(
                      "inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300",
                      dark
                        ? active
                          ? "bg-[color:var(--sand)] text-ink"
                          : "text-ink hover:bg-[color:var(--sand)]"
                        : active
                        ? "bg-[color:var(--cream-on-night)]/15 text-[color:var(--cream-on-night)]"
                        : "text-[color:var(--cream-on-night)] hover:bg-[color:var(--cream-on-night)]/10"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div
                      className={clsx(
                        "absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-300",
                        servicesOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      )}
                    >
                      <div className="min-w-[200px] rounded-[20px] bg-[color:var(--cream)] shadow-[0_24px_60px_-24px_rgba(126,99,166,0.35)] p-3 border border-[color:var(--line)]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 rounded-2xl text-sm text-ink hover:bg-[color:var(--sand)] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                        <Link
                          href="/book"
                          className="mt-1 block px-4 py-3 rounded-2xl text-sm font-medium text-cream text-center"
                          style={{ backgroundImage: "var(--grad-brand)" }}
                        >
                          Book a Session
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="hidden xl:block shrink-0">
            <Button href="/book" className="!py-3.5 !px-6 text-xs font-semibold">
              Book a Session
            </Button>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className={clsx(
              "xl:hidden p-2",
              dark ? "text-ink" : "text-[color:var(--cream-on-night)]"
            )}
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
