import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Landmark, QrCode } from 'lucide-react';
import { useState } from 'react';

import { AddressModal } from '@/components/modals/deposit/address';
import { OnrampModal } from '@/components/modals/deposit/onramp';

export function Deposit({
  openDeposit,
  setOpenDeposit,
}: {
  openDeposit: boolean;
  setOpenDeposit: (open: boolean) => void;
}) {
  const [openAddress, setOpenAddress] = useState(false);
  const [openOnramp, setOpenOnramp] = useState(false);
  return (
    <Drawer open={openDeposit} onOpenChange={setOpenDeposit}>
      <DrawerContent className="bottom-4 mx-auto flex w-[90vw] rounded-3xl px-6">
        <DrawerHeader className="py-2">
          <DrawerTitle className="text-2xl font-bold">Deposit</DrawerTitle>
        </DrawerHeader>
        <Button
          flat
          className="mx-auto mb-3 flex h-14 w-full items-center justify-center text-lg font-bold"
          onClick={() => setOpenAddress(true)}>
          <QrCode size={20} color="black" strokeWidth={2.5} className="mr-1" />
          Display Address
        </Button>
        <Button
          flat
          className="mx-auto mb-8 flex h-14 w-full items-center justify-center bg-black text-lg font-bold text-white"
          onClick={() => setOpenOnramp(true)}>
          <Landmark size={20} color="white" strokeWidth={3} className="mr-1" />
          Deposit to Bank
        </Button>
      </DrawerContent>
      <AddressModal openAddress={openAddress} setOpenAddress={setOpenAddress} />
      <OnrampModal openOnramp={openOnramp} setOpenOnramp={setOpenOnramp} />
    </Drawer>
  );
}
