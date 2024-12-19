import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Landmark } from 'lucide-react';
import { Anybody } from 'next/font/google';
import { useState } from 'react';
import { toast } from 'sonner';
import { ApplePay } from './apple-pay';
const anybody = Anybody({ subsets: ['latin'] });

export function OnrampModal({
  openOnramp,
  setOpenOnramp,
}: {
  openOnramp: boolean;
  setOpenOnramp: (open: boolean) => void;
}) {
  const [amount] = useState(2500);

  const handlePaymentSuccess = (paymentResult: any) => {
    console.log('Payment successful:', paymentResult);
    toast.success('Payment processed successfully!');
    setOpenOnramp(false);
  };

  const handlePaymentError = (error: Error) => {
    console.error('Payment failed:', error);
    toast.error('Payment failed: ' + error.message);
  };

  return (
    <Drawer open={openOnramp} onOpenChange={setOpenOnramp}>
      <DrawerContent className="h-[50vh]">
        <DrawerHeader className="p-4">
          <DrawerTitle className="text-2xl font-black">Deposit</DrawerTitle>
        </DrawerHeader>
        <div className="flex h-full flex-col items-center justify-around gap-4 p-4">
          <div className="flex w-full items-center justify-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-[3px] pb-[3px] text-2xl font-black">
              -
            </div>
            <div className={`text-5xl font-black ${anybody.className} pt-1`}>$2500</div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-[3px] pb-[3px] text-2xl font-black">
              +
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <ApplePay
              amount={amount}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
            <Button flat className="w-[95%] gap-1 text-xl">
              <Image src="/google.png" alt="Google Pay" width={20} height={20} />
              Google Pay
            </Button>
            <Button flat className="w-[95%] gap-1 bg-black text-xl text-white">
              <Landmark className="h-5 w-5" strokeWidth={2.5} color="white" />
              Bank transfer
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
