"use client"

import Download from "@/components/download";
import Navbar from "@/components/navbar";
import Share from "@/components/share";
import Upload from "@/components/upload";
import View from "@/components/view";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";


export default function Dashboard() {
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
      {isConnected && (
        <>
          <Navbar />
          <main className="px-24 py-8">
            <div className="flex justify-between">
              <div></div>
              <Upload />
            </div>
            <div className="flex flex-col gap-12 py-24" >
              <View />
              <Download />
              <Share />
            </div>
          </main>
        </>
      )}

    </>
  );
}
