import { ModeToggle } from '@/components/theme-selector';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="sticky z-10 top-4 w-full h-18 rounded-full bg-neutral-50/80 dark:bg-black/80 backdrop-blur-md flex items-center justify-center">
      <div className="w-full flex items-center justify-center sm:justify-between mx-10">
        <h1 className="font-bold text-2xl tracking-[-1.2px] sm:w-30">HELION</h1>
        <div className="hidden sm:flex flex-row gap-4">
          <Button variant={'ghost'} className="text-primary/50">
            Features
          </Button>
          <Button variant={'ghost'} className="text-primary/50">
            Technology
          </Button>
          <Button variant={'ghost'} className="text-primary/50">
            About Us
          </Button>
        </div>
        <div className="w-30 sm:flex items-center gap-2 justify-end hidden">
          <ModeToggle />
          <Link href={'/login/'}>
            <Button
              size={'lg'}
              className="bg-helion-green font-semibold text-black px-4 hover:bg-helion-green/50 dark:hover:bg-helion-green/80"
            >
              Log In <LogIn />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
