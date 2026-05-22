'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Sun,
  CloudSun,
  Cloud,
  MoonStar,
  Gauge,
  SunDim,
  Thermometer,
  CloudRain,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function WeatherForecast() {
  const [temp, setTemp] = React.useState(28);
  const [condition, setCondition] = React.useState<'SUNNY' | 'MOSTLY SUNNY' | 'CLOUDY' | 'RAINY'>('MOSTLY SUNNY');
  const [irradiance, setIrradiance] = React.useState(845);
  const [uvIndex, setUvIndex] = React.useState(8.4);
  const [panelTemp, setPanelTemp] = React.useState(42.5);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIrradiance((prev) => {
        const delta = (Math.random() - 0.5) * 15;
        const next = Math.max(150, Math.min(1000, prev + delta));
        
        setUvIndex(Number((next / 100).toFixed(1)));

        if (next > 800) {
          setCondition('SUNNY');
        } else if (next > 600) {
          setCondition('MOSTLY SUNNY');
        } else if (next > 300) {
          setCondition('CLOUDY');
        } else {
          setCondition('RAINY');
        }

        return Math.round(next);
      });

      setPanelTemp((prev) => {
        const delta = (Math.random() - 0.5) * 0.8;
        return Number(Math.max(15, Math.min(75, prev + delta)).toFixed(1));
      });

      setTemp((prev) => {
        const delta = (Math.random() - 0.5) * 0.3;
        return Number(Math.max(10, Math.min(45, prev + delta)).toFixed(1));
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (cond: string, sizeClass = "size-4.5") => {
    switch (cond) {
      case 'SUNNY':
        return <Sun className={cn(sizeClass, "text-helion-green")} />;
      case 'MOSTLY SUNNY':
        return <CloudSun className={cn(sizeClass, "text-helion-green/90")} />;
      case 'CLOUDY':
        return <Cloud className={cn(sizeClass, "text-muted-foreground")} />;
      case 'RAINY':
        return <CloudRain className={cn(sizeClass, "text-blue-400")} />;
      default:
        return <Sun className={cn(sizeClass, "text-helion-green")} />;
    }
  };

  // Dynamic weather data for hourly forecast based on current condition and temperature
  const hourlyData = React.useMemo(() => {
    // Generate simulated hours (e.g. next 5 hours)
    const hours = ['14:00', '15:00', '16:00', '17:00', '18:00'];
    
    const getForecastForCondition = (cond: typeof condition, offset: number) => {
      // Simulate weather progression starting from current condition
      let forecastCond: 'SUNNY' | 'MOSTLY SUNNY' | 'CLOUDY' | 'RAINY' = cond;
      if (cond === 'SUNNY') {
        if (offset === 2) forecastCond = 'MOSTLY SUNNY';
        else if (offset >= 3) forecastCond = 'CLOUDY';
      } else if (cond === 'MOSTLY SUNNY') {
        if (offset === 0 || offset === 1) forecastCond = 'SUNNY';
        else if (offset === 2) forecastCond = 'MOSTLY SUNNY';
        else forecastCond = 'CLOUDY';
      } else if (cond === 'CLOUDY') {
        if (offset === 2 || offset === 3) forecastCond = 'RAINY';
      } else if (cond === 'RAINY') {
        if (offset === 2 || offset === 3) forecastCond = 'CLOUDY';
        else if (offset === 4) forecastCond = 'MOSTLY SUNNY';
      }

      // Return Lucide icon element based on condition type with styling
      switch (forecastCond) {
        case 'SUNNY':
          return <Sun className="size-4.5 stroke-helion-green fill-helion-green/10" />;
        case 'MOSTLY SUNNY':
          return <CloudSun className="size-4.5 stroke-helion-green/90 fill-helion-green/5" />;
        case 'CLOUDY':
          return <Cloud className="size-4.5 stroke-muted-foreground fill-muted-foreground/5" />;
        case 'RAINY':
          return <CloudRain className="size-4.5 stroke-blue-400 fill-blue-400/5" />;
        default:
          return <Sun className="size-4.5 stroke-helion-green fill-helion-green/10" />;
      }
    };

    return hours.map((hour, idx) => {
      // Temperature cools down slightly as the day goes on
      const tempOffset = -idx;
      const forecastTemp = Math.round(temp + tempOffset);
      
      return {
        hour,
        temp: forecastTemp,
        icon: getForecastForCondition(condition, idx),
      };
    });
  }, [condition, temp]);

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
          LOC: 40.98°N, 28.79°W
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
              <span className={cn(
                "text-[7.5px] font-mono font-bold tracking-wide",
                uvIndex >= 8 ? "text-red-500" : uvIndex >= 6 ? "text-orange-500" : uvIndex >= 3 ? "text-yellow-500" : "text-green-500"
              )}>
                {uvIndex >= 8 ? "Very High" : uvIndex >= 6 ? "High" : uvIndex >= 3 ? "Moderate" : "Low"}
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
              <span className={cn(
                "text-[7.5px] font-mono font-semibold tracking-wide",
                panelTemp > 60 ? "text-red-500 animate-pulse font-bold" : "text-muted-foreground"
              )}>
                {panelTemp > 60 ? "Critical" : panelTemp > 50 ? "Warning" : "Nominal"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: Hourly trend horizontal row */}
        <div className="flex flex-col gap-1.5 shrink-0 pt-2 border-t border-border/40">
          <div className="grid grid-cols-5 gap-1.5">
            {hourlyData.map((item, idx) => (
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
