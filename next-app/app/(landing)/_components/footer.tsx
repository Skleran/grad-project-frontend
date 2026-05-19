import Link from 'next/link';
import { Mail, MapPin, X } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative w-full bg-background border-t border-border/40 overflow-hidden pt-16 pb-8 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 z-5 mb-24 md:mb-32">
        <div className="flex flex-col gap-4 max-w-sm">
          <h2 className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div className="size-3 rounded-full bg-helion-green animate-pulse" />
            Helion
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Helion provides automated dual-axis solar tracking systems for
            utility-scale deployment, optimizing energy yield across all
            geographic latitudes.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-foreground tracking-wide">
            About Us
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li>
              <Link
                href="#"
                className="hover:text-helion-green transition-colors"
              >
                Company Profile
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-helion-green transition-colors"
              >
                Team
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-foreground tracking-wide">
            Technical
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li>
              <Link
                href="#"
                className="hover:text-helion-green transition-colors"
              >
                Data Sheets
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-helion-green transition-colors"
              >
                Installation Guide
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-helion-green transition-colors"
              >
                Command Center Visibility
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-helion-green transition-colors"
              >
                System Components
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-foreground tracking-wide">
            Contact
          </h3>
          <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <Mail className="size-4 stroke-helion-green" />
              <a
                href="mailto:inquiry@helion.energy"
                className="hover:text-foreground transition-colors"
              >
                inquiry@helion.energy
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 stroke-helion-green" />
              <span>Istanbul, Turkiye</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pt-2 border-t border-border/50 z-5">
        <div className="flex items-center gap-5 text-muted-foreground">
          <Link href="#" className="hover:text-helion-green transition-colors">
            <X className="size-5" />
          </Link>
        </div>
        <p className="text-xs text-muted-foreground font-medium">
          © 2026 Helion
        </p>
      </div>

      <div className="absolute bottom-0 left-0 max-w-full w-full flex justify-center overflow-hidden pointer-events-none select-none translate-y-1/4">
        <span className="font-grotesk font-black text-[25vw] sm:text-[21vw] leading-none tracking-tighter text-transparent text-stroke text-shadow-2xs text-shadow-helion-green/15 opacity-20">
          HELION
        </span>
      </div>
    </footer>
  );
}
