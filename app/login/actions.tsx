'use client';

import { Button } from '@/components/ui/button';
import { useMe } from '@/providers';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Actions() {
  const [creating, setCreating] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();
  const { me, create, get } = useMe();
  return (
    <div className="flex h-[10vh] w-full flex-row items-start justify-center ">
      {creating ? (
        <>
          <Button
            className="flex items-center justify-center gap-1 pl-2 pr-3 text-base font-bold"
            onClick={() => setCreating(false)}
            flat>
            <ChevronLeft size={24} color="black" />
            Back
          </Button>
          {/* <input
            type="text"
            placeholder="Username"
            className="h-14 w-[50vw] rounded-lg border-2 bg-transparent px-2 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /> */}
          <Button
            flat
            className="ml-2 flex w-[60vw] items-center justify-center gap-1 bg-black text-base text-white"
            onClick={async () => {
              await create('booklet');
            }}>
            Create
            <Sparkles size={20} color="white" />
          </Button>
        </>
      ) : (
        <>
          <Button
            flat
            className="flex items-center justify-center gap-1  text-base font-bold "
            onClick={async () => {
              await get();
            }}>
            Connect
          </Button>
          <Button
            flat
            className="ml-2 flex w-[60vw] items-center justify-center gap-2 bg-black text-base font-bold text-white"
            onClick={() => setCreating(true)}>
            Get started
            <ArrowRight size={20} color="white" />
          </Button>
        </>
      )}
    </div>
  );
}
