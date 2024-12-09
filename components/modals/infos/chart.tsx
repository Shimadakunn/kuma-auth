import { Area, AreaChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useState } from 'react';
const chartData = [
  { month: 'January', apy: 12.3 },
  { month: 'February', apy: 11.2 },
  { month: 'March', apy: 10.1 },
  { month: 'April', apy: 14.5 },
  { month: 'May', apy: 13.2 },
  { month: 'June', apy: 12.7 },
];

const chartConfig = {
  apy: {
    label: 'APY',
    color: '#556CDE',
  },
} satisfies ChartConfig;

export function Chart() {
  const [period, setPeriod] = useState('1H');
  return (
    <div className="flex h-[30vh] flex-col items-center justify-center">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 4,
          }}>
          <defs>
            <linearGradient id="fillArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#556CDE" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#556CDE" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          /> */}
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
          <Area
            dataKey="apy"
            type="natural"
            fill="url(#fillArea)"
            fillOpacity={1}
            stroke="#556CDE"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
      {/* <div className="flex h-[5vh] w-full items-center justify-center gap-8">
        <button
          className={cn(
            'rounded-full  p-2 text-sm font-bold text-gray-400',
            period === '1H' && 'bg-gray-200 text-gray-800'
          )}
          onClick={() => {
            setPeriod('1H');
          }}>
          1H
        </button>
        <button
          className={cn(
            'rounded-full  p-2 text-sm font-bold text-gray-400',
            period === '1D' && 'bg-gray-200 text-gray-800'
          )}
          onClick={() => {
            setPeriod('1D');
          }}>
          1D
        </button>
        <button
          className={cn(
            'rounded-full  p-2 text-sm font-bold text-gray-400',
            period === '1W' && 'bg-gray-200 text-gray-800'
          )}
          onClick={() => {
            setPeriod('1W');
          }}>
          1W
        </button>
        <button
          className={cn(
            'rounded-full p-2 text-sm font-bold text-gray-400',
            period === '1M' && 'bg-gray-200 text-gray-800'
          )}
          onClick={() => {
            setPeriod('1M');
          }}>
          1M
        </button>
      </div> */}
    </div>
  );
}
