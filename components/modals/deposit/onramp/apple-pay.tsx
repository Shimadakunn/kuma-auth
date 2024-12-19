import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';

// Add type definitions for Apple Pay
declare global {
  interface Window {
    ApplePaySession?: typeof ApplePaySession;
  }
}

interface ApplePayValidateMerchantEvent {
  validationURL: string;
}

interface ApplePayPaymentAuthorizedEvent {
  payment: {
    token: {
      paymentData: any;
      paymentMethod: any;
      transactionIdentifier: string;
    };
  };
}

interface ApplePayProps {
  amount: number;
  onSuccess: (paymentResult: any) => void;
  onError: (error: Error) => void;
}

// Add these mock functions at the top of the file
const mockValidateMerchant = async (validationURL: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return mock merchant session
  return {
    merchantIdentifier: 'merchant.io.booklet',
    merchantSessionIdentifier: 'SSH2EJ8DUPLICATED',
    nonce: '123456789',
    domainName: 'booklet.io',
    displayName: 'Booklet',
    signature: 'mockSignature123',
  };
};

const mockProcessPayment = async (payment: any) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Return mock payment result
  return {
    status: 'success',
    transactionId: 'mock_' + Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
  };
};

export function ApplePay({ amount, onSuccess, onError }: ApplePayProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleApplePayment = async () => {
    if (!window.ApplePaySession?.canMakePayments()) {
      onError(new Error('Apple Pay is not available'));
      return;
    }

    setIsLoading(true);

    try {
      const paymentRequest: ApplePayJS.ApplePayPaymentRequest = {
        countryCode: 'US',
        currencyCode: 'EUR',
        supportedNetworks: ['visa', 'masterCard', 'amex'],
        merchantCapabilities: ['supports3DS'],
        total: {
          label: 'booklet.io',
          amount: amount.toString(),
          type: 'final',
        },
      };

      const session = new window.ApplePaySession(3, paymentRequest);

      session.onvalidatemerchant = async (event: ApplePayValidateMerchantEvent) => {
        try {
          // Replace comment with mock validation
          const merchantSession = await mockValidateMerchant(event.validationURL);
          session.completeMerchantValidation(merchantSession);
        } catch (err) {
          session.abort();
          onError(err as Error);
        }
      };

      session.onpaymentauthorized = async (event: ApplePayPaymentAuthorizedEvent) => {
        try {
          // Replace comment with mock processing
          const result = await mockProcessPayment(event.payment);

          session.completePayment(ApplePaySession.STATUS_SUCCESS);
          onSuccess(result);
        } catch (err) {
          session.completePayment(ApplePaySession.STATUS_FAILURE);
          onError(err as Error);
        }
      };

      session.begin();
    } catch (error) {
      onError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      flat
      onClick={handleApplePayment}
      disabled={isLoading}
      className="flex w-[95%] items-center justify-center gap-2 text-xl">
      {isLoading ? (
        'Processing...'
      ) : (
        <>
          <Image src="/apple.png" alt="Apple Pay" width={20} height={20} />
          Apple Pay
        </>
      )}
    </Button>
  );
}
