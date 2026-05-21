import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Progress } from '@/components/ui/progress';
import { ScrollReveal, RevealItem } from '@/components/scroll-reveal';

export default function Comparison() {
  return (
    <ScrollReveal className="w-full flex flex-col gap-4">
      {/* headers */}
      <RevealItem delayIndex={0}>
        <div className="w-full flex flex-col gap-3">
          <h3 className="text-helion-green font-grotesk font-thin">
            SYSTEM COMPARISON
          </h3>
          <p className="text-xl lg:text-5xl font-semibold pb-1">
            Efficiency Benchmark
          </p>
        </div>
      </RevealItem>

      {/* content */}
      <div className="w-full flex flex-col sm:flex-row gap-8">
        <RevealItem delayIndex={1} direction="left" className="w-full">
          <div className="w-full flex flex-col gap-8 justify-between sm:justify-start text-sm">
            <p>
              Comparative analysis of Helion dual-axis tracking versus standard
              stationary photovoltaic arrays over a 24-hour cycle.
            </p>
            <div className="w-full flex flex-col gap-6 font-grotesk">
              <Field className="w-full">
                <FieldLabel htmlFor="helion-efficiency">
                  <span className="text-xs font-light">HELION DUAL-AXIS</span>
                  <span className="ml-auto text-xs font-light text-helion-green">
                    97% PEAK
                  </span>
                </FieldLabel>
                <Progress
                  value={97}
                  id="helion-efficiency"
                  className="h-2 **:data-[slot=progress-indicator]:bg-helion-green bg-helion-green/15"
                />
              </Field>

              <Field className="w-full text-muted-foreground">
                <FieldLabel htmlFor="stationary-efficiency">
                  <span className="text-xs font-light">STATIONARY PV</span>
                  <span className="ml-auto text-xs font-light">52% PEAK</span>
                </FieldLabel>
                <Progress
                  value={52.1}
                  id="stationary-efficiency"
                  className="h-2 **:data-[slot=progress-indicator]:bg-muted-foreground"
                />
              </Field>
            </div>
          </div>
        </RevealItem>

        {/* cards */}
        <RevealItem delayIndex={2} direction="right" className="w-full">
          <div className="w-full flex flex-col lg:flex-row gap-5 items-center">
            <Card className="w-full max-w-xs px-3 py-5">
              <CardContent className="flex flex-col gap-3">
                <p className="text-xs text-muted-foreground">NET GAIN</p>
                <p className="text-5xl text-helion-green font-grotesk">+31%</p>
                <p className="text-xs text-muted-foreground">
                  Annualized kWH yield
                </p>
              </CardContent>
            </Card>
            <Card className="w-full max-w-xs px-3 py-5">
              <CardContent className="flex flex-col gap-3">
                <p className="text-xs text-muted-foreground">ROI PERIOD</p>
                <p className="text-5xl font-grotesk">-1.7Y</p>
                <p className="text-xs text-muted-foreground">
                  Versus stationary PV
                </p>
              </CardContent>
            </Card>
          </div>
        </RevealItem>
      </div>
    </ScrollReveal>
  );
}
