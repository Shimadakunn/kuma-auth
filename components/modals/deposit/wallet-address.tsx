import { Copy } from 'lucide-react';
import { toast } from 'sonner';
export function WalletAddress() {
  const walletAddress = '0x23...009090789';

  const handleCopy = async () => {
    console.log('Copying to clipboard...');
    try {
      toast.success('Copied to clipboard');
      await navigator.clipboard.writeText(walletAddress);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div>
      <h2 className="font-lexend text-center text-xl font-bold">Wallet Address</h2>
      <div className="mb-6 flex items-center justify-center gap-2">
        <span className="font-lexend text-center text-lg font-bold text-gray-500">
          {walletAddress}
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(walletAddress);
            toast.success('Copied to clipboard');
          }}
          className="transition-opacity hover:opacity-80">
          <Copy size={15} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}
