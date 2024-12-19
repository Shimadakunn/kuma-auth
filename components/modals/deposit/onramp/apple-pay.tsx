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
      {isLoading ? (
        'Processing...'
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M17.04 21.14c-1.037.537-2.088.744-3.157.744-1.532 0-2.772-.615-3.72-1.85-1.037-1.386-1.556-3.236-1.556-5.553 0-2.317.519-4.167 1.556-5.553.948-1.235 2.188-1.85 3.72-1.85 1.069 0 2.12.207 3.157.744v1.85c-1.037-.537-2.088-.744-3.157-.744-.948 0-1.717.415-2.307 1.235-.759 1.028-1.139 2.463-1.139 4.318s.38 3.29 1.139 4.318c.59.82 1.359 1.235 2.307 1.235 1.069 0 2.12-.207 3.157-.744v1.85z" />
          </svg>
          Pay with Apple Pay
        </>
      )}
    </Button>
  );
}
