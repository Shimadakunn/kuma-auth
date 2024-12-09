import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { CreditCard } from 'lucide-react';

import { Chain } from './chain';
import { QRCode } from './qrcode';
import { WalletAddress } from './wallet-address';

export function Deposit({
  openDeposit,
  setOpenDeposit,
}: {
  openDeposit: boolean;
  setOpenDeposit: (open: boolean) => void;
}) {
  return (
    <Drawer open={openDeposit} onOpenChange={setOpenDeposit}>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader className="h-0 p-0">
          <DrawerTitle className="h-0 p-0"></DrawerTitle>
        </DrawerHeader>
        <div className="relative flex h-full w-full flex-col items-center justify-center">
          <WalletAddress />
          <QRCode />
          <Chain />
        </div>
        <DrawerFooter className="pb-8 pt-2">
          <DrawerClose asChild>
            <Button className="mx-auto flex h-14 w-[75%] items-center justify-center bg-main text-lg font-bold text-white">
              <CreditCard size={35} color="white" strokeWidth={3} className="ml-2 py-2" />
              Buy with card
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
