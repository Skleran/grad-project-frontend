import * as React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { DashboardHeader } from '@/components/dashboard-header';
import { AxisOrientation } from './_components/axis-orientation';
import { BatteryStatus } from './_components/battery-status';
import { ProductionStats } from './_components/production-stats';
import { WeatherForecast } from './_components/weather-forecast';
import { SystemLogsCard } from './_components/system-logs-card';
import { SystemControls } from './_components/system-controls';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <DashboardHeader>
        <div className="flex items-center justify-between w-full pr-4">
          <div className="flex flex-col">
            <h2 className="text-sm font-bold tracking-wider uppercase">
              Prototype
            </h2>
            <span className="text-[10px] text-muted-foreground">
              Model preview
            </span>
          </div>
          <Button asChild variant="ghost">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-widest"
            >
              GitHub
            </Link>
          </Button>
        </div>
      </DashboardHeader>

      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        {/* Top Section: Prototype Image and Axis Orientation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Solar Panel Model Card */}
          <Card className="overflow-hidden shadow-2xl rounded-xl dark:bg-black/30 flex flex-col justify-center items-center relative min-h-85 group">
            <div className="absolute top-5 left-6 z-10 flex flex-col">
              <span className="text-xs font-semibold tracking-wide">
                Prototype Model
              </span>
              <span className="text-[9px] text-muted-foreground font-grotesk tracking-widest uppercase mt-0.5">
                Interactive Render
              </span>
            </div>

            <div className="relative w-full h-80 flex items-center justify-center overflow-hidden rounded-2xl">
              {/* <div className="absolute inset-0 dark:bg-radial from-transparent to-black/80 z-1 pointer-events-none" /> */}
              <Image
                src="/images/solar-panel.png"
                alt="Solar Panel Prototype 3D Preview"
                fill
                className="object-contain p-6 z-0 opacity-90 group-hover:scale-102 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </Card>

          {/* Axis Gauges */}
          <div className="h-full">
            <AxisOrientation />
          </div>
        </div>

        {/* Bottom Section: Metrics & Weather */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BatteryStatus />
          <ProductionStats />
          <WeatherForecast />
        </div>

        {/* Logs and Controls Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SystemLogsCard />
          </div>
          <div className="lg:col-span-1">
            <SystemControls />
          </div>
        </div>
      </div>
    </>
  );
}
