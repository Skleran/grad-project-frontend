'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, CloudSun, Cloud, MoonStar, Gauge, SunDim, Thermometer } from 'lucide-react';

export function WeatherForecast() {
  // Static weather data for hourly forecast
  const hourlyData = [
    { hour: '14:00', temp: 29, icon: <Sun className="size-4.5 stroke-helion-green fill-helion-green/10" /> },
    { hour: '15:00', temp: 28, icon: <Sun className="size-4.5 stroke-helion-green fill-helion-green/10" /> },
    { hour: '16:00', temp: 27, icon: <CloudSun className="size-4.5 stroke-neutral-400 fill-neutral-400/10" /> },
    { hour: '17:00', temp: 25, icon: <Cloud className="size-4.5 stroke-neutral-500 fill-neutral-500/10" /> },
    { hour: '18:00', temp: 23, icon: <MoonStar className="size-4.5 stroke-neutral-400 fill-neutral-400/10" /> },
  ];

  return (
    <Card className="flex flex-col bg-neutral-900/40 dark:bg-black/30 backdrop-blur-md border border-neutral-800 dark:border-neutral-900 shadow-xl rounded-xl h-full justify-between overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-800/60 pb-3 px-6 shrink-0">
        <CardTitle className="text-sm font-semibold tracking-wide font-sans text-white">
          Solar Environment
        </CardTitle>
        <span className="text-[9px] font-mono text-helion-green/80 font-bold tracking-wider">
          LOC: 34.05°N, 118.24°W
        </span>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between py-5 px-6 gap-4">
        {/* Top: Weather summary */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold tracking-tighter text-white font-sans">
                28
              </span>
              <span className="text-xl font-semibold text-helion-green font-sans ml-0.5">
                °C
              </span>
            </div>
            <span className="text-[9px] font-grotesk tracking-widest text-neutral-400 font-bold uppercase">
              MOSTLY SUNNY
            </span>
          </div>

          <div className="relative flex items-center justify-center p-1.5 rounded-full bg-neutral-800/20 border border-neutral-800/60">
            <Sun className="size-10 stroke-helion-green fill-helion-green/5 animate-[spin_40s_linear_infinite]" />
          </div>
        </div>

        {/* Middle: Solar Telemetry Widgets (UV, Irradiance, Temp) */}
        <div className="grid grid-cols-3 gap-2 py-1 shrink-0">
          {/* Irradiance */}
          <div className="flex flex-col justify-between p-2 rounded-xl bg-neutral-950/40 border border-neutral-800/50">
            <div className="flex items-center gap-1 text-[8px] font-grotesk text-neutral-400 font-bold uppercase tracking-wider">
              <SunDim className="size-3 text-helion-green" />
              <span>IRR</span>
            </div>
            <div className="flex flex-col mt-1.5">
              <span className="text-sm font-bold text-white font-sans">845</span>
              <span className="text-[7.5px] font-mono text-neutral-500 font-semibold tracking-wide">W/m²</span>
            </div>
          </div>

          {/* UV Index */}
          <div className="flex flex-col justify-between p-2 rounded-xl bg-neutral-950/40 border border-neutral-800/50">
            <div className="flex items-center gap-1 text-[8px] font-grotesk text-neutral-400 font-bold uppercase tracking-wider">
              <Gauge className="size-3 text-helion-green" />
              <span>UV Index</span>
            </div>
            <div className="flex flex-col mt-1.5">
              <span className="text-sm font-bold text-white font-sans">8.4</span>
              <span className="text-[7.5px] font-mono text-helion-green font-bold tracking-wide">Very High</span>
            </div>
          </div>

          {/* Panel Temp */}
          <div className="flex flex-col justify-between p-2 rounded-xl bg-neutral-950/40 border border-neutral-800/50">
            <div className="flex items-center gap-1 text-[8px] font-grotesk text-neutral-400 font-bold uppercase tracking-wider">
              <Thermometer className="size-3 text-red-400/80" />
              <span>Panel T.</span>
            </div>
            <div className="flex flex-col mt-1.5">
              <span className="text-sm font-bold text-white font-sans">42.5°</span>
              <span className="text-[7.5px] font-mono text-neutral-500 font-semibold tracking-wide">Nominal</span>
            </div>
          </div>
        </div>

        {/* Bottom: Hourly trend horizontal row */}
        <div className="flex flex-col gap-1.5 shrink-0 pt-2 border-t border-neutral-800/40">
          <div className="grid grid-cols-5 gap-1.5">
            {hourlyData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 p-1 rounded-lg bg-neutral-950/20 border border-transparent">
                <span className="text-[8px] font-mono text-neutral-500">
                  {item.hour}
                </span>
                <div>
                  {item.icon}
                </div>
                <span className="text-[10px] font-semibold text-white font-sans">
                  {item.temp}°
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
