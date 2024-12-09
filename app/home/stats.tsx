'use client';

import { useMe } from '@/providers';
import { ArrowDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export function Infos() {
  const [isLoading, setIsLoading] = useState(false);
  const { me, balances, updateBalances } = useMe();
  return (
    <>
      <div className="flex h-[20vh] w-full items-center justify-around gap-4">
        <div className="flex flex-col items-start justify-center">
          <h1 className="font-black">
            <span className="font-[Gaeil] text-5xl">12,4</span>
            <span className="text-3xl">%</span>
          </h1>
          <p className="flex gap-1 text-sm font-bold text-gray-500">
            <ArrowDown className="h-4 w-4" />
            Net APY
          </p>
        </div>
        <div className="flex flex-col items-end justify-center">
          <span className="pl-1 font-[Gaeil] text-5xl">$254.32</span>
          <p className="flex items-center gap-1 text-sm font-bold text-gray-500">
            <TrendingUp className="h-4 w-4" />
            Yield earned
          </p>
        </div>
      </div>
      {/* <div className="flex w-full items-center justify-around gap-4">
        <button
          className="rounded-md border border-gray-500 px-4 py-2 text-black"
          onClick={() => Transaction(me!, '1', 'withdraw', setIsLoading, updateBalances)}>
          {isLoading ? 'Withdrawing...' : 'Withdraw'}
        </button>
        <button
          className="rounded-md border border-gray-500 px-4 py-2 text-black"
          onClick={() => Transaction(me!, '1', 'supply', setIsLoading, updateBalances)}>
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
