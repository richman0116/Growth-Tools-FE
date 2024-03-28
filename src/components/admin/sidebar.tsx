"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavProps } from "@/navigation";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Image from "next/image";
import AI_SEARCH from "@/assets/images/ai-search.png";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { ChevronLeft, ChevronRight, Minus } from "lucide-react";

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
          {links.map((link, index) =>
            !isFullText && isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      link.href === pathname &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <i className="h-6 w-6">
                      {link?.icon(
                        link.href === pathname ? "#164CD9" : "#636363"
                      )}
                    </i>
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  link.href === pathname && "text-secondary",
                  "justify-start"
                )}
              >
                <i className="mr-2 h-6 w-6">
                  {link?.icon(link.href === pathname ? "#164CD9" : "#636363")}
                </i>
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      link.href === pathname &&
                        "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
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
