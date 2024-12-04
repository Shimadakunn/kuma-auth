"use client";
import { useMe } from "@/providers";
import { useEffect } from "react";

export default function Home() {
  const { create, me } = useMe();

  useEffect(() => {
    window.addEventListener("message", async (event) => {
      if (event.data === "CREATE_ACCOUNT") {
        alert("creating account");
        await create("leo");
        alert("account created");
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: "ACCOUNT_CREATED",
            data: me,
          })
        );
        alert("sent message");
      }
    });
  }, [create, me]);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Hello World</h1>
      <button onClick={() => create("leo")}>Connect</button>
    </div>
  );
}
