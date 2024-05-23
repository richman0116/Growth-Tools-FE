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
import DiscordIcon from "../icons/discord";
import TiktokIcon from "../icons/tiktok";
import XIcon from "../icons/x";
import InstagramIcon from "../icons/instagram";
import Image from "next/image";

const links: { title: string; href: string }[] = [
  {
    title: "Growth Virality",
    href: "/growth-virality",
  },
  {
    title: "Growth Newsletter",
    href: "/growth-newsletter",
  },
  {
    title: "Growth Articles",
    href: "/growth-articles",
  },
];

export function Footer() {
  return (
    <div className="admin-footer px-8 py-4 md:px-12 md:pt-9 md:pb-12 flex flex-col md:flex-row md:justify-between gap-4 md:gap-2">
      <div className="flex justify-start md:justify-center md:items-start w-fit">
        <Image src={LOGO.src} width={100} height={30} alt="logo" className="w-24 h-auto" />
      </div>
      <div className="flex flex-col md:flex-row md:justify-between w-full md:w-auto justify-start xl:gap-20 lg:gap-10">
        <NavigationMenu className="block">
          <h4 className="text-base font-semibold font-clash text-black dark:text-white">Menu</h4>
          <NavigationMenuList className="flex-col gap-1">
            {links.map((link) => (
              <NavigationMenuItem className="w-full" key={link.href}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink className="w-full text-sm font-medium font-satoshi text-black dark:text-white whitespace-nowrap">
                    {link.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="mt-4 md:mt-0 md:ml-8">
          <p className="mb-2 font-satoshi text-black dark:text-white font-medium text-sm">Get in touch</p>
          <Button variant="ghost" asChild className="pl-0">
            <Link href="/discord">
              <div className="flex gap-2 items-center">
                <DiscordIcon className="mr-2e" />
                <p className="font-satoshi text-black dark:text-white font-medium">Join our Discord community</p>
              </div>
            </Link>
          </Button>
        </div>
        <div className="mt-4 md:mt-0 md:ml-8">
          <h4 className="text-base font-semibold pl-0 pr-4 mb-2 font-clash text-black dark:text-white">Follow Us</h4>
          <div className="flex gap-2 pl-0 pr-2">
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
        </div>
      </div>
      <div className="flex justify-start md:justify-end mt-4 md:mt-0">
        <Button variant="outline" className="text-base font-medium font-clash dark:text-white text-black py-2 md:py-6 px-6 dark:bg-[#ea5721]">
          Contact Us
        </Button>
      </div>
    </div>
  );
}
