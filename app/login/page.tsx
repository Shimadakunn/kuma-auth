import Image from 'next/image';
import { Actions } from './actions';
export default function Home() {
  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center">
      <div className="flex h-[10vh] items-center justify-center gap-1">
        <Image src="/morpho.svg" alt="logo" width={40} height={40} />
        <h1 className="text-4xl font-black">Morpho</h1>
      </div>
      <Image
        src="/illustration.png"
        alt="logo"
        width={1000}
        height={1000}
        className="h-[60vh] w-full object-cover "
      />
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
