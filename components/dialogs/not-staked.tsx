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
import { useEffect, useRef, useState } from 'react';

import loadingAnimation from '@/public/animation/loading.json';
import successAnimation from '@/public/animation/success.json';
import dynamic from 'next/dynamic';

const LottiePlayer = dynamic(() => import('lottie-react'), {
  ssr: false,
});

import { AlertDialogAction } from '@radix-ui/react-alert-dialog';
import { LottieRefCurrentProps } from 'lottie-react';

export function NotStaked() {
  const animationRef = useRef<LottieRefCurrentProps>(null);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const { me, balances, updateBalances } = useMe();
  useEffect(() => {
    if (balances.balance !== '0') setOpen(true);
    else setOpen(false);
  }, [balances.balance]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-[90vw] rounded-xl border-2 border-black">
        {isLoading && (
          <>
            <LottiePlayer
              lottieRef={animationRef}
              animationData={loadingAnimation}
              loop={true}
              autoplay={true}
              style={{
                width: 200,
                height: 200,
              }}
              className="mx-auto"
            />
            <h1 className="text-center text-2xl font-bold">Sending transaction...</h1>
          </>
        )}
        {success === 'success' && (
          <>
            <LottiePlayer
              lottieRef={animationRef}
              animationData={successAnimation}
              loop={true}
              autoplay={true}
              style={{
                width: 200,
                height: 200,
              }}
              className="mx-auto"
            />
            <h1 className="text-center text-2xl font-bold">Transaction successful!</h1>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Button
                  className="h-12 w-full text-xl"
                  flat
                  onClick={() =>
                    Transaction(
                      me!,
                      balances.balance,
                      'supply',
                      setIsLoading,
                      updateBalances,
                      setSuccess
                    )
                  }>
                  Close
                </Button>
              </AlertDialogCancel>
            </AlertDialogFooter>
          </>
        )}
        {success === 'error' && (
          <>
            <h1 className="text-center text-2xl font-bold">Transaction failed</h1>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Button
                  className="h-12 w-full text-xl"
                  flat
                  onClick={() =>
                    Transaction(
                      me!,
                      balances.balance,
                      'supply',
                      setIsLoading,
                      updateBalances,
                      setSuccess
                    )
                  }>
                  Close
                </Button>
              </AlertDialogCancel>
            </AlertDialogFooter>
          </>
        )}
        {!isLoading && success === null && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>{balances.balance} USDC Not Staked</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              You have {balances.balance} USDC not staked. Please stake your tokens to start earning
              rewards.
            </AlertDialogDescription>
            <AlertDialogFooter className="p-2">
              <AlertDialogAction>
                <Button
                  className="h-12 w-full text-xl"
                  flat
                  onClick={() =>
                    Transaction(
                      me!,
                      balances.balance,
                      'supply',
                      setIsLoading,
                      updateBalances,
                      setSuccess
                    )
                  }>
                  {isLoading ? 'Staking...' : 'Stake'}
                </Button>
              </AlertDialogAction>
              <AlertDialogCancel className="h-12 w-full text-xl">Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
