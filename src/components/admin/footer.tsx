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
import LOGO from "@/assets/images/footer-logo.svg";
import { Button } from "../ui/button";
import DiscordIcon from "../common/icons/discord";
import TiktokIcon from "../common/icons/tiktok";
import XIcon from "../common/icons/x";
import InstagramIcon from "../common/icons/instagram";
import Image from "next/image";

const links: { title: string; href: string }[] = [
  {
    title: "Growth Virality",
    href: "#",
  },
  {
    title: "Growth Newsletter",
    href: "#",
  },
  {
    title: "Growth Articles",
    href: "#",
  },
];

export function Footer() {
  return (
    <div className="admin-footer grid grid-cols-1 md:flex items-start justify-between gap-4 md:gap-2 p-4 md:px-12 md:py-4">
      <Image src={LOGO.src} width={100} height={30} alt="logo" />
      <NavigationMenu className="block">
        <h4 className="text-base font-bold px-4 mb-2">Menu</h4>
        <NavigationMenuList className="flex-col gap-1">
          {links.map((link) => (
            <NavigationMenuItem className="w-full" key={link.href}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} w-full text-sm`}
                >
                  {link.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="self-center">
        <p className="px-4 mb-2">Get in touch</p>
        <Button variant="ghost" asChild>
          <Link href="#">
            <DiscordIcon className="mr-2" /> Join our Discord community
          </Link>
        </Button>
      </div>
      <NavigationMenu className="block">
        <h4 className="text-base font-bold px-4 mb-2">Follow Us</h4>
        <div className="flex gap-2 px-2">
          <Button variant="ghost" size="icon">
            <TiktokIcon className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <XIcon className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <InstagramIcon className="h-6 w-6" />
          </Button>
        </div>
      </NavigationMenu>
      <Button variant="outline">Contact Us</Button>
    </div>
  );
}
