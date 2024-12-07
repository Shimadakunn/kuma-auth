import { ArrowDown, TrendingUp } from 'lucide-react';

export function Infos() {
  return (
    <div className="flex h-[20vh] items-center justify-around gap-4">
      <div className="flex flex-col items-start justify-center">
        <h1 className="px-1 font-black">
          <span className="font-[Gaeil] text-5xl">12,4</span>
          <span className="text-3xl">%</span>
        </h1>
        <p className="flex gap-1 text-sm font-bold text-gray-500">
          <ArrowDown className="h-4 w-4" />
          Net APY
        </p>
      </div>
      <div className="flex flex-col items-end justify-center">
        <h1 className="px-1 font-black">
          <span className="font-[Gaeil] text-5xl">$123</span>
        </h1>
        <p className="flex items-center gap-1 text-sm font-bold text-gray-500">
          <TrendingUp className="h-4 w-4" />
          Yield earned
        </p>
      </div>
    </div>
  );
}
