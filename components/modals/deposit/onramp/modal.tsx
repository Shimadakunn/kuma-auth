import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useState } from 'react';
import { ApplePay } from './apple-pay';

export function OnrampModal({
  openOnramp,
  setOpenOnramp,
}: {
  openOnramp: boolean;
  setOpenOnramp: (open: boolean) => void;
}) {
  const [amount] = useState(100); // You might want to make this dynamic

  const handlePaymentSuccess = (paymentResult: any) => {
    console.log('Payment successful:', paymentResult);
    setOpenOnramp(false);
  };

  const handlePaymentError = (error: Error) => {
    console.error('Payment failed:', error);
    // Handle error (show error message to user)
  };

  return (
    <Drawer open={openOnramp} onOpenChange={setOpenOnramp}>
      <DrawerContent>
        <DrawerHeader className="p-4">
          <DrawerTitle>Deposit with Apple Pay</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <div className="text-2xl font-bold">${amount.toFixed(2)}</div>
          <ApplePay amount={amount} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
