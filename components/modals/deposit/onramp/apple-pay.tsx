import { Button } from '@/components/ui/button';
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
        currencyCode: 'USD',
        supportedNetworks: ['visa', 'masterCard', 'amex'],
        merchantCapabilities: ['supports3DS'],
        total: {
          label: 'Morpho Deposit',
          amount: amount.toString(),
          type: 'final',
        },
      };

      const session = new window.ApplePaySession(3, paymentRequest);

      session.onvalidatemerchant = async (event: ApplePayValidateMerchantEvent) => {
        try {
          // Here you would typically make an API call to your backend to validate the merchant
          // const merchantSession = await validateMerchant(event.validationURL);
          // session.completeMerchantValidation(merchantSession);
        } catch (err) {
          session.abort();
          onError(err as Error);
        }
      };

      session.onpaymentauthorized = (event: ApplePayPaymentAuthorizedEvent) => {
        // Here you would typically make an API call to process the payment
        // const result = await processPayment(event.payment);

        session.completePayment(
          window.ApplePaySession?.STATUS_SUCCESS ?? ApplePaySession.STATUS_SUCCESS
        );
        onSuccess(event.payment);
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
      onClick={handleApplePayment}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-2">
      {isLoading ? 'Processing...' : <>Pay with Apple Pay</>}
    </Button>
  );
}
