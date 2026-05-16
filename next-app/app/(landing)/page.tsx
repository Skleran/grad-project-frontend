import { Separator } from '@/components/ui/separator';
import Hero from './_components/hero';
import Navbar from './_components/navbar';
import CoreMechanism from './_components/core-mechanism';
import Comparison from './_components/comparison';
import DashboardCallout from './_components/dashboard-callout';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full items-center justify-center bg-zinc-50 font-sans dark:bg-[#121314]">
      <main className="flex flex-1 w-full max-w-7xl px-6 flex-col items-center min-h-500 pb-24">
        <Navbar />
        <Hero />
        <Separator className="my-14" />
        <CoreMechanism />
        <Separator className="my-14" />
        <Comparison />
        <Separator className="my-14" />
        <DashboardCallout />
      </main>
    </div>
  );
}
