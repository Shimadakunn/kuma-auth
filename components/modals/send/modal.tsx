import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

import { Send } from 'lucide-react';
import { SendAction } from './action';

import { tokens } from '@/constants';
import { useState } from 'react';
import { toast } from 'sonner';
import { AddressInput } from './address';
import { AmountView } from './amount';
import { NumPad } from './numpad';

export function SendModal({
  openSend,
  setOpenSend,
}: {
  openSend: boolean;
  setOpenSend: (open: boolean) => void;
}) {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleNumberPress = (value: string) => {
    if (value === 'delete') {
      setAmount((prev) => prev.slice(0, -1));
    } else if (value === '.' && amount.includes('.')) {
    } else if (amount.length >= 6 && value !== 'delete') {
    } else if (value === '0' && amount === '') {
      return;
    } else {
      const newAmount = amount + value;
      const numericAmount = parseFloat(newAmount);

      if (!isNaN(numericAmount) && numericAmount <= Number(tokens.usdc.balance)) {
        setAmount(newAmount);
      } else {
        toast.error('Amount is greater than balance');
      }
    }
  };

  return (
    <Drawer open={openSend} onOpenChange={setOpenSend}>
      <DrawerContent className="bottom-4 mx-auto flex w-[90vw] rounded-3xl">
        {/* Header */}
        <DrawerHeader className="py-2">
          <DrawerTitle className="flex items-center text-2xl font-bold">
            <Send size={20} color="black" strokeWidth={2.5} className="mr-1" />
            Send
          </DrawerTitle>
        </DrawerHeader>
        <AddressInput value={address} onChangeText={setAddress} />
        {/* Amount */}
        <AmountView value={amount} onChangeText={setAmount} />
        {/* Numpad */}
        <NumPad handleNumberPress={handleNumberPress} />
        {/* Address */}

        {/* Footer */}
        <DrawerFooter>
          <SendAction />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
