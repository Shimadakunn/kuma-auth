import { Anybody } from 'next/font/google';
import Image from 'next/image';
import { Actions } from './actions';

const anybody = Anybody({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center">
      <div className="flex h-[10vh] items-center justify-center gap-1">
        <Image src="/logo.png" alt="logo" width={35} height={35} />
        <h1 className={`text-4xl font-black ${anybody.className} pt-2`}>booklet</h1>
      </div>
      <video width="800" height="240" autoPlay muted loop playsInline>
        <source src="/shine.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="flex h-[15vh] w-full items-center justify-center">
        <h1 className="text-3xl font-black">
          Unlock the Future of <br />
          Decentralized Finance
        </h1>
      </div>
      <Actions />
    </div>
  );
}
