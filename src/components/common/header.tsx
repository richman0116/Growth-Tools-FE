"use client";

import LOGO from "@/assets/images/logo-growth-tools.png";
import { cn } from "@/lib/utils";
import { Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import useAuth from "@/hooks/useAuth";
import { useCallback } from "react";
import CookieHandler, { TOKEN } from "@/helpers/cookie";
import LocalStorageHandler from "@/helpers/localStorage";

export function Header() {
  const patchName = usePathname();
  const { isLoggedIn } = useAuth();

  const isSignIn = patchName === "/sign-in";

  const urlByStatus = isSignIn ? "/sign-up" : "/sign-in";
  const textByStatus = isLoggedIn ? "Logout" : isSignIn ? "Sign Up" : "Sign In";

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
          <Button size="icon" variant="ghost" className="mx-3">
            <Sun className="w-6" />
          </Button>

          {isLoggedIn ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Link className={cn(buttonVariants())} href={urlByStatus}>
              {textByStatus}
            </Link>
          )}
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
        <div className="ml-auto flex items-center">
          <Button size="icon" variant="ghost" className="mx-3">
            <Sun className="w-6" />
          </Button>
          <Link className={cn(buttonVariants())} href={urlByStatus}>
            {textByStatus}
          </Link>
        </div>
      </div>

      <Separator />
    </>
  );
}
