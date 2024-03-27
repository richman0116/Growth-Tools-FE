"use client";

import SEARCHICON from "@/assets/icons/seach.svg";
import WHITE_BOT_ICON from "@/assets/icons/white-bot.svg";
import LOGO from "@/assets/images/logo-growth-tools.png";
import { Sun } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export function TopHeader() {
  return (
    <>
      <div className="flex px-12 py-4 items-center justify-between h-[70px]">
        <Image
          width={LOGO.width}
          height={LOGO.height}
          alt="logo"
          src={LOGO.src}
        />
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              className="ml-auto rounded-full min-w-[432px] w-full h-10"
              type="search"
              placeholder="Search..."
            />
            <Button
              size="icon"
              className="p-[6px] w-8 h-8 absolute top-1/2 -translate-y-1/2 right-1"
            >
              <Image src={SEARCHICON} alt="search" className="w-5" />
            </Button>
          </div>
          <Button size="icon" variant="ghost" className="mx-3">
            <Sun className="w-6" />
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
            <Image src={WHITE_BOT_ICON} alt="search" className="w-5" />
            Try AI Search
          </Button>
          <Button variant="outline">Submit Tool</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
      <Separator />
    </>
  );
}
