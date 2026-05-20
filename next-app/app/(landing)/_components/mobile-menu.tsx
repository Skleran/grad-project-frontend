'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ChevronRight, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CustomComputerIcon } from '@/public/computer-icon';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (theme: string) => {
    if (!document.startViewTransition) {
      setTheme(theme);
      return;
    }

    document.startViewTransition(() => {
      setTheme(theme);
    });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Technology', href: '#' },
    { name: 'Specifications', href: '#' },
    { name: 'Telemetry', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <div className="md:hidden flex items-center">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        variant={'link'}
        className="relative flex h-10 w-10 items-center justify-center rounded-full ring ring-muted"
      >
        <div className="relative w-4 h-3.5">
          <span
            className={cn(
              'absolute left-0 top-0.5 h-0.5 w-full bg-foreground transition-all duration-300 ease-out rounded-full',
              isOpen && 'top-1.5 rotate-45 bg-helion-green',
            )}
          />
          <span
            className={cn(
              'absolute left-0 bottom-0.5 h-0.5 w-full bg-foreground transition-all duration-300 ease-out rounded-full',
              isOpen && 'bottom-1.5 -rotate-45 bg-helion-green',
            )}
          />
        </div>
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {mounted &&
        isOpen &&
        createPortal(
          <div className="relative z-5">
            <div
              className="fixed inset-0 bg-background/40 backdrop-blur-sm animate-in fade-in duration-200"
              onClick={() => setIsOpen(false)}
            />

            {/* popover content */}
            <div className="fixed top-24 left-4 right-4 flex flex-col rounded-2xl border border-border/50 bg-background p-5 shadow-2xl animate-in fade-in slide-in-from-top-8 duration-200">
              <div className="flex flex-col gap-3 mb-6">
                <Button
                  className="w-full bg-helion-green text-black hover:bg-helion-green/70 h-11 text-base"
                  asChild
                >
                  <Link href={'/signup/'}>Sign Up</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 text-base"
                  asChild
                >
                  <Link href={'/login/'}>Log In</Link>
                </Button>
              </div>

              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <Button
                    key={link.name}
                    asChild
                    variant="link"
                    className="flex w-full justify-between py-4 h-auto no-underline hover:no-underline"
                  >
                    <Link href={link.href} onClick={() => setIsOpen(false)}>
                      {link.name}
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </Link>
                  </Button>
                ))}
              </nav>

              <div className="flex items-center justify-between pt-6 pb-2 mx-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Theme
                </span>
                <div className="flex items-center gap-1 rounded-full border border-border/50 p-1 bg-muted/20">
                  <button
                    onClick={() => handleThemeChange('system')}
                    className={cn(
                      'p-1.5 rounded-full transition-colors',
                      theme === 'system'
                        ? 'bg-background shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <CustomComputerIcon className="size-4" />
                  </button>
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={cn(
                      'p-1.5 rounded-full transition-colors',
                      theme === 'light'
                        ? 'bg-background shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <Sun className="size-4" />
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={cn(
                      'p-1.5 rounded-full transition-colors',
                      theme === 'dark'
                        ? 'bg-background shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <Moon className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
