import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
import { ChartBarDefault } from './chart-demo';

export default function DashboardCallout() {
  return (
    <div className="w-full flex flex-col gap-3">
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
            high-fidelity interface. Real-time telemetry, predictive maintenance
            alerts, and historical performance mapping.
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
                  <div className="bg-red-800/35 size-3 border border-red-800 rounded-full" />
                  <div className="bg-yellow-800/35 size-3 border border-yellow-800 rounded-full" />
                  <div className="bg-green-800/35 size-3 border border-green-800 rounded-full" />
                </div>
                <p className="text-xs text-muted-foreground">
                  HELION DASHBOARD
                </p>
              </div>

              <Separator />

              <div className="flex flex-col gap-2 pb-4">
                <div className="flex gap-2">
                  <div className="flex flex-col w-full bg-muted rounded-md border pt-3 pb-4 px-4 gap-2">
                    <p className="text-[10px] text-muted-foreground">
                      ARRAY STATUS
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-helion-green size-2" />
                      <p className="text-base text-helion-green">OPTIMAL</p>
                    </div>
                  </div>
                  <div className="flex flex-col w-full bg-muted rounded-md border pt-3 pb-4 px-4 gap-2">
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
  );
}

/* Gradient */

// position: absolute;
// left: 0px;
// right: 0px;
// top: 1px;
// bottom: 1px;

// background: radial-gradient(70.71% 70.71% at 50% 50%, rgba(0, 255, 65, 0.0828) 0%, rgba(18, 20, 20, 0.23) 63.46%, rgba(18, 20, 20, 0.23) 100%);

// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;
// z-index: 0;

// Buttons

// width: 12px;
// height: 12px;

// background: rgba(239, 68, 68, 0.2);
// border: 1px solid rgba(239, 68, 68, 0.5);
// border-radius: 9999px;

// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;
