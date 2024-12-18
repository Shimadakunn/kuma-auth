'use client';

import { Area, AreaChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { useState } from 'react';
// const chartData = [
//   { month: 'January', balance: 10.5 },
//   { month: 'February', balance: 11.2 },
//   { month: 'March', balance: 12.1 },
//   { month: 'April', balance: 13.4 },
//   { month: 'May', balance: 14.3 },
//   { month: 'June', balance: 15.2 },
// ];

const chartData = [
  { month: 'January', balance: 10 },
  { month: 'February', balance: 10 },
  { month: 'March', balance: 10 },
  { month: 'April', balance: 10 },
  { month: 'May', balance: 10 },
  { month: 'June', balance: 10 },
];

const chartConfig = {
  balance: {
    label: 'Balance',
    color: '#000',
  },
} satisfies ChartConfig;

export function Chart() {
  const [period, setPeriod] = useState('1H');
  return (
    <div className="flex h-[35vh] flex-col items-center justify-center ">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 4,
          }}>
          <defs>
            <linearGradient id="fillArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#000" stopOpacity={0} />
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
            dataKey="balance"
            type="natural"
            fill="url(#fillArea)"
            fillOpacity={1}
            stroke="#000"
            strokeWidth={0}
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
      <div className="flex h-[5vh] w-full items-center justify-center gap-8">
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
      </div>
    </div>
  );
}
