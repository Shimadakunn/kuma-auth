import { Send } from 'lucide-react';

import { tokens } from '@/constants';
import { formatBalance } from '@/utils';

export function Balance() {
  return (
    <div className="flex w-full flex-row items-center justify-between px-6 py-4">
      <div className="">
        <p className="text-sm font-bold text-gray-500">Your Balance</p>
        <div className="flex flex-row items-end justify-start">
          <p className="px-1 font-[Gaeil] text-4xl font-black">
            {formatBalance(Number(tokens.usdc.balance) * Number(tokens.usdc.rate), 2)}{' '}
          </p>
          <p className="ml-1 text-2xl font-black">$US</p>
        </div>
        <p className="ml-1 font-[Gaeil] font-bold text-gray-500">
          {formatBalance(tokens.usdc.balance, 2)} USDC
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Send size={25} className="cursor-pointer text-black" strokeWidth={3} onClick={() => {}} />
      </div>
    </div>
  );
}
