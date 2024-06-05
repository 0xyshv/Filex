"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ConnectKitButton } from "connectkit";

interface NavbarProps {
  setActiveComponent: (component: string) => void;
}


const Navbar: React.FC<NavbarProps> = ({ setActiveComponent }) => {
  const pathname = usePathname()
  return (
    <div className="flex justify-between p-4">
      <div className="flex items-center gap-20">
        <div className="flex gap-2 items-center">
          {/* logo of app */}
          <h1 className="text-2xl font-bold relative mr-12 ">
            FileX
          </h1>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem >
              <NavigationMenuTrigger onClick={() => setActiveComponent("files")}>
                My Files
              </NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger onClick={() => setActiveComponent("shareFiles")}>
                Share Files
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <ConnectKitButton showBalance showAvatar />
    </div>
  )
}

export default Navbar