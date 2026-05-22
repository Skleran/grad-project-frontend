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

export default function Page() {
  return (
    <>
      <DashboardHeader>
        <div className="flex items-center justify-between w-full pr-4">
          <div className="flex flex-col">
            <h2 className="text-sm font-bold tracking-wider text-white uppercase">
              Prototype
            </h2>
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
              Model preview
            </span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-widest text-neutral-400 hover:text-white uppercase transition-colors"
          >
            GitHub
          </a>
        </div>
      </DashboardHeader>

      <div className="flex flex-1 flex-col gap-6 p-6 pt-0 bg-neutral-950/20">
        {/* Top Section: Prototype Image and Axis Orientation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Solar Panel Model Card */}
          <Card className="overflow-hidden bg-[#0a0a0a] dark:bg-[#050505] border border-neutral-800 dark:border-neutral-900 shadow-2xl rounded-xl flex flex-col justify-center items-center relative min-h-[340px] group">
            <div className="absolute top-5 left-6 z-10 flex flex-col">
              <span className="text-xs font-semibold text-white tracking-wide">
                Prototype Model
              </span>
              <span className="text-[9px] text-neutral-500 font-grotesk tracking-widest uppercase mt-0.5">
                Interactive Render
              </span>
            </div>

            <div className="relative w-full h-[340px] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-radial from-transparent to-black/80 z-1 pointer-events-none" />
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
