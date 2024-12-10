'use client';

import { useMe } from '@/providers';
import { Settings } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  const { me, disconnect } = useMe();
  return (
    <div className="flex h-[10vh] items-center justify-between gap-1 px-6">
      <div className="flex items-center gap-1">
        <Image src="/morpho.svg" alt="logo" width={25} height={25} />
        <h1 className="text-2xl font-black">Morpho</h1>
      </div>
      <div
        onClick={() => {
          disconnect();
        }}>
        <Settings />
      </div>
    </div>
  );
}
