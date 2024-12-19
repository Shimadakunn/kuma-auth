'use client';

import {
  AddressModal,
  Deposit,
  Infos,
  OnrampModal,
  SendModal,
  Withdraw,
} from '@/components/modals';

import { Button } from '@/components/ui/button';
import { ArrowDownToLine, ArrowUpToLine, ChartNoAxesGantt } from 'lucide-react';
import { useState } from 'react';

export function Actions() {
  const [openInfo, setOpenInfo] = useState(false);

  const [openDeposit, setOpenDeposit] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openOnramp, setOpenOnramp] = useState(false);

  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [openSend, setOpenSend] = useState(false);

  return (
    <div className="flex h-[15vh] items-start justify-center gap-4 py-2">
      <Button className="h-14 w-14 rounded-full p-0" onClick={() => setOpenInfo(true)} flat>
        <ChartNoAxesGantt size={25} color="black" strokeWidth={2.5} className="mx-auto" />
      </Button>
      <Button
        flat
        className="flex h-14 w-[35vw] items-center gap-1 p-0 text-lg"
        onClick={() => setOpenWithdraw(true)}>
        Withdr.
        <ArrowUpToLine size={20} color="black" strokeWidth={2.5} />
      </Button>
      <Button
        flat
        className="flex h-14 w-[35vw] items-center gap-1 bg-black p-0 text-lg text-white"
        onClick={() => setOpenDeposit(true)}>
        Deposit
        <ArrowDownToLine size={20} color="white" strokeWidth={2.5} />
      </Button>
      <Infos openInfo={openInfo} setOpenInfo={setOpenInfo} />

      {/* DepositModals */}
      <Deposit
        openDeposit={openDeposit}
        setOpenDeposit={setOpenDeposit}
        setOpenAddress={setOpenAddress}
        setOpenOnramp={setOpenOnramp}
      />
      <AddressModal openAddress={openAddress} setOpenAddress={setOpenAddress} />
      <OnrampModal openOnramp={openOnramp} setOpenOnramp={setOpenOnramp} />

      {/* Withdraw Modals */}
      <Withdraw
        openWithdraw={openWithdraw}
        setOpenWithdraw={setOpenWithdraw}
        setOpenSend={setOpenSend}
      />
      <SendModal openSend={openSend} setOpenSend={setOpenSend} />
    </div>
  );
}
