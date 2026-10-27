"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Pulpit" },
  { href: "/klienci", label: "Klienci" },
  { href: "/faktury", label: "Faktury" },
  { href: "/pieniadze", label: "Przychody i koszty" },
  { href: "/przypomnienia", label: "Przypomnienia" },
  { href: "/ustawienia", label: "Moja firma" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Menu główne">
      <ul className="flex flex-wrap gap-2">
        {LINKS.map(({ href, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-12 items-center rounded-full px-5 py-2 text-lg font-semibold transition-colors ${
                  active ? "bg-foreground text-white" : "text-foreground hover:bg-primary-soft"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
