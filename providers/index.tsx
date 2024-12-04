"use client";

import { saveUser } from "@/lib/factory";
import { getUser } from "@/lib/factory/getUser";
import { WebAuthn } from "@/lib/web-authn/service/web-authn";
import { createContext, useContext, useEffect, useState } from "react";
import { Address, Hex, zeroAddress } from "viem";
import { Chain } from "viem/chains";

export type Me = {
  account: Address;
  keyId: Hex;
  pubKey: {
    x: Hex;
    y: Hex;
  };
};

function useMeHook() {
  const [isLoading, setIsLoading] = useState(false);
  const [me, setMe] = useState<Me | null>();
  const [isReturning, setIsReturning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [chain, switchChain] = useState<Chain | undefined>();

  function disconnect() {
    localStorage.removeItem("passkeys4337.me");
    setMe(null);
  }

  async function create(username: string) {
    console.log("creating user", username);
    setIsLoading(true);

    try {
      const credential = await WebAuthn.create({ username });
      alert(credential);
      if (!credential) {
        return;
      }
      alert("saving user");
      const user = await saveUser({
        id: credential.rawId,
        pubKey: credential.pubKey,
      });

      const me = {
        keyId: user!.id as Hex,
        pubKey: user!.pubKey,
        account: user!.account,
      };

      if (me === undefined) {
        console.log("error while saving user");
        return;
      }

      // Save user data to Firebase
      // const db = firestore;
      // await setDoc(doc(db, "users", me.account.toLowerCase()), {
      //   username,
      //   createdAt: Date.now(),
      //   pubKey: user!.pubKey,
      // });

      localStorage.setItem("passkeys4337.me", JSON.stringify(me));
      localStorage.setItem("passkeys4337.returning", "true");
      setIsReturning(true);
      setMe(me);
    } catch (e) {
      alert(e);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function get() {
    setIsLoading(true);
    try {
      const credential = await WebAuthn.get();
      if (!credential) {
        return;
      }
      const user = await getUser(credential.rawId);

      if (user?.account === undefined || user?.account === zeroAddress) {
        throw new Error("user not found");
      }

      const me = {
        keyId: user.id as Hex,
        pubKey: user.pubKey,
        account: user.account,
      };

      localStorage.setItem("passkeys4337.me", JSON.stringify(me));
      localStorage.setItem("passkeys4337.returning", "true");
      setIsReturning(true);
      setMe(me);
    } catch (e) {
      localStorage.removeItem("passkeys4337.returning");
      disconnect();
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const me = localStorage.getItem("passkeys4337.me");
    const returning = localStorage.getItem("passkeys4337.returning");
    if (me) {
      try {
        setMe(JSON.parse(me));
      } catch (e) {
        console.log("error while parsing me", e);
      }
    }
    if (returning === "true") {
      setIsReturning(true);
    }
    setIsMounted(true);
  }, []);

  return {
    isLoading,
    isMounted,
    me,
    returning: isReturning,
    create,
    get,
    disconnect,
    chain,
    switchChain,
  };
}

type UseMeHook = ReturnType<typeof useMeHook>;
const MeContext = createContext<UseMeHook | null>(null);

export const useMe = (): UseMeHook => {
  const context = useContext(MeContext);
  if (!context) {
    throw new Error("useMeHook must be used within a MeProvider");
  }
  return context;
};

export function MeProvider({ children }: { children: React.ReactNode }) {
  const hook = useMeHook();

  return <MeContext.Provider value={hook}>{children}</MeContext.Provider>;
}
