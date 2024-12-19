'use client';

import { NumberIncrement } from '@/components/ui/number-increment';

import { useMe } from '@/providers';
import { Anybody } from 'next/font/google';
const anybody = Anybody({ subsets: ['latin'] });

export function Balance() {
  const { balances } = useMe();

  const totalBalance = parseFloat(balances.balance) + parseFloat(balances.stakedBalance);

  return (
    <div className="flex h-[20vh] w-auto items-center justify-center">
      {/* <h1 className="px-2 font-[Gaeil] text-7xl font-black ">
        ${balances.balance ? formatBalance(totalBalance) : 'NOT LOADED'}
      </h1> */}
      <h1 className={`px-2 text-6xl font-black ${anybody.className}`}>
        $<NumberIncrement value={2550.5} decimalPlaces={2} delay={2} from={2500} />
      </h1>
    </div>
  );
}
