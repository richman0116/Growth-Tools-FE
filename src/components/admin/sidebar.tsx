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
import {
  Bot,
  Cast,
  Contact,
  FileBarChart2,
  FileCode2,
  Folder,
  Hash,
  Headset,
  ListTodo,
  LucideIcon,
  MailOpen,
  PencilRuler,
  SquareGanttChart,
  SquarePlay,
  Target,
  Zap,
} from "lucide-react";

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
    Icon: PencilRuler,
  },
  {
    title: "Productivity",
    href: "#",
    Icon: ListTodo,
  },
  {
    title: "Email Marketing",
    href: "#",
    Icon: MailOpen,
  },
  {
    title: "Social Media",
    href: "#",
    Icon: Hash,
  },
  {
    title: "Customer Support",
    href: "#",
    Icon: Headset,
  },
  {
    title: "File Management",
    href: "#",
    Icon: Folder,
  },
  {
    title: "Project Management",
    href: "#",
    Icon: SquareGanttChart,
  },
  {
    title: "SEO",
    href: "#",
    Icon: FileCode2,
  },
  {
    title: "Marketing",
    href: "#",
    Icon: Target,
  },
  {
    title: "Influencer Management",
    href: "#",
    Icon: Contact,
  },
  {
    title: "Content",
    href: "#",
    Icon: SquarePlay,
  },
  {
    title: "Ads Management",
    href: "#",
    Icon: Cast,
  },
  {
    title: "AI",
    href: "#",
    Icon: Bot,
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
