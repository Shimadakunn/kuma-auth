'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Actions() {
  const [creating, setCreating] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();
  return (
    <div className="flex h-[10vh] w-full flex-row items-center justify-center">
      {creating ? (
        <>
          <Button className="mr-4 p-2" onClick={() => setCreating(false)} flat>
            <ChevronLeft size={24} color="black" />
          </Button>
          <input
            type="text"
            placeholder="Username"
            className="h-14 w-[50vw] rounded-lg border-2 bg-transparent px-2 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button className="mb-1 ml-1 flex h-14 items-center justify-center gap-1 bg-main px-3 py-0 text-base text-white">
            Create
            <Image src="/logo.png" alt="logo" width={20} height={20} />
          </Button>
        </>
      ) : (
        <>
          <Button
            className="mr-5 flex h-14 w-[42vw] items-center justify-center gap-1 p-0"
            onClick={() => setCreating(true)}>
            Create
            <Image src="/logo.png" alt="logo" width={25} height={25} />
          </Button>
          <Button
            className="flex h-14 w-[42vw] items-center justify-center gap-1 bg-main p-0 text-white"
            onClick={() => {
              router.push('/home');
            }}>
            Connect
            <Image src="/logo.png" alt="logo" width={25} height={25} />
          </Button>
        </>
      )}
    </div>
  );
}
