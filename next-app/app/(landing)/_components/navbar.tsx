'use client';

import { useState, useEffect } from 'react';
import { ModeToggle } from '@/components/theme-selector';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { MobileMenu } from './mobile-menu';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        'sticky z-50 top-4 w-full h-18 rounded-full bg-neutral-50/80 dark:bg-black/80 backdrop-blur-md flex items-center justify-center transition-transform duration-300 ease-in-out',

        isVisible ? 'translate-y-0' : 'translate-y-[-150%]',
      )}
    >
      <div className="w-full flex items-center justify-center sm:justify-between mx-10">
        <div className="w-full sm:hidden" />
        <h1 className="font-bold text-2xl tracking-[-1.2px] sm:w-30">HELION</h1>

        <div className="hidden sm:flex flex-row gap-4">
          <Button
            variant={'ghost'}
            className="text-primary/50 hover:text-primary"
          >
            Features
          </Button>
          <Button
            variant={'ghost'}
            className="text-primary/50 hover:text-primary"
          >
            Technology
          </Button>
          <Button
            variant={'ghost'}
            className="text-primary/50 hover:text-primary"
          >
            About Us
          </Button>
        </div>

        <div className="w-30 sm:flex items-center gap-2 justify-end hidden">
          <ModeToggle />
          <Link href={'/login/'}>
            <Button
              size={'lg'}
              className="bg-helion-green font-semibold text-black px-4 hover:bg-helion-green/50 dark:hover:bg-helion-green/80 transition-colors"
            >
              Log In <LogIn className="ml-2 size-4" />
            </Button>
          </Link>
        </div>

        {/* mobile menu */}
        <div className="w-full sm:hidden flex justify-end">
          <MobileMenu />
        </div>
      </div>
    </div>
  );
}
