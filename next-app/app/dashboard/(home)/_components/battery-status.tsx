'use client';

import * as React from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Battery, BatteryFull, BatteryLow } from 'lucide-react';

const chartConfig = {
  capacity: {
    label: 'Capacity',
    color: 'var(--helion-green)',
  },
} satisfies ChartConfig;

export function BatteryStatus() {
  const [battery, setBattery] = React.useState(88);
  const [timeAgo, setTimeAgo] = React.useState('Just now');

  React.useEffect(() => {
    let secs = 0;
    const interval = setInterval(() => {
      setBattery((prev) => {
        const chargeRate = 0.01;
        let next = prev + chargeRate * (Math.random() * 0.5 + 0.5);
        if (next > 100) next = 100;
        return Number(next.toFixed(2));
      });

      secs += 2;
      if (secs < 60) {
        setTimeAgo(`${secs}s ago`);
      } else {
        setTimeAgo(`${Math.floor(secs / 60)}m ago`);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Generate historical data points and append the live active battery percentage
  const chartData = React.useMemo(() => {
    return [
      { time: '24h ago', capacity: 92 },
      { time: '20h ago', capacity: 89 },
      { time: '16h ago', capacity: 83 },
      { time: '12h ago', capacity: 75 },
      { time: '8h ago', capacity: 72 },
      { time: '4h ago', capacity: 78 },
      { time: 'Now', capacity: Math.floor(battery) },
    ];
  }, [battery]);

  return (
    <Card className="flex flex-col dark:bg-black/30 backdrop-blur-md shadow-xl rounded-xl h-full justify-between overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-3 px-6 shrink-0">
        <div className="flex items-center gap-2">
          {battery <= 20 ? (
            <BatteryLow className="size-4.5 text-red-500 animate-pulse" />
          ) : battery <= 75 ? (
            <Battery className="size-4.5 text-yellow-500" />
          ) : (
            <BatteryFull className="size-4.5 text-helion-green" />
          )}
          <CardTitle className="text-sm font-semibold tracking-wide">
            Battery
          </CardTitle>
        </div>

        <CardDescription className="text-[10px] text-neutral-400 dark:text-neutral-500 tabular-nums">
          Last update {timeAgo}
        </CardDescription>
      </CardHeader>

      {/* Remove padding-bottom to allow chart to flow directly to the bottom */}
      <CardContent className="flex-1 flex flex-col justify-between pt-6 px-0 pb-0">
        {/* Metric Label Row */}
        <div className="flex items-baseline gap-2 px-6 shrink-0">
          <span className="text-5xl sm:text-6xl font-bold tracking-tighter text-helion-green font-grotesk tabular-nums filter drop-shadow-[0_0_15px_rgba(0,230,118,0.15)]">
            {Math.floor(battery)}%
          </span>
          <span className="text-xs text-muted-foreground font-grotesk font-semibold tracking-widest uppercase">
            CAPACITY
          </span>
        </div>

        {/* Recharts Area Chart filling the remaining space */}
        <div className="h-37.5 w-full mt-4 relative">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="batteryGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--helion-green)"
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--helion-green)"
                      stopOpacity={0.0}
                    />
                  </linearGradient>
                </defs>

                <XAxis dataKey="time" hide />

                <YAxis domain={[60, 100]} hide />

                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent hideLabel className="text-[10px]" />
                  }
                />

                <Area
                  type="monotone"
                  dataKey="capacity"
                  stroke="var(--helion-green)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#batteryGlow)"
                  activeDot={{
                    r: 4,
                    style: { fill: 'var(--helion-green)', strokeWidth: 0 },
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Absolute overlay labels for chart limits */}
          <div className="absolute bottom-3 left-6 right-6 flex justify-between items-center text-[9px] font-grotesk text-muted-foreground/80 tracking-wider uppercase pointer-events-none select-none">
            <span>24hr ago</span>
            <span>Now</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
