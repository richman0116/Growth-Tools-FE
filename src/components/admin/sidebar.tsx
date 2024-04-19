/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

import AI_SEARCH from "@/assets/images/ai-search.png";
import { cn } from "@/lib/utils";
import { NavProps } from "@/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { buttonVariants } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function Sidebar({
  links,
  isCollapsed,
  onCollapse,
}: Readonly<NavProps>) {
  const pathname = usePathname();
  const navigation = (isFullText?: boolean) => {
    return (
      <>
        <nav className="grid gap-3 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link) =>
            !isFullText && isCollapsed ? (
              <Tooltip key={link.handle} delayDuration={0}>
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
                    {/* <i className="h-6 w-6">
                      {link?.icon(
                        link.href === pathname ? "#164CD9" : "#636363"
                      )}
                    </i> */}
                    <span className="sr-only">{link.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.name}
                  {link.description && (
                    <span className="ml-auto text-muted-foreground">
                      {link.description}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={link.handle}
                href={`/category/${link.handle}`}
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
                {/* <i className="mr-2 h-6 w-6">
                  {link?.icon(link.href === pathname ? "#164CD9" : "#636363")}
                </i> */}
                <img className="mr-2 h-6 w-6" src={link.icon} alt={link.description} />
                {link.name}
                {/* {link.description && (
                  <span
                    className={cn(
                      "ml-auto",
                      link.handle === pathname &&
                        "text-background dark:text-white"
                    )}
                  >
                    {link.description}
                  </span>
                )} */}
              </Link>
            )
          )}
        </nav>
        <div className="relative w-full p-4 md:block hidden">
          <Image src={AI_SEARCH} alt="" width={500} height={500} />
        </div>
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
