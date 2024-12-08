import { Coins, HandCoins, Info, Link } from 'lucide-react';
import Image from 'next/image';

import { chains } from '@/constants';

const Supply = () => {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row items-center justify-center gap-1">
        <Coins size={13} color="black" strokeWidth={2.5} />
        <p className="text-sm font-bold">Total Supply</p>
        <Info size={13} className="text-gray-500" strokeWidth={2.5} />
      </div>
      <div className="flex flex-row items-center justify-center">
        <p className="pl-1 font-[Gaeil] text-xl font-black">$285.21</p>
        <p className="mt-1 text-sm font-black">M</p>
      </div>
    </div>
  );
};

const Liquidity = () => {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row items-center justify-center gap-1">
        <HandCoins size={13} color="black" strokeWidth={2.5} />
        <p className="text-sm font-bold">Total Liquidity</p>
        <Info size={13} className="text-gray-500" strokeWidth={2.5} />
      </div>

      <div className="flex flex-row items-center justify-center">
        <p className="pl-1 font-[Gaeil] text-xl font-black">$23.82</p>
        <p className="mt-1 text-sm font-black">M</p>
      </div>
    </div>
  );
};

const Token = () => {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row items-center justify-center gap-1">
        <Link size={13} color="black" strokeWidth={2.5} />
        <p className="text-sm font-bold">Chain</p>
        <Info size={13} className="text-gray-500" strokeWidth={2.5} />
      </div>
      <Image
        src={chains.arbitrum.icon}
        alt="Token icon"
        width={24}
        height={24}
        className="h-6 w-6"
      />
    </div>
  );
};

export function Informations() {
  return (
    <div className="flex w-full flex-col px-6 py-4">
      <p className="text-sm font-bold text-gray-500">Vault Information</p>
      <Supply />
      <Liquidity />
      <Token />
    </div>
  );
}
