"use client";
import { Button } from "@/components/ui/button";
import { useMe } from "@/providers";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Create a separate component for the content that uses useSearchParams
function CreateAccount() {
  const { create, me } = useMe();
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "";

  const connect = async () => {
    await create(username);
    if (me) {
      const appRedirectUrl = `kuma://home?address=${me.account}`;
      window.location.href = appRedirectUrl;
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="h-[100vh] w-full flex flex-col items-center justify-between border relative">
      <div className=" w-full h-16 flex items-center justify-start px-4">
        <h1 className="text-2xl font-black">Morpho Labs</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="font-black text-4xl">Create Account</h1>
        {username && (
          <p className="text-sm text-muted-foreground">
            Sign with Passkey to create account:
            <span className="font-bold">{username}</span>
          </p>
        )}
      </div>
      <div className="w-full h-16 flex items-center justify-center mb-8">
        <Button
          onClick={connect}
          className="h-14 w-[42vw] rounded-lg text-white text-2xl font-black border-2 border-black p-0"
        >
          Create
        </Button>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateAccount />
    </Suspense>
  );
}
