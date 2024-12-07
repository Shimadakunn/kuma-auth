'use client';

import { Deposit } from '@/components/modals/deposit';
import { Infos } from '@/components/modals/infos';
import { Withdraw } from '@/components/modals/withdraw';
import { Button } from '@/components/ui/button';
import { ChartNoAxesGantt, CreditCard } from 'lucide-react';
import { useState } from 'react';

export function Actions() {
  const [openInfo, setOpenInfo] = useState(false);
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  return (
    <div className="flex h-[15vh] items-center justify-center gap-4">
      <Button className="h-14 w-14 rounded-full p-0" onClick={() => setOpenInfo(true)}>
        <ChartNoAxesGantt size={25} color="black" strokeWidth={2.5} className="mx-auto" />
      </Button>
      <Button
        className="flex h-14 w-[35vw] items-center gap-1 p-0 text-lg"
        onClick={() => setOpenWithdraw(true)}>
        Withdr.
        <CreditCard size={20} color="black" strokeWidth={2.5} />
      </Button>
      <Button
        className="flex h-14 w-[35vw] items-center gap-1 bg-main p-0 text-lg text-white"
        onClick={() => setOpenDeposit(true)}>
        Deposit
        <CreditCard size={20} color="white" strokeWidth={2.5} />
      </Button>
      <Infos openInfo={openInfo} setOpenInfo={setOpenInfo} />
      <Deposit openDeposit={openDeposit} setOpenDeposit={setOpenDeposit} />
      <Withdraw openWithdraw={openWithdraw} setOpenWithdraw={setOpenWithdraw} />
    </div>
  );
}
