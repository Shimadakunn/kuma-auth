'use client';

import { useMe } from '@/providers';
import { ArrowDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Anybody } from 'next/font/google';

const anybody = Anybody({ subsets: ['latin'] });

export function Infos() {
  const [isLoading, setIsLoading] = useState(false);
  const { me, balances, updateBalances } = useMe();
  return (
    <>
      <div className="flex h-[20vh] w-full items-center justify-around gap-4">
        <div className="flex flex-col items-start justify-center">
          <h1 className={`font-bold ${anybody.className}`}>
            <span className="text-4xl">14,24</span>
            <span className="text-2xl">%</span>
          </h1>
          <p className="flex gap-1 text-sm font-bold text-gray-500">
            <ArrowDown className="h-4 w-4" />
            Net APY
          </p>
        </div>
        <div className="flex flex-col items-end justify-center">
          <span className={`pl-1 text-4xl font-bold ${anybody.className}`}>$0.00</span>
          <p className="flex items-center gap-1 text-sm font-bold text-gray-500">
            <TrendingUp className="h-4 w-4" />
            Yield earned
          </p>
        </div>
      </div>
      {/* <div className="flex w-full items-center justify-around gap-4">
        <button
          className="rounded-md border border-gray-500 px-4 py-2 text-black"
          onClick={() => Transaction(me!, '1.5', 'withdraw', setIsLoading, updateBalances)}>
          {isLoading ? 'Withdrawing...' : 'Withdraw'}
        </button>
        <button
          className="rounded-md border border-gray-500 px-4 py-2 text-black"
          onClick={() => Transaction(me!, '1.5', 'supply', setIsLoading, updateBalances)}>
          {isLoading ? 'Supplying...' : 'Supply'}
        </button>
      </div>
      <div className="flex w-full items-center justify-around gap-4">
        <div className="flex flex-col items-start justify-center">
          balance {balances.balance ? formatBalance(balances.balance, 2) : 'NOT LOADED'}
        </div>
        <div className="flex flex-col items-start justify-center">
          staked balance{' '}
          {balances.stakedBalance ? formatBalance(balances.stakedBalance, 2) : 'NOT LOADED'}
        </div>
      </div> */}
    </>
  );
}
