'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Sun,
  CloudSun,
  Cloud,
  Gauge,
  SunDim,
  Thermometer,
  CloudRain,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper to map WMO weather codes to our component condition types
const mapWmoCodeToCondition = (
  code: number,
): 'SUNNY' | 'MOSTLY SUNNY' | 'CLOUDY' | 'RAINY' => {
  if (code === 0 || code === 1) return 'SUNNY';
  if (code === 2) return 'MOSTLY SUNNY';
  if (code === 3 || code === 45 || code === 48) return 'CLOUDY';
  return 'RAINY'; // 51-67, 71-77, 80-86, 95-99
};

// Helper to render weather icons consistently
const getWeatherIcon = (
  cond: string,
  sizeClass = 'size-4.5',
  isHourly = false,
) => {
  if (isHourly) {
    switch (cond) {
      case 'SUNNY':
        return (
          <Sun
            className={cn(
              sizeClass,
              'stroke-helion-green fill-helion-green/10',
            )}
          />
        );
      case 'MOSTLY SUNNY':
        return (
          <CloudSun
            className={cn(
              sizeClass,
              'stroke-helion-green/90 fill-helion-green/5',
            )}
          />
        );
      case 'CLOUDY':
        return (
          <Cloud
            className={cn(
              sizeClass,
              'stroke-muted-foreground fill-muted-foreground/5',
            )}
          />
        );
      case 'RAINY':
        return (
          <CloudRain
            className={cn(sizeClass, 'stroke-blue-400 fill-blue-400/5')}
          />
        );
      default:
        return (
          <Sun
            className={cn(
              sizeClass,
              'stroke-helion-green fill-helion-green/10',
            )}
          />
        );
    }
  }
  switch (cond) {
    case 'SUNNY':
      return <Sun className={cn(sizeClass, 'text-helion-green')} />;
    case 'MOSTLY SUNNY':
      return <CloudSun className={cn(sizeClass, 'text-helion-green/90')} />;
    case 'CLOUDY':
      return <Cloud className={cn(sizeClass, 'text-muted-foreground')} />;
    case 'RAINY':
      return <CloudRain className={cn(sizeClass, 'text-blue-400')} />;
    default:
      return <Sun className={cn(sizeClass, 'text-helion-green')} />;
  }
};

export function WeatherForecast() {
  // Base states derived from API
  const [baseTemp, setBaseTemp] = React.useState(28);
  const [baseCondition, setBaseCondition] = React.useState<
    'SUNNY' | 'MOSTLY SUNNY' | 'CLOUDY' | 'RAINY'
  >('MOSTLY SUNNY');
  const [baseIrradiance, setBaseIrradiance] = React.useState(845);
  const [baseUvIndex, setBaseUvIndex] = React.useState(8.4);

  // Live telemetry states (with sensor noise fluctuation)
  const [temp, setTemp] = React.useState(28);
  const [condition, setCondition] = React.useState<
    'SUNNY' | 'MOSTLY SUNNY' | 'CLOUDY' | 'RAINY'
  >('MOSTLY SUNNY');
  const [irradiance, setIrradiance] = React.useState(845);
  const [uvIndex, setUvIndex] = React.useState(8.4);
  const [panelTemp, setPanelTemp] = React.useState(42.5);

  // Hourly forecast state
  const [hourlyForecast, setHourlyForecast] = React.useState<
    Array<{
      hour: string;
      temp: number;
      icon: React.ReactNode;
    }>
  >([
    {
      hour: '14:00',
      temp: 28,
      icon: getWeatherIcon('SUNNY', 'size-4.5', true),
    },
    {
      hour: '15:00',
      temp: 27,
      icon: getWeatherIcon('MOSTLY SUNNY', 'size-4.5', true),
    },
    {
      hour: '16:00',
      temp: 26,
      icon: getWeatherIcon('MOSTLY SUNNY', 'size-4.5', true),
    },
    {
      hour: '17:00',
      temp: 25,
      icon: getWeatherIcon('CLOUDY', 'size-4.5', true),
    },
    {
      hour: '18:00',
      temp: 24,
      icon: getWeatherIcon('CLOUDY', 'size-4.5', true),
    },
  ]);

  // Fetch weather data from Open-Meteo
  React.useEffect(() => {
    let active = true;

    async function fetchWeather() {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=40.98&longitude=28.79&current=temperature_2m,weather_code,uv_index,shortwave_radiation&hourly=temperature_2m,weather_code&timezone=auto',
        );
        if (!res.ok) throw new Error('Failed to fetch weather data');
        const data = await res.json();

        if (!active) return;

        // Extract current data
        const currentTemp = data.current.temperature_2m;
        const currentCode = data.current.weather_code;
        const currentUv = data.current.uv_index ?? 0;
        const currentIrr = data.current.shortwave_radiation ?? 0;

        const cond = mapWmoCodeToCondition(currentCode);

        setBaseTemp(currentTemp);
        setBaseCondition(cond);
        setBaseIrradiance(currentIrr);
        setBaseUvIndex(currentUv);

        // Update live states immediately on fetch
        setTemp(currentTemp);
        setCondition(cond);
        setIrradiance(Math.round(currentIrr));
        setUvIndex(currentUv);
        setPanelTemp(Number((currentTemp + currentIrr * 0.02).toFixed(1)));

        // Extract hourly data (next 5 hours starting from current hour)
        const hourlyTimes = data.hourly.time;
        const hourlyTemps = data.hourly.temperature_2m;
        const hourlyCodes = data.hourly.weather_code;

        // Find index closest to current time
        const currentTimeMs = new Date(data.current.time).getTime();
        let closestIndex = hourlyTimes.findIndex(
          (t: string) => new Date(t).getTime() >= currentTimeMs,
        );
        if (closestIndex === -1) closestIndex = 0;

        const forecastList = [];
        for (let i = 0; i < 5; i++) {
          const index = closestIndex + i;
          if (index < hourlyTimes.length) {
            const timeStr = new Date(hourlyTimes[index]).toLocaleTimeString(
              [],
              {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              },
            );
            const itemTemp = Math.round(hourlyTemps[index]);
            const itemCond = mapWmoCodeToCondition(hourlyCodes[index]);
            forecastList.push({
              hour: timeStr,
              temp: itemTemp,
              icon: getWeatherIcon(itemCond, 'size-4.5', true),
            });
          }
        }
        setHourlyForecast(forecastList);
      } catch (err) {
        console.error('Weather fetch error:', err);
      }
    }

    fetchWeather();
    // Refetch weather data every 5 minutes
    const fetchInterval = setInterval(fetchWeather, 5 * 60 * 1000);

    return () => {
      active = false;
      clearInterval(fetchInterval);
    };
  }, []);

  // Live telemetry simulation (minor ambient & solar sensor fluctuations)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIrradiance((prev) => {
        // Minor sensor noise variation around base API irradiance
        const delta = (Math.random() - 0.5) * 8;
        const next = Math.max(0, Math.min(1200, baseIrradiance + delta));

        // Update UV based on fluctuated irradiance
        setUvIndex(
          Number(
            Math.max(0, baseUvIndex + (Math.random() - 0.5) * 0.1).toFixed(1),
          ),
        );

        return Math.round(next);
      });

      setTemp((prev) => {
        const delta = (Math.random() - 0.5) * 0.15;
        return Number(Math.max(-20, Math.min(50, baseTemp + delta)).toFixed(1));
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [baseTemp, baseIrradiance, baseUvIndex]);

  // Calculate physical solar panel temp: T_ambient + T_gain_from_irradiance (T_gain ≈ 0.02 * Irr)
  React.useEffect(() => {
    setPanelTemp(Number((temp + irradiance * 0.02).toFixed(1)));
  }, [temp, irradiance]);

  return (
    <Card className="flex flex-col dark:bg-black/30 backdrop-blur-md shadow-xl rounded-xl h-full justify-between overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-3 px-6 shrink-0">
        <div className="flex items-center gap-2">
          {getWeatherIcon(condition)}
          <CardTitle className="text-sm font-semibold tracking-wide font-sans">
            Solar Environment
          </CardTitle>
        </div>
        <span className="text-[9px] font-mono text-helion-green/80 font-bold tracking-wider">
          LOC: 40.98°N, 28.79°E
        </span>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between py-5 px-6 gap-4">
        {/* Top: Weather summary */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold tracking-tighter font-sans">
                {temp}
              </span>
              <span className="text-xl font-semibold text-helion-green font-sans ml-0.5">
                °C
              </span>
            </div>
            <span className="text-[9px] font-grotesk tracking-widest text-muted-foreground font-bold uppercase">
              {condition.replace('_', ' ')}
            </span>
          </div>

          <div className="relative flex items-center justify-center p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/20 border border-neutral-200 dark:border-neutral-800/60">
            {condition === 'SUNNY' ? (
              <Sun className="size-10 stroke-helion-green fill-helion-green/5 animate-[spin_40s_linear_infinite]" />
            ) : condition === 'MOSTLY SUNNY' ? (
              <CloudSun className="size-10 stroke-helion-green fill-helion-green/5 animate-pulse" />
            ) : condition === 'CLOUDY' ? (
              <Cloud className="size-10 stroke-muted-foreground fill-muted-foreground/5 animate-pulse" />
            ) : (
              <CloudRain className="size-10 stroke-blue-400 fill-blue-400/5 animate-bounce" />
            )}
          </div>
        </div>

        {/* Middle: Solar Telemetry Widgets (UV, Irradiance, Temp) */}
        <div className="grid grid-cols-3 gap-2 py-1 shrink-0">
          {/* Irradiance */}
          <div className="flex flex-col justify-between p-2 rounded-xl bg-muted/40 border border-border/50">
            <div className="flex items-center gap-1 text-[8px] font-grotesk text-muted-foreground font-bold uppercase tracking-wider">
              <SunDim className="size-3 text-helion-green" />
              <span>IRR</span>
            </div>
            <div className="flex flex-col mt-1.5">
              <span className="text-sm font-bold font-sans">{irradiance}</span>
              <span className="text-[7.5px] font-mono text-muted-foreground font-semibold tracking-wide">
                W/m²
              </span>
            </div>
          </div>

          {/* UV Index */}
          <div className="flex flex-col justify-between p-2 rounded-xl bg-muted/40 border border-border/50">
            <div className="flex items-center gap-1 text-[8px] font-grotesk text-muted-foreground font-bold uppercase tracking-wider">
              <Gauge className="size-3 text-helion-green" />
              <span>UV Index</span>
            </div>
            <div className="flex flex-col mt-1.5">
              <span className="text-sm font-bold font-sans">{uvIndex}</span>
              <span
                className={cn(
                  'text-[7.5px] font-mono font-bold tracking-wide',
                  uvIndex >= 8
                    ? 'text-red-500'
                    : uvIndex >= 6
                      ? 'text-orange-500'
                      : uvIndex >= 3
                        ? 'text-yellow-500'
                        : 'text-green-500',
                )}
              >
                {uvIndex >= 8
                  ? 'Very High'
                  : uvIndex >= 6
                    ? 'High'
                    : uvIndex >= 3
                      ? 'Moderate'
                      : 'Low'}
              </span>
            </div>
          </div>

          {/* Panel Temp */}
          <div className="flex flex-col justify-between p-2 rounded-xl bg-muted/40 border border-border/50">
            <div className="flex items-center gap-1 text-[8px] font-grotesk text-muted-foreground font-bold uppercase tracking-wider">
              <Thermometer className="size-3 text-red-500 dark:text-red-400/80" />
              <span>Panel T.</span>
            </div>
            <div className="flex flex-col mt-1.5">
              <span className="text-sm font-bold font-sans">{panelTemp}°</span>
              <span
                className={cn(
                  'text-[7.5px] font-mono font-semibold tracking-wide',
                  panelTemp > 60
                    ? 'text-red-500 animate-pulse font-bold'
                    : 'text-muted-foreground',
                )}
              >
                {panelTemp > 60
                  ? 'Critical'
                  : panelTemp > 50
                    ? 'Warning'
                    : 'Nominal'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: Hourly trend horizontal row */}
        <div className="flex flex-col gap-1.5 shrink-0 pt-2 border-t border-border/40">
          <div className="grid grid-cols-5 gap-1.5">
            {hourlyForecast.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-1.5 p-1 rounded-lg bg-muted/20 border border-transparent"
              >
                <span className="text-[8px] font-mono text-muted-foreground">
                  {item.hour}
                </span>
                <div>{item.icon}</div>
                <span className="text-[10px] font-semibold font-sans">
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
