"use client"

import { ConnectKitButton } from "connectkit";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [isConnected]);

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex items-center gap-20">
          <div className="flex gap-2 items-center">
            {/* logo of app */}
            <h1 className="text-2xl font-bold relative mr-12 ">
              FileX
            </h1>
          </div>
        </div>
        <ConnectKitButton showBalance showAvatar />
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {!isConnected && (
          <div className="text-xl font-semibold">
            Please connect your wallet to continue. 😊
          </div>
        )}
      </main>
    </>
  );
}
