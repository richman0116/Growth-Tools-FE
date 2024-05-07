"use client";

import SEARCHICON from "@/assets/icons/seach.svg";
import WHITE_BOT_ICON from "@/assets/icons/white-bot.svg";
import LOGO from "@/assets/images/logo-growth-tools.png";
import CookieHandler, { TOKEN } from "@/helpers/cookie";
import LocalStorageHandler from "@/helpers/localStorage";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { AlignJustify, Layers3, PencilRuler, Plus, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { Button, buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";

export function AuthHeader() {
  const pathName = usePathname();
  const name = pathName.split("/")[1];

  const { isLoggedIn } = useAuth();

  const handleLogout = useCallback(() => {
    CookieHandler.remove(TOKEN);
    LocalStorageHandler.clear();
    window.location.reload();
  }, []);

  return (
    <>
      <div className="px-12 py-4 items-center justify-between h-[70px] md:flex hidden">
        <Link href={"/"}>
          <Image
            width={LOGO.width}
            height={LOGO.height}
            alt="logo"
            src={LOGO.src}
          />
        </Link>
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
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-800 hover:to-blue-600">
            <Image src={WHITE_BOT_ICON} alt="search" className="w-5" />
            Try AI Search
          </Button>
          <Link
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex items-center gap-2"
            )}
            href={
              isLoggedIn ? "/submit-tool" : "/sign-in?redirect=/submit-tool"
            }
          >
            <Plus className="w-5" />
            Submit Tool
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "flex items-center gap-2"
                )}
                href={"/profile"}
              >
                <PencilRuler className="w-5" />
                Profile
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Link className={cn(buttonVariants())} href="/sign-up">
              Sign Up
            </Link>
          )}
        </div>
      </div>

      <div className="flex p-4 md:hidden items-center justify-end h-14">
        <div className={
            cn("block lg:hidden", name === "categories" ? "hidden" : "")
        }>
            <Link className="relative group" href={'/categories'}>
                <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30">
                    <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                        <div className="bg-gray-900 h-[2px] w-7 origin-left" />
                        <div className="bg-gray-900 h-[2px] w-7 rounded" />
                        <div className="bg-gray-900 h-[2px] w-7 origin-left" />
                    </div>
                </div>
            </Link>
        </div>
        <Link href={"/"}>
          <Image
            width={LOGO.width}
            height={LOGO.height}
            alt="logo"
            className="ml-2"
            src={LOGO.src}
          />
        </Link>
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
                  <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-800 hover:to-blue-600">
                    <Image src={WHITE_BOT_ICON} alt="search" className="w-5" />
                    Try AI Search
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="block">
                  <Link
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full flex items-center gap-2 border"
                    )}
                    href={
                      isLoggedIn
                        ? "/submit-tool"
                        : "/sign-in?redirect=/submit-tool"
                    }
                  >
                    <Plus className="w-5" />
                    Submit Tool
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="block">
                  <Link
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full flex items-center gap-2 border"
                    )}
                    href={"/categories"}
                  >
                    <Layers3 className="w-5" />
                    Categories
                  </Link>
                </DropdownMenuItem>
                {isLoggedIn && (
                  <DropdownMenuItem className="block">
                    <Link
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "flex items-center gap-2"
                      )}
                      href={"/profile"}
                    >
                      <PencilRuler className="w-5" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="block">
                  {isLoggedIn ? (
                    <Button className="w-full" onClick={handleLogout}>
                      Logout
                    </Button>
                  ) : (
                    <Link
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "w-full"
                      )}
                      href="/sign-up"
                    >
                      Sign Up
                    </Link>
                  )}
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
