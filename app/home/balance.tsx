'use client';

import { useMe } from '@/providers';
import { formatBalance } from '@/utils';
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
      <h1 className={`px-2 text-6xl font-black ${anybody.className}`}>${totalBalance}</h1>
    </div>
  );
}
