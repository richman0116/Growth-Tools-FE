"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavProps } from "@/navigation";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function Sidebar({ links, isCollapsed }: Readonly<NavProps>) {
  const pathname = usePathname();

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-3 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
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
                  <i className="mr-2 h-6 w-6">
                    {link?.icon(link.href === pathname ? "#164CD9" : "#636363")}
                  </i>
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
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
                    link.href === pathname && "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
