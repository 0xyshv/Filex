"use client"

import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";

// Dynamically import components
const Files = dynamic(() => import('@/components/files'));
const ShareFiles = dynamic(() => import('@/components/shareFile'));

interface ComponentProps {
  walletAddress?: string;
}

const Dashboard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("files");
  const { isConnected, address } = useAccount();
  const router = useRouter();

  let Component: React.ComponentType<ComponentProps>;
  if (activeComponent === "files") {
    Component = Files;
  } else if (activeComponent === "shareFiles") {
    Component = ShareFiles;
  } else {
    // eslint-disable-next-line react/display-name
    Component = () => <div>Select an option from the navbar.</div>;
  }

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [isConnected, router]);

  return (
    <>
      {isConnected && (
        <>
          <Navbar setActiveComponent={setActiveComponent} />
          <main className="px-24 py-8">
            <Component walletAddress={address} />
          </main>
        </>
      )}

    </>
  );
}

export default Dashboard;
