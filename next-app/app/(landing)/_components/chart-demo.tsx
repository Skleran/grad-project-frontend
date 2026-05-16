'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

export const description = 'A bar chart';

const chartData = [
  { month: 'January', kilowatt: 186 },
  { month: 'February', kilowatt: 305 },
  { month: 'March', kilowatt: 237 },
  { month: 'April', kilowatt: 73 },
  { month: 'May', kilowatt: 209 },
  { month: 'June', kilowatt: 214 },
];

const chartConfig = {
  kilowatt: {
    label: 'Kilowatts',
    color: 'var(--helion-green)',
  },
} satisfies ChartConfig;

export function ChartBarDefault() {
  return (
    <Card className="bg-muted rounded-md ring-0 border">
      <CardHeader>
        <CardTitle>Energy Generation</CardTitle>
        <CardDescription>January - June 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="kilowatt"
              fill="var(--color-kilowatt)"
              radius={8}
              className="fill-helion-green/60 hover:fill-helion-green transition-colors ease-in duration-50"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Yield up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Gross kilowatt-hours recorded per automated cycle
        </div>
      </CardFooter>
    </Card>
  );
}
