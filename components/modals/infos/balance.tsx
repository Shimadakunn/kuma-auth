import { useMe } from '@/providers';
import { formatBalance } from '@/utils';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { SendModal } from '../send';
import { Anybody } from 'next/font/google';

const anybody = Anybody({ subsets: ['latin'] });

export function Balance() {
  const [openSend, setOpenSend] = useState(false);
  const { balances } = useMe();

  const totalBalance = parseFloat(balances.balance) + parseFloat(balances.stakedBalance);

  return (
    <div className="flex w-full flex-row items-center justify-between px-6 py-4">
      <div className="">
        <p className="text-sm font-bold text-gray-500">Your Balance</p>
        <p className={`text-4xl font-black ${anybody.className}`}>{totalBalance} USD</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Send
          size={25}
          className="cursor-pointer text-black"
          strokeWidth={3}
          onClick={() => setOpenSend(true)}
        />
      </div>
      <SendModal openSend={openSend} setOpenSend={setOpenSend} />
    </div>
  );
}
