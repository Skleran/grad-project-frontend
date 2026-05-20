import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowUp, Compass, TrendingUp } from 'lucide-react';

export default function CoreMechanism() {
  return (
    <div className="w-full flex flex-col gap-7">
      <div className="w-full flex flex-col gap-3">
        {/* description */}
        <h3 className="text-helion-green font-grotesk font-thin">
          CORE MECHANICS
        </h3>
        <p className="text-xl lg:text-5xl font-semibold pb-1">
          Dual-Axis Mechanism
        </p>
        <p className="text-sm md:text-base">
          Precision tracking mechanics designed for high-yield energy harvesting
          across all geographic latitudes.
        </p>
      </div>

      {/* cards */}
      <div className="w-full flex flex-col md:flex-row items-center md:items-stretch gap-5">
        <Card className="w-full max-w-sm flex flex-col hover:bg-helion-green/8 hover:border-helion-green/15 transition-colors">
          <CardHeader>
            <CardTitle className="text-lg mb-2">
              <Compass className="mb-3 size-7.5 stroke-helion-green" />
              Azimuth Tracking
            </CardTitle>
            <CardDescription>
              Precise horizontal rotation following the {"sun's"} path from sunrise
              to sunset with ±0.05° resolution.
            </CardDescription>
          </CardHeader>
          {/* added mt-auto to push footer down */}
          <CardFooter className="mt-auto text-lg font-grotesk text-helion-green">
            360° RANGE
          </CardFooter>
        </Card>

        {/* Card 2: added flex flex-col */}
        <Card className="w-full max-w-sm flex flex-col hover:bg-helion-green/8 hover:border-helion-green/15 transition-colors">
          <CardHeader>
            <CardTitle className="text-lg mb-2">
              <ArrowUp className="mb-3 size-7.5 stroke-helion-green" />
              Elevation Control
            </CardTitle>
            <CardDescription>
              Optimized vertical tilt adjustment to maintain perpendicular solar
              alignment regardless of seasonal shift.
            </CardDescription>
          </CardHeader>
          {/* added mt-auto to push footer down */}
          <CardFooter className="mt-auto text-lg font-grotesk text-helion-green">
            -10° TO 90° TILT
          </CardFooter>
        </Card>

        {/* Card 3: added flex flex-col */}
        <Card className="w-full max-w-sm flex flex-col hover:bg-helion-green/8 hover:border-helion-green/15 transition-colors">
          <CardHeader>
            <CardTitle className="text-lg mb-2">
              <TrendingUp className="mb-3 size-7.5 stroke-helion-green" />
              Maximized Yield
            </CardTitle>
            <CardDescription>
              Achieve significant efficiency gains through active
              algorithm-driven positioning versus static installations.
            </CardDescription>
          </CardHeader>
          {/* added mt-auto to push footer down */}
          <CardFooter className="mt-auto text-lg font-grotesk text-helion-green">
            +31% EFFICIENCY
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
