/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

import AI_SEARCH from "@/assets/images/ai-search.png";
import { cn } from "@/lib/utils";
import { NavProps } from "@/navigation";
import { ChevronLeft, ChevronRight, InspectionPanelIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useAuthContext } from "@/hooks/AuthContext";
import { useEffect, useState } from "react";
import BrevoModal from "../BrevoModal";

export function Sidebar({
  links,
  isCollapsed,
  onCollapse,
}: Readonly<NavProps>) {
  const { isLoggedIn, isAdmin } = useAuthContext();
  const [sidebarLinks, setSidebarLinks] = useState<Category[]>([]);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      setSidebarLinks(links);
    } else {
      const userLinks = [...links];
      userLinks.pop();
      setSidebarLinks(userLinks)
    }
  }, [isAdmin, isLoggedIn, links]);

  const handleClick = () => {
    setIsOpen(true);
  }

  const navigation = (isFullText?: boolean) => {
    return (
      <>
        <nav className="grid gap-3 py-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {sidebarLinks.map((link, index) =>
            !isFullText && isCollapsed ? (
              <Tooltip key={link.id + index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.handle}
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      link.handle === pathname &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <Image
                      className={cn(
                        "mr-2 h-6 w-6",
                        link.handle === "/trending-tools" && "h-6 w-6 flex justify-center items-center mr-3 px-1 py-[2px]"
                      )}
                      src={link.icon}
                      width={24}
                      height={24}
                      alt={link.description}
                    />
                    <p
                      className={cn(
                        "sr-only font-satoshi",
                        link.handle === "/trending-tools" && "text-gradient font-semibold"
                    )}>{link.name}</p>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  <p
                    className={cn(
                      "font-satoshi",
                      link.handle === "/trending-tools" && "text-gradient font-semibold"
                  )}>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={link.id}
                href={link.handle}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  link.handle === pathname && "text-secondary",
                  "justify-start",
                  link.handle === pathname && "bg-gray-200",
                  link.handle === pathname && "text-gray-700"
                )}
              >
                <Image
                    className={cn(
                      "mr-2 h-6 w-6",
                      link.handle === "/trending-tools" && "h-6 w-6 flex justify-center items-center mr-2 px-1 py-[2px]"
                  )}
                  src={link.icon}
                  width={24}
                  height={24}
                  alt={link.description}
                />
                <p
                  className={cn(
                    "font-satoshi",
                    link.handle === "/trending-tools" && "text-gradient font-semibold"
                )}>{link.name}</p>
              </Link>
            )
          )}
          
        </nav>
        <div className="relative w-full p-4 md:block hidden cursor-pointer" onClick={handleClick}>
          <Image src={AI_SEARCH} alt="" width={500} height={500} style={{width:'auto', height:'auto'}} />
        </div>
        {isOpen && <BrevoModal closeModal={() => setIsOpen(false)} />}
      </>
    );
  };

  return (
    <>
      <div
        onClick={onCollapse}
        className="rounded-full w-8 h-8 border md:flex hidden items-center justify-center absolute top-4 -right-4 z-10 bg-white cursor-pointer"
      >
        {isCollapsed ? (
          <ChevronRight className="w-5" color="#1F6BDA" />
        ) : (
          <ChevronLeft className="w-5" color="#1F6BDA" />
        )}
      </div>
      <div className="md:hidden visible">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <div className="rounded-full w-8 h-8 border md:hidden flex items-center justify-center absolute top-4 -right-4 z-10 bg-white cursor-pointer">
              <ChevronRight className="w-5" color="#1F6BDA" />
            </div>
          </DrawerTrigger>
          <DrawerContent className="w-[80%] h-full rounded-none">
            <DrawerClose>
              <div className="rounded-full w-8 h-8 border md:hidden flex items-center justify-center absolute top-4 -right-4 z-10 bg-white cursor-pointer">
                <ChevronLeft className="w-5" color="#1F6BDA" />
              </div>
            </DrawerClose>

            <div className="mx-3 max-w-sm">{navigation(true)}</div>
          </DrawerContent>
        </Drawer>
      </div>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-2 py-2 data-[collapsed=true]:py-2"
      >
        {navigation()}
      </div>
    </>
  );
}
