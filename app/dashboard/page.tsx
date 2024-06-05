"use client"

import Navbar from "@/components/navbar";
import Upload from "@/components/upload";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";

// Dynamically import components
const Files = dynamic(() => import('@/components/files'));
const ShareFiles = dynamic(() => import('@/components/shareFile'));


const Dashboard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("files");
  const { isConnected } = useAccount();
  const router = useRouter();

  let Component: React.ComponentType;
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
  }, [isConnected]);

  return (
    <>
      {isConnected && (
        <>
          <Navbar setActiveComponent={setActiveComponent} />
          <main className="px-24 py-8">
            <div className="flex justify-between">
              <div></div>
              <Upload />
            </div>
            <div className="flex flex-col gap-12 py-24" >
              <Component />
            </div>
          </main>
        </>
      )}

    </>
  );
}

export default Dashboard;
