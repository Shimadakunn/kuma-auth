import { formatBalance } from '@/utils';

export function Balance() {
  return (
    <div className="flex h-[25vh] w-auto items-center justify-center">
      <h1 className="px-2 font-[Gaeil] text-7xl font-black">${formatBalance(25.54, 2)}</h1>
    </div>
  );
}
