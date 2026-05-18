import { Button } from '@/components/ui/button';
import { ArrowRight, Settings } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="flex flex-col gap-10 w-full mt-13 sm:mt-30 items-center justify-between">
      <div className="absolute top-0 size-1/2  bg-helion-green/15 rounded-full -translate-y-2/3 blur-3xl sm:blur-[150px]" />

      <div className="hidden">{/* maybe add eyebrow here? */}</div>

      {/* Text */}
      <div className="flex flex-col gap-5 sm:gap-10 mx-5">
        <h2 className="font-bold text-3xl sm:text-7xl text-center">
          <p className="sm:tracking-[-2.88px]">Next-Generation</p>
          <p className="text-helion-green">Energy Intelligence</p>
        </h2>
        <p className="text-sm sm:text-base text-center text-primary/60 max-w-200">
          Dual-axis precision tracking engineered for industrial-scale
          deployment. Maximize yield with AI-driven autonomous positioning and
          structural integrity built for the harshest environments.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-5 w-full px-5 sm:flex-row sm:justify-center sm:pt-2 sm:pb-12">
        <Button
          className="bg-helion-green text-black hover:bg-helion-green/70 w-full sm:w-54 sm:h-14 sm:text-base font-semibold"
          size={'lg'}
        >
          Learn Helion <ArrowRight className="stroke-2.5 size-4.5" />
        </Button>
        <Button
          variant={'outline'}
          size={'lg'}
          className="sm:w-54 sm:h-14 sm:text-base"
        >
          <Settings /> Technical Specs
        </Button>
      </div>
      <div className="h-100 sm:h-150 relative w-full overflow-visible">
        <div className="absolute h-full w-full bg-helion-green/10 blur-2xl rounded-lg" />
        <div className="rounded-lg h-full w-full relative overflow-hidden">
          <Image
            src={'/images/solar-panel.png'}
            fill
            priority
            loading="eager"
            // quality={100}
            alt="Image of solar panel"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
