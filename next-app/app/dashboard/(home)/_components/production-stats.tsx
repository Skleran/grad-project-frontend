'use client';

import * as React from 'react';
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const prodChartConfig = {
  value: {
    label: 'Production',
    color: 'var(--helion-green)',
  },
} satisfies ChartConfig;

const usageChartConfig = {
  value: {
    label: 'Usage',
    color: 'oklch(0.704 0.191 22.216)', // theme destructive red
  },
} satisfies ChartConfig;

export function ProductionStats() {
  const [production, setProduction] = React.useState(14.81);
  const [usage, setUsage] = React.useState(9.29);
  const [prodTime, setProdTime] = React.useState('Just now');
  const [usageTime, setUsageTime] = React.useState('Just now');

  // Sparkline historical data arrays
  const [prodHistory, setProdHistory] = React.useState([
    { val: 6.2 },
    { val: 8.5 },
    { val: 11.0 },
    { val: 13.5 },
    { val: 15.1 },
    { val: 14.8 },
    { val: 13.9 },
    { val: 14.81 },
  ]);
  const [usageHistory, setUsageHistory] = React.useState([
    { val: 7.1 },
    { val: 6.8 },
    { val: 8.2 },
    { val: 11.5 },
    { val: 9.8 },
    { val: 8.9 },
    { val: 9.1 },
    { val: 9.29 },
  ]);

  React.useEffect(() => {
    let secs = 0;
    const interval = setInterval(() => {
      // Ticks and updates
      setProduction((prev) => {
        const delta = (Math.random() - 0.5) * 0.2;
        const next = Math.max(3.0, Math.min(27.1, prev + delta));

        // Update history array
        setProdHistory((history) => {
          const updated = [
            ...history.slice(0, -1),
            { val: Number(next.toFixed(2)) },
          ];
          return updated;
        });

        return Number(next.toFixed(2));
      });

      setUsage((prev) => {
        const delta = (Math.random() - 0.5) * 0.15;
        const next = Math.max(1.1, Math.min(22.3, prev + delta));

        // Update history array
        setUsageHistory((history) => {
          const updated = [
            ...history.slice(0, -1),
            { val: Number(next.toFixed(2)) },
          ];
          return updated;
        });

        return Number(next.toFixed(2));
      });

      secs += 2;
      if (secs < 60) {
        setProdTime(`${secs}s ago`);
        setUsageTime(`${secs}s ago`);
      } else {
        setProdTime(`${Math.floor(secs / 60)}m ago`);
        setUsageTime(`${Math.floor(secs / 60)}m ago`);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="flex flex-col dark:bg-black/30 backdrop-blur-md shadow-xl rounded-xl h-full divide-y justify-between overflow-hidden">
      {/* Current Production Section */}
      <CardContent className="flex-1 flex flex-col justify-between py-6 px-6">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-helion-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-helion-green"></span>
            </span>
            <span className="text-xs font-semibold text-foreground/90">
              Current Production
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground tabular-nums">
            Last update {prodTime}
          </span>
        </div>

        {/* Value + Sparkline row */}
        <div className="flex items-center justify-between gap-4 mt-3 flex-1">
          {/* Numbers left */}
          <div className="flex flex-col gap-1 shrink-0">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight tabular-nums">
                {production.toFixed(2)}
              </span>
              <span className="text-xs font-grotesk text-muted-foreground font-medium">
                KWH
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-[10px] font-grotesk tracking-wide text-muted-foreground/80 tabular-nums">
              <span>
                Min <span className="text-foreground/90 ml-0.5">3.0</span>
              </span>
              <span>
                Max <span className="text-helion-green ml-0.5">27.1</span>
              </span>
            </div>
          </div>

          {/* Sparkline right */}
          <div className="h-14 flex-1 relative min-w-[120px]">
            <ChartContainer config={prodChartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={prodHistory}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="prodGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="var(--helion-green)"
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--helion-green)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <YAxis domain={['auto', 'auto']} hide />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        hideLabel
                        className="text-[9px] p-1.5"
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="val"
                    stroke="var(--helion-green)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#prodGlow)"
                    activeDot={{
                      r: 3,
                      style: { fill: 'var(--helion-green)', strokeWidth: 0 },
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>

      {/* Current Usage Section */}
      <CardContent className="flex-1 flex flex-col justify-between py-6 px-6">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-semibold text-foreground/90">
              Current Usage
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground tabular-nums">
            Last update {usageTime}
          </span>
        </div>

        {/* Value + Sparkline row */}
        <div className="flex items-center justify-between gap-4 mt-3 flex-1">
          {/* Numbers left */}
          <div className="flex flex-col gap-1 shrink-0">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight tabular-nums font-grotesk">
                {usage.toFixed(2)}
              </span>
              <span className="text-xs font-grotesk text-muted-foreground font-medium">
                KWH
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-[10px] tabular-nums font-grotesk tracking-wide text-muted-foreground/80">
              <span>
                Min <span className="text-foreground/90 ml-0.5">1.1</span>
              </span>
              <span>
                Max <span className="text-red-600 dark:text-red-400/80 ml-0.5">22.3</span>
              </span>
            </div>
          </div>

          {/* Sparkline right */}
          <div className="h-14 flex-1 relative min-w-[120px]">
            <ChartContainer config={usageChartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={usageHistory}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="usageGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="oklch(0.704 0.191 22.216)"
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="100%"
                        stopColor="oklch(0.704 0.191 22.216)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <YAxis domain={['auto', 'auto']} hide />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        hideLabel
                        className="text-[9px] p-1.5"
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="val"
                    stroke="oklch(0.704 0.191 22.216)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#usageGlow)"
                    activeDot={{
                      r: 3,
                      style: {
                        fill: 'oklch(0.704 0.191 22.216)',
                        strokeWidth: 0,
                      },
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
