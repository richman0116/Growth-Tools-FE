"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { FileBarChart2, LucideIcon, Zap } from "lucide-react";

const links: { title: string; href: string; Icon: LucideIcon }[] = [
  {
    title: "Trending Tools",
    href: "#",
    Icon: Zap,
  },
  {
    title: "Analytics",
    href: "#",
    Icon: FileBarChart2,
  },
  {
    title: "Design",
    href: "#",
    Icon: FileBarChart2,
  },
  {
    title: "Productivity",
    href: "#",
    Icon: FileBarChart2,
  },
  {
    title: "Email Marketing",
    href: "#",
    Icon: FileBarChart2,
  },
  {
    title: "Social Media",
    href: "#",
    Icon: FileBarChart2,
  },
  {
    title: "Customer Support",
    href: "#",
    Icon: FileBarChart2,
  },
  {
    title: "File Management",
    href: "#",
    Icon: FileBarChart2,
  },
  {
    title: "Project Management",
    href: "#",
    Icon: FileBarChart2,
  },
  {
    title: "SEO",
    href: "#",
    Icon: FileBarChart2,
  },
  {
    title: "Marketing",
    href: "#",
    Icon: FileBarChart2,
  },
  {
    title: "Influencer Management",
    href: "#",
    Icon: FileBarChart2,
  },
  {
    title: "Content",
    href: "#",
    Icon: FileBarChart2,
  },
  {
    title: "Ads Management",
    href: "#",
    Icon: FileBarChart2,
  },
  {
    title: "AI",
    href: "#",
    Icon: FileBarChart2,
  },
];

export function Sidebar() {
  return (
    <NavigationMenu className="min-h-[100vh] border-r-[1px] items-start px-2 py-4">
      <NavigationMenuList className="flex-col gap-2">
        {links.map((link) => (
          <NavigationMenuItem className="w-full" key={link.href}>
            <Link href={link.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} w-full text-sm`}
              >
                <link.Icon className="mr-2" /> {link.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
