'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Transaction } from '@/lib/functions';
import { useMe } from '@/providers';
import { useEffect, useState } from 'react';

export function NotStaked() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { me, balances, updateBalances } = useMe();
  useEffect(() => {
    console.log('check balances');
    if (balances.balance !== '0') setOpen(true);
    else setOpen(false);
  }, [updateBalances]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-[90vw] rounded-xl border-2 border-black">
        <AlertDialogHeader>
          <AlertDialogTitle>{balances.balance} USDC Not Staked</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          You have {balances.balance} USDC not staked. Please stake your tokens to start earning
          rewards.
        </AlertDialogDescription>
        <AlertDialogFooter className="p-2">
          <Button
            className="h-12 w-full text-xl"
            onClick={() =>
              Transaction(me!, balances.balance, 'supply', setIsLoading, updateBalances)
            }>
            {isLoading ? 'Staking...' : 'Stake'}
          </Button>
          <AlertDialogCancel className="h-12 w-full text-xl">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
