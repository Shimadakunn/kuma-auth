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

import successAnimation from '@/public/animation/success.json';
import dynamic from 'next/dynamic';

const LottiePlayer = dynamic(() => import('lottie-react'), {
  ssr: false,
});

import { LottieRefCurrentProps } from 'lottie-react';

export function NotStaked() {
  const animationRef = useRef<LottieRefCurrentProps>(null);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>('success');
  const { me, balances, updateBalances } = useMe();

  useEffect(() => {
    if (balances.balance !== '0') setOpen(true);
    else setOpen(false);
  }, [balances.balance]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-[95vw] rounded-xl border-2 border-black">
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-2">
            {/* <LottiePlayer
              lottieRef={animationRef}
              animationData={loadingAnimation}
              loop={true}
              autoplay={true}
              style={{
                width: 200,
                height: 200,
              }}
              className="mx-auto"
            /> */}
            <video width="200" autoPlay muted loop playsInline>
              <source src="/shape1.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <h1 className="text-center text-2xl font-bold">Loading...</h1>
          </div>
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
            <h1 className="text-center text-2xl font-bold">Success!</h1>
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
            <h1 className="text-center text-2xl font-bold">An error occurred</h1>
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
              <AlertDialogTitle>You have received {balances.balance} USD</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Please click on the button below to start earning interest.
            </AlertDialogDescription>
            <AlertDialogFooter className="p-2">
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
                {isLoading ? 'Loading...' : 'Earn'}
              </Button>
              <AlertDialogCancel className="h-12 w-full text-xl">Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
