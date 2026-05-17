import { Separator } from '@/components/ui/separator';
import Hero from './_components/hero';
import Navbar from './_components/navbar';
import CoreMechanism from './_components/core-mechanism';
import Comparison from './_components/comparison';
import DashboardCallout from './_components/dashboard-callout';
import HardwareComponents from './_components/hardware-components';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-7xl px-6 flex-col items-center min-h-500 pb-24">
        <Navbar />
        <Hero />
        <Separator className="my-14" />
        <CoreMechanism />
        <Separator className="my-14" />
        <Comparison />
        <Separator className="my-14" />
        <DashboardCallout />
        <Separator className="my-14" />
        <HardwareComponents />
      </main>
    </div>
  );
}
