"use client";

import SEARCHICON from "@/assets/icons/seach.svg";
import WHITE_BOT_ICON from "@/assets/icons/white-bot.svg";
import LOGO from "@/assets/images/logo-growth-tools.png";
import { AlignJustify, Plus, Sun } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function AuthHeader() {
  return (
    <>
      <div className="px-12 py-4 items-center justify-between h-[70px] md:flex hidden">
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
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="w-5" />
            Submit Tool
          </Button>
          <Button>Sign Up</Button>
        </div>
      </div>

      <div className="flex p-4 md:hidden items-center justify-end h-14">
        <Image
          width={LOGO.width}
          height={LOGO.height}
          alt="logo"
          className="ml-2"
          src={LOGO.src}
        />
        <div className="ml-auto">
          <Button size="icon" className="p-[6px] w-8 h-8 ">
            <Image src={SEARCHICON} alt="search" className="w-5" />
          </Button>
          <Button size="icon" variant="ghost" className="mx-3">
            <Sun className="w-6" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <AlignJustify />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto border-none">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button
                    size="sm"
                    className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
                  >
                    <Image src={WHITE_BOT_ICON} alt="search" className="w-3" />
                    Try AI Search
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    size="sm"
                    className="w-full flex items-center gap-2"
                    variant="outline"
                  >
                    Submit Tool
                    <Plus className="w-5" />
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button size="sm" className="w-full">
                    Sign Up
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
    </>
  );
}
