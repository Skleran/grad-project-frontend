'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card';
import { Terminal, Shield, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'OK' | 'WARN' | 'ERROR';
  message: string;
}

export function SystemLogsCard() {
  const [logs, setLogs] = React.useState<LogEntry[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Generate initial log list
  React.useEffect(() => {
    const initialLogs: LogEntry[] = [
      { timestamp: '16:15:32', level: 'INFO', message: 'Inertial measurement unit calibration: success.' },
      { timestamp: '16:15:33', level: 'INFO', message: 'Connecting to Helion primary tracking algorithm node...' },
      { timestamp: '16:15:35', level: 'OK', message: 'Algorithm connection established. Precision tracking active.' },
      { timestamp: '16:20:00', level: 'INFO', message: 'Ambient temperature: 27.8°C. Wind speed: 8.5 km/h.' },
      { timestamp: '16:20:10', level: 'INFO', message: 'Azimuth adjusted to 182.1° (+0.05° error margin).' },
      { timestamp: '16:20:12', level: 'INFO', message: 'Elevation adjusted to 40.5° (optimal perpendicular angle).' },
      { timestamp: '16:25:00', level: 'INFO', message: 'Battery capacity: 87.2%. Net charging current: +6.68 A.' },
      { timestamp: '16:28:44', level: 'INFO', message: 'Solar panel array performance check: nominal.' },
      { timestamp: '16:30:12', level: 'INFO', message: 'Solar panel temperature: 38.6°C. Max thermal threshold: 85.0°C.' },
      { timestamp: '16:32:00', level: 'INFO', message: 'Azimuth adjusted to 184.2°. Elevation adjusted to 42.8°.' },
      { timestamp: '16:34:00', level: 'OK', message: 'Sun vector intersection: 99.8%. Perfect alignment maintained.' },
    ];
    setLogs(initialLogs);
  }, []);

  // Simulate new logs arriving in real-time
  React.useEffect(() => {
    const logTemplates = [
      { level: 'INFO', message: () => `Azimuth corrected to ${(184.2 + (Math.random() - 0.5) * 2).toFixed(1)}° for optimal solar intersection.` },
      { level: 'INFO', message: () => `Elevation tracking updated to ${(42.8 + (Math.random() - 0.5) * 1.5).toFixed(1)}° (solar declination sweep).` },
      { level: 'INFO', message: () => `Battery bank telemetry update: ${(88 + Math.random() * 0.5).toFixed(2)}% capacity, cells balanced.` },
      { level: 'INFO', message: () => `Inverter temperature: ${(41.2 + Math.random() * 2).toFixed(1)}°C (nominal bounds).` },
      { level: 'OK', message: () => `Tracking motors disengaged. Holding position (solar azimuth lock).` },
      { level: 'INFO', message: () => `Wind speed check: ${(10 + Math.random() * 6).toFixed(1)} km/h. Stow override threshold: 45.0 km/h.` },
      { level: 'INFO', message: () => `Telemetry ping received. Latency: ${Math.floor(Math.random() * 40 + 10)}ms.` },
    ] as const;

    const interval = setInterval(() => {
      const now = new Date();
      const timestamp = now.toTimeString().split(' ')[0];
      const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      
      const newLog: LogEntry = {
        timestamp,
        level: template.level,
        message: template.message(),
      };

      setLogs((prev) => {
        // Keep last 40 logs to avoid memory bloat
        const next = [...prev, newLog];
        if (next.length > 40) {
          next.shift();
        }
        return next;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs container to the bottom when new logs arrive
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const clearLogs = () => {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0];
    setLogs([{ timestamp, level: 'INFO', message: 'Log buffer cleared by operator override.' }]);
  };

  return (
    <Card className="flex flex-col bg-neutral-900/40 dark:bg-black/30 backdrop-blur-md border border-neutral-800 dark:border-neutral-900 shadow-xl rounded-xl h-[360px] justify-between">
      <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-800/60 pb-3 px-6 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="size-4.5 text-helion-green" />
          <CardTitle className="text-sm font-semibold tracking-wide font-sans text-white">
            System Logs
          </CardTitle>
        </div>
        <CardAction className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearLogs} 
            className="h-7 text-[10px] text-neutral-400 hover:text-white font-grotesk tracking-widest uppercase hover:bg-neutral-800/50"
          >
            <Trash2 className="size-3.5 mr-1" /> Clear
          </Button>
          <span className="h-1.5 w-1.5 rounded-full bg-helion-green inline-block animate-pulse" />
        </CardAction>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-0 relative">
        {/* Terminal Container */}
        <div 
          ref={containerRef}
          className="w-full h-full overflow-y-auto font-mono text-[11px] leading-relaxed p-5 scrollbar-thin scrollbar-thumb-neutral-800"
        >
          <div className="flex flex-col gap-1.5 text-neutral-300">
            {logs.map((log, idx) => {
              let badgeColor = 'text-blue-400';
              if (log.level === 'OK') badgeColor = 'text-helion-green';
              if (log.level === 'WARN') badgeColor = 'text-yellow-500';
              if (log.level === 'ERROR') badgeColor = 'text-red-500';

              return (
                <div key={idx} className="flex items-start gap-2 hover:bg-neutral-800/20 py-0.5 rounded px-1 transition-colors">
                  <span className="text-neutral-500 select-none">[{log.timestamp}]</span>
                  <span className={`${badgeColor} font-bold select-none`}>{log.level}</span>
                  <span className="text-neutral-300 dark:text-neutral-200">{log.message}</span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
