'use client';

import { useMe } from '@/providers';

import { useState } from 'react';

export function Balance() {
  const { balances, updateBalances } = useMe();
  const [open, setOpen] = useState(false);

  const totalBalance = parseFloat(balances.balance) + parseFloat(balances.stakedBalance);

  return (
    <div className="flex h-[20vh] w-auto items-center justify-center">
      <h1 className="px-2 font-[Gaeil] text-7xl font-black">
        {/* ${balances.balance ? formatBalance(totalBalance) : 'NOT LOADED'} */}
        $5,456.97
      </h1>
    </div>
  );
}
