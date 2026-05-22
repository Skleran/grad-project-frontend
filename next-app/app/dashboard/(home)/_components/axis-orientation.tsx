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
  const center = 50;

  let angleRad = 0;
  let pathD = '';

  if (type === 'azimuth') {
    // 0° is North (Up), 90° is East (Right), 180° is South (Down), 270° is West (Left)
    // SVG angle starts from right (East = 0 rad). So North (0°) is -90° (-pi/2 rad) in SVG space.
    const angleDeg = value - 90;
    angleRad = (angleDeg * Math.PI) / 180;
  } else {
    // Elevation: 0° is horizontal (Right), 90° is vertical (Up)
    // Semicircle arc goes from 180° (Left, 0° elevation) to 0° (Right, 180° elevation)
    // Map 0° elevation to 180° (Left) and 90° elevation to 90° (Up/Center)
    // Angle in SVG space = 180 - value
    const angleDeg = 180 - value;
    angleRad = (angleDeg * Math.PI) / 180;

    // Draw semicircle background arc path (larger radius)
    pathD = `M 8 55 A ${radius} ${radius} 0 0 1 92 55`;
  }

  const pointerX = center + radius * Math.cos(angleRad);
  const pointerY = center + radius * Math.sin(angleRad);

  return (
    <div className="flex flex-col items-center justify-center p-3 w-full">
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
        {/* SVG Gauge */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Definitions for Glow Filters */}
          <defs>
            <filter
              id="glow-green"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
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
                className="fill-none stroke-neutral-800 dark:stroke-neutral-800/80 stroke-1.5"
              />
              <circle
                cx="50"
                cy="50"
                r="41"
                className="fill-none stroke-neutral-900/40 dark:stroke-neutral-800/40 stroke-dashed stroke-1"
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
                className="fill-helion-green stroke-black stroke-1"
              />
            </>
          ) : (
            <>
              {/* Semicircle background arc */}
              <path
                d={pathD}
                className="fill-none stroke-neutral-800 dark:stroke-neutral-800/80 stroke-1.5"
              />
              <path
                d={`M 15 55 A 35 35 0 0 1 85 55`}
                className="fill-none stroke-neutral-900/40 dark:stroke-neutral-800/40 stroke-dashed stroke-1"
                strokeDasharray="2, 3"
              />
              {/* Horizon line */}
              <line
                x1="5"
                y1="55"
                x2="95"
                y2="55"
                className="stroke-neutral-800 dark:stroke-neutral-800/50 stroke-1"
              />
              {/* Angle scale ticks */}
              <text
                x="8"
                y="65"
                className="text-[7px] font-semibold fill-neutral-400 dark:fill-neutral-400"
                textAnchor="middle"
              >
                0°
              </text>
              <text
                x="50"
                y="10"
                className="text-[7px] font-semibold fill-neutral-400 dark:fill-neutral-400"
                textAnchor="middle"
              >
                90°
              </text>
              <text
                x="92"
                y="65"
                className="text-[7px] font-semibold fill-neutral-400 dark:fill-neutral-400"
                textAnchor="middle"
              >
                180°
              </text>

              {/* Direction pointer line */}
              <line
                x1="50"
                y1="55"
                x2={pointerX}
                y2={pointerY}
                className="stroke-helion-green stroke-2.5"
                style={{ filter: 'url(#glow-green)' }}
              />
              {/* Center point */}
              <circle cx="50" cy="55" r="3.5" className="fill-helion-green" />
              {/* Pointer head */}
              <circle
                cx={pointerX}
                cy={pointerY}
                r="3"
                className="fill-helion-green stroke-black stroke-1"
              />
            </>
          )}
        </svg>

        {/* Numeric Value overlay - Larger typography */}
        <div className="absolute flex flex-col items-center justify-center mt-66">
          <span className="tabular-nums font-grotesk text-3xl sm:text-4xl font-bold text-helion-green tracking-tighter filter drop-shadow-[0_0_10px_rgba(0,230,118,0.15)]">
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
    <Card className="font-grotesk flex flex-col bg-neutral-900/40 dark:bg-black/30 backdrop-blur-md border border-neutral-800 dark:border-neutral-900 shadow-xl rounded-xl h-full justify-between">
      <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-800/60 pb-3 px-6">
        <CardTitle className="text-sm font-semibold tracking-wide text-white font-sans">
          Axis Orientation
        </CardTitle>
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
