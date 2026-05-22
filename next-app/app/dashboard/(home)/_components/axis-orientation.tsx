'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Compass } from 'lucide-react';

interface GaugeProps {
  value: number;
  label: string;
  min: number;
  max: number;
  type: 'azimuth' | 'elevation';
}

function OrientationGauge({ value, label, min, max, type }: GaugeProps) {
  // Coordinates scaled to fill 90%+ of the 100x100 viewBox
  const radius = 41;
  const centerX = 50;
  const centerY = type === 'elevation' ? 45 : 50;

  let angleRad = 0;
  let pathD = '';

  if (type === 'azimuth') {
    // 0° is North (Up), 90° is East (Right), 180° is South (Down), 270° is West (Left)
    // SVG angle starts from right (East = 0 rad). So North (0°) is -90° (-pi/2 rad) in SVG space.
    const angleDeg = value - 90;
    angleRad = (angleDeg * Math.PI) / 180;
  } else {
    // Elevation: 0° is horizontal (Right), 90° is vertical (Down) when mirrored to bottom
    // Semicircle arc goes from 180° (Left, 0° elevation) to 0° (Right, 180° elevation)
    // Angle in SVG space = 180 - value
    const angleDeg = 180 - value;
    angleRad = (angleDeg * Math.PI) / 180;

    // Draw semicircle background arc path (larger radius) curving down (sweep-flag 0)
    pathD = `M 8 ${centerY} A ${radius} ${radius} 0 0 0 92 ${centerY}`;
  }

  const pointerX = centerX + radius * Math.cos(angleRad);
  const pointerY = centerY + radius * Math.sin(angleRad);

  return (
    <div className="flex flex-col items-center justify-center p-3 w-full">
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
        {/* SVG Gauge */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Definitions for Glow Filters */}
          <defs>
            <filter
              id="glow-green"
              filterUnits="userSpaceOnUse"
              x="-10"
              y="-10"
              width="120"
              height="120"
            >
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {type === 'azimuth' ? (
            <>
              {/* Outer compass ring */}
              <circle
                cx="50"
                cy="50"
                r="46"
                className="fill-none stroke-neutral-200 dark:stroke-neutral-800/80 stroke-1.5"
              />
              <circle
                cx="50"
                cy="50"
                r="41"
                className="fill-none stroke-neutral-300/40 dark:stroke-neutral-800/40 stroke-dashed stroke-1"
                strokeDasharray="2, 3"
              />
              {/* Compass Cardinal Points */}
              <text
                x="50"
                y="14"
                className="text-[8px] font-bold fill-neutral-400 dark:fill-neutral-400"
                textAnchor="middle"
              >
                N
              </text>
              <text
                x="88"
                y="53"
                className="text-[8px] font-bold fill-neutral-400 dark:fill-neutral-400"
                textAnchor="middle"
              >
                E
              </text>
              <text
                x="50"
                y="91"
                className="text-[8px] font-bold fill-neutral-400 dark:fill-neutral-400"
                textAnchor="middle"
              >
                S
              </text>
              <text
                x="12"
                y="53"
                className="text-[8px] font-bold fill-neutral-400 dark:fill-neutral-400"
                textAnchor="middle"
              >
                W
              </text>

              {/* Direction pointer line */}
              <line
                x1="50"
                y1="50"
                x2={pointerX}
                y2={pointerY}
                className="stroke-helion-green stroke-2.5"
                style={{ filter: 'url(#glow-green)' }}
              />
              {/* Center point */}
              <circle cx="50" cy="50" r="3.5" className="fill-helion-green" />
              {/* Pointer arrowhead/circle */}
              <circle
                cx={pointerX}
                cy={pointerY}
                r="3"
                className="fill-helion-green stroke-background stroke-1"
              />
            </>
          ) : (
            <>
              {/* Semicircle background arc */}
              <path
                d={pathD}
                className="fill-none stroke-neutral-200 dark:stroke-neutral-800/80 stroke-1.5"
              />
              <path
                d={`M 15 ${centerY} A 35 35 0 0 0 85 ${centerY}`}
                className="fill-none stroke-neutral-300/40 dark:stroke-neutral-800/40 stroke-dashed stroke-1"
                strokeDasharray="2, 3"
              />
              {/* Horizon line */}
              <line
                x1="5"
                y1={centerY}
                x2="95"
                y2={centerY}
                className="stroke-neutral-200 dark:stroke-neutral-800/50 stroke-1"
              />
              {/* Angle scale ticks */}
              <text
                x="8"
                y={centerY - 8}
                className="text-[7px] font-semibold fill-neutral-400 dark:fill-neutral-400"
                textAnchor="middle"
              >
                0°
              </text>
              <text
                x="50"
                y={centerY + radius + 7}
                className="text-[7px] font-semibold fill-neutral-400 dark:fill-neutral-400"
                textAnchor="middle"
              >
                90°
              </text>
              <text
                x="92"
                y={centerY - 8}
                className="text-[7px] font-semibold fill-neutral-400 dark:fill-neutral-400"
                textAnchor="middle"
              >
                180°
              </text>

              {/* Direction pointer line */}
              <line
                x1="50"
                y1={centerY}
                x2={pointerX}
                y2={pointerY}
                className="stroke-helion-green stroke-2.5"
                style={{ filter: 'url(#glow-green)' }}
              />
              {/* Center point */}
              <circle cx="50" cy={centerY} r="3.5" className="fill-helion-green" />
              {/* Pointer head */}
              <circle
                cx={pointerX}
                cy={pointerY}
                r="3"
                className="fill-helion-green stroke-background stroke-1"
              />
            </>
          )}
        </svg>

        {/* Numeric Value overlay - Larger typography */}
        <div className="absolute flex flex-col items-center justify-center mt-64 sm:mt-68">
          <span className="tabular-nums font-grotesk text-2xl sm:text-2xl font-bold text-helion-green tracking-tighter filter drop-shadow-[0_0_10px_rgba(0,230,118,0.15)]">
            {value.toFixed(1)}°
          </span>
        </div>
      </div>

      <span className="text-xs font-grotesk tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mt-2 font-bold">
        {label}
      </span>
    </div>
  );
}

export function AxisOrientation() {
  const [azimuth, setAzimuth] = React.useState(184.2);
  const [elevation, setElevation] = React.useState(42.8);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAzimuth((prev) => {
        const delta = (Math.random() - 0.5) * 0.15;
        let next = prev + delta;
        if (next > 360) next -= 360;
        if (next < 0) next += 360;
        return next;
      });

      setElevation((prev) => {
        const delta = (Math.random() - 0.5) * 0.08;
        let next = prev + delta;
        if (next < -10) next = -10;
        if (next > 90) next = 90;
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="font-grotesk flex flex-col dark:bg-black/30 backdrop-blur-md shadow-xl rounded-xl h-full justify-between">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-3 px-6">
        <div className="flex items-center gap-2">
          <Compass className="size-4.5 text-helion-green" />
          <CardTitle className="text-sm font-semibold tracking-wide font-sans">
            Axis Orientation
          </CardTitle>
        </div>

        <CardAction>
          <Badge className="bg-helion-green/10 text-helion-green border-helion-green/20 font-grotesk text-[9px] py-0.5 px-2 tracking-wider flex items-center gap-1.5 animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-helion-green inline-block" />
            Real-Time Feed
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 px-6">
        <OrientationGauge
          value={azimuth}
          label="Azimuth"
          min={0}
          max={360}
          type="azimuth"
        />
        <OrientationGauge
          value={elevation}
          label="Elevation"
          min={-10}
          max={90}
          type="elevation"
        />
      </CardContent>
    </Card>
  );
}
