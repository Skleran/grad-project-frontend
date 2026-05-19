import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
import { ChartBarDefault } from './chart-demo';

export default function DashboardCallout() {
  return (
    <div className="relative w-full flex flex-col gap-3">
      <div className="absolute translate-x-1/2 translate-y-1/2 rounded-[100px] w-1/2 h-1/2 bg-radial from-helion-green/50 to-background blur-[130px] z-0" />

      <div className="w-full flex flex-col gap-3 z-1">
        {/* header */}
        <h3 className="text-helion-green font-grotesk font-thin">
          DATA INFRASTRUCTURE
        </h3>

        {/* content */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          {/* text */}
          <div className="w-full flex flex-col justify-between lg:justify-start gap-4">
            <p className="text-xl lg:text-5xl font-semibold pb-1">
              Command Center Visibility
            </p>
            <p className="text-sm pb-3 text-muted-foreground">
              Monitor single panels or entire megawatt arrays from a unified,
              high-fidelity interface. Real-time telemetry, predictive
              maintenance alerts, and historical performance mapping.
            </p>
            <ul className="flex flex-col gap-5">
              <li className="flex items-center gap-2">
                <span>
                  <CheckCircle className="stroke-helion-green" />
                </span>
                <p>Sub-degree positioning accuracy logs</p>
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <CheckCircle className="stroke-helion-green" />
                </span>
                <p>Actuator health & torque monitoring</p>
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <CheckCircle className="stroke-helion-green" />
                </span>
                <p>API integration for enterprise grids</p>
              </li>
            </ul>
          </div>

          {/* mockup */}
          <div className="w-full">
            <Card className="w-full max-w-md mx-auto">
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-between gap-2">
                    <div className="bg-red-500/45 dark:bg-red-800/35 size-3 border border-red-500 dark:border-red-800 rounded-full" />
                    <div className="bg-yellow-400/45 dark:bg-yellow-800/35 size-3 border border-yellow-500 dark:border-yellow-800 rounded-full" />
                    <div className="bg-green-400/45 dark:bg-green-800/35 size-3 border border-green-400 dark:border-green-800 rounded-full" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    HELION DASHBOARD
                  </p>
                </div>

                <Separator />

                <div className="flex flex-col gap-2 pb-4">
                  <div className="flex gap-2">
                    <div className="flex flex-col w-full bg-muted/40 rounded-md border pt-3 pb-4 px-4 gap-2">
                      <p className="text-[10px] text-muted-foreground">
                        ARRAY STATUS
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-helion-green size-2" />
                        <p className="text-base text-helion-green">OPTIMAL</p>
                      </div>
                    </div>
                    <div className="flex flex-col w-full bg-muted/40 rounded-md border pt-3 pb-4 px-4 gap-2">
                      <p className="text-[10px] text-muted-foreground">
                        CURRENT YIELD
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-base">42.8 MW</p>
                      </div>
                    </div>
                  </div>

                  <ChartBarDefault />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
