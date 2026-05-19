'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleToggle = () => {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    document.startViewTransition(() => {
      setTheme(nextTheme);
    });
  };

  if (!mounted)
    return <Button variant="outline" size="icon" className="opacity-0" />;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="animate-in fade-in zoom-in-75 duration-500 ease-out hover:bg-transparent"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] animate-in fade-in zoom-in-75 delay-50 duration-500 ease-out" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] animate-in fade-in zoom-in-75 delay-50 duration-500 ease-out" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

// <Button
//   onClick={() => handleThemeChange('light')}
//   variant="ghost"
//   size="icon"
//   className="hover:bg-secondary/50"
// >
//   <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
//   <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
//   <span className="sr-only">Toggle theme</span>
// </Button>
