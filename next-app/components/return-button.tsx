import Link from 'next/link';
import { Button } from './ui/button';
import { ChevronLeft } from 'lucide-react';

export default function ReturnButton() {
  return (
    <Button variant={'outline'} asChild>
      <Link href={'/'} className="flex items-center gap-1">
        <ChevronLeft /> <p className="pb-0.5">Return</p>
      </Link>
    </Button>
  );
}
