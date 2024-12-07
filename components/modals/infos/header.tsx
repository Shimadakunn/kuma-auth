import dynamic from 'next/dynamic';

const LottiePlayer = dynamic(() => import('lottie-react'), {
  ssr: false,
});

import Image from 'next/image';
import { useRef } from 'react';

import verifiedAnimation from '@/public/animation/verified.json';
import { LottieRefCurrentProps } from 'lottie-react';
import { tokens } from '@/constants';

export function Header() {
  const animationRef = useRef<LottieRefCurrentProps>(null);

  return (
    <div className="flex w-full flex-row items-end justify-between px-6 py-4">
      <div className="flex flex-col items-start justify-between">
        <Image
          src={tokens.usdc.icon}
          alt="USDC Token"
          width={56}
          height={56}
          className="h-14 w-14"
        />
        <div className="flex flex-row items-center justify-center gap-1">
          <h2 className="mt-1 text-xl font-bold">Morpho Labs Vault</h2>
          <div className="mt-1">
            <LottiePlayer
              lottieRef={animationRef}
              animationData={verifiedAnimation}
              loop={true}
              autoplay={true}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col items-end justify-end">
        {/* <h1 className="px-1 font-black text-gray-500">
          <span className="font-[Gaeil] text-xl ">+24</span>
          <span className="text-sm">%</span>
        </h1> */}
        <h1 className="px-1 font-black">
          <span className="font-[Gaeil] text-3xl">12,4</span>
          <span className="text-xl">%</span>
        </h1>
      </div>
    </div>
  );
}