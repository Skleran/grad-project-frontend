'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from '@/components/ui/card';
import {
  Shield,
  Settings,
  Compass,
  ArrowUp,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function SystemControls() {
  const [autoTrack, setAutoTrack] = React.useState(true);
  const [stowed, setStowed] = React.useState(false);
  const [calibrating, setCalibrating] = React.useState(false);
  const [calibProgress, setCalibProgress] = React.useState(0);

  // Trigger calibration animation
  const handleCalibrate = () => {
    if (calibrating) return;
    setCalibrating(true);
    setCalibProgress(0);
  };

  React.useEffect(() => {
    if (!calibrating) return;

    const interval = setInterval(() => {
      setCalibProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCalibrating(false);
          return 0;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [calibrating]);

  return (
    <Card className="flex flex-col dark:bg-black/30 backdrop-blur-md shadow-xl rounded-xl h-90 justify-between overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-3 px-6 shrink-0">
        <div className="flex items-center gap-2">
          <Settings className="size-4.5 text-helion-green" />
          <CardTitle className="text-sm font-semibold tracking-wide font-sans">
            System Controls
          </CardTitle>
        </div>
        {/* <CardAction>
          <span className="text-[9px] font-grotesk tracking-widest text-muted-foreground font-bold uppercase">
            Console v1.4
          </span>
        </CardAction> */}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between p-6 gap-4">
        {/* Toggle options */}
        <div className="flex flex-col gap-3 shrink-0">
          {/* Auto Track Toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 border border-border/50">
            <div className="flex flex-col gap-0.5">
              <Label
                htmlFor="auto-track"
                className="text-xs font-semibold cursor-pointer"
              >
                Autonomous Tracking
              </Label>
              <span className="text-[9.5px] text-muted-foreground font-sans">
                AI alignment calculation
              </span>
            </div>
            {/* Custom Switch equivalent */}
            <button
              id="auto-track"
              type="button"
              role="switch"
              aria-checked={autoTrack}
              onClick={() => setAutoTrack(!autoTrack)}
              className={cn(
                'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
                autoTrack
                  ? 'bg-helion-green'
                  : 'bg-neutral-200 dark:bg-neutral-800',
              )}
            >
              <span
                className={cn(
                  'pointer-events-none block h-4 w-4 rounded-full shadow-md transition-transform',
                  autoTrack
                    ? 'translate-x-4.5 bg-white dark:bg-black'
                    : 'translate-x-0.5 bg-white dark:bg-neutral-400',
                )}
              />
            </button>
          </div>

          {/* Stow toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 border border-border/50">
            <div className="flex flex-col gap-0.5">
              <Label
                htmlFor="stow-array"
                className="text-xs font-semibold cursor-pointer"
              >
                Emergency Stow Mode
              </Label>
              <span className="text-[9.5px] text-muted-foreground font-sans">
                Park panel flat ($0^\circ$ tilt)
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStowed(!stowed)}
              className={classNameForStowButton(stowed)}
            >
              <Shield className="size-3.5 mr-1" />
              {stowed ? 'STOWED' : 'STOW'}
            </Button>
          </div>
        </div>

        {/* Manual Tweaking Controls (active only when autoTrack is disabled) */}
        <div className="flex flex-col gap-2 flex-1 justify-center relative">
          {autoTrack && (
            <div className="absolute inset-0 bg-background/80 dark:bg-black/50 backdrop-blur-[0.5px] z-10 flex flex-col items-center justify-center rounded-lg border border-dashed border-border text-center p-3 select-none">
              <Compass className="size-5 text-muted-foreground mb-1" />
              <span className="text-[10px] font-bold text-foreground/80 font-grotesk tracking-widest uppercase">
                AUTO-MODE ENGAGED
              </span>
              <span className="text-[9px] text-muted-foreground font-sans mt-0.5">
                Disable autonomous mode to adjust manually
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {/* Azimuth adjust */}
            <div className="flex flex-col gap-1.5 p-2 rounded-lg bg-muted/20 border border-border/50">
              <span className="text-[9px] font-bold font-grotesk text-muted-foreground uppercase tracking-wider">
                Azimuth Bias
              </span>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-full text-xs text-muted-foreground hover:text-foreground hover:bg-accent border-border"
                >
                  -1°
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-full text-xs text-muted-foreground hover:text-foreground hover:bg-accent border-border"
                >
                  +1°
                </Button>
              </div>
            </div>

            {/* Elevation adjust */}
            <div className="flex flex-col gap-1.5 p-2 rounded-lg bg-muted/20 border border-border/50">
              <span className="text-[9px] font-bold font-grotesk text-muted-foreground uppercase tracking-wider">
                Elevation Bias
              </span>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-full text-xs text-muted-foreground hover:text-foreground hover:bg-accent border-border"
                >
                  -1°
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-full text-xs text-muted-foreground hover:text-foreground hover:bg-accent border-border"
                >
                  +1°
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Actions */}
        <div className="flex flex-col gap-2 shrink-0 pt-2 border-t border-border/40">
          <Button
            onClick={handleCalibrate}
            disabled={calibrating}
            variant="outline"
            className="w-full h-9 font-semibold text-xs tracking-wide transition-all"
          >
            {calibrating ? (
              <span className="flex items-center gap-1.5 font-mono text-[10px]">
                <RefreshCw className="size-3.5 animate-spin" />
                CALIBRATING SYSTEM ({calibProgress}%)
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <RefreshCw className="size-3.5" />
                Trigger Calibration Scan
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function classNameForStowButton(stowed: boolean) {
  if (stowed) {
    return 'h-7 text-[10px] font-grotesk tracking-widest border-red-500 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40 shadow-sm font-bold';
  }
  return 'h-7 text-[10px] font-grotesk tracking-widest border-border hover:border-red-500/50 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 text-muted-foreground';
}
