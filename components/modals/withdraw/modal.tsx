import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { CreditCard, Send } from 'lucide-react';
import { useState } from 'react';

import { SendModal } from '@/components/modals';

export function Withdraw({
  openWithdraw,
  setOpenWithdraw,
}: {
  openWithdraw: boolean;
  setOpenWithdraw: (open: boolean) => void;
}) {
  const [openSend, setOpenSend] = useState(false);
  return (
    <Drawer open={openWithdraw} onOpenChange={setOpenWithdraw}>
      <DrawerContent className="bottom-4 mx-auto flex w-[90vw] rounded-3xl px-6">
        <DrawerHeader className="py-2">
          <DrawerTitle className="text-2xl font-bold">Withdraw</DrawerTitle>
        </DrawerHeader>
        <Button
          className="mx-auto mb-3 flex h-14 w-full items-center justify-center text-lg font-bold"
          onClick={() => setOpenSend(true)}>
          <Send size={20} color="black" strokeWidth={2.5} className="mr-1" />
          Buy with card
        </Button>
        <Button className="mx-auto mb-8 flex h-14 w-full items-center justify-center bg-main text-lg font-bold text-white">
          <CreditCard size={20} color="white" strokeWidth={3} className="mr-1" />
          Buy with card
        </Button>
      </DrawerContent>
      <SendModal openSend={openSend} setOpenSend={setOpenSend} />
    </Drawer>
  );
}
