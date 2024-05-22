"use client";

import LOGO from "@/assets/images/logo-growth-tools.png";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { useAuthContext } from "@/hooks/AuthContext";
import { useCallback, useEffect, useState } from "react";
// import CookieHandler, { TOKEN } from "@/helpers/cookie";
// import LocalStorageHandler from "@/helpers/localStorage";

export function Header() {
  const patchName = usePathname();
  const { isLoggedIn } = useAuthContext();
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('light');
  useEffect(() => {
    const isSignIn = patchName === "/sign-in";
    setIsSignIn(isSignIn)
  }, [isLoggedIn, patchName])

  const urlByStatus = isSignIn ? "/sign-up" : "/sign-in";
  const textByStatus = isLoggedIn ? "Logout" : isSignIn ? "Sign Up" : "Sign In";

  const backToDashboard = () => {
    window.history.back();
  }

  const onToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  useEffect(() => {
    // Check for saved theme in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
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
          <Button size="icon" variant="ghost" className="mx-3" onClick={onToggleTheme}>
            { theme === 'light' ? <Sun className="w-6" /> : <Moon className="w-6"/>}
          </Button>

          {isLoggedIn ? (
            <Button onClick={backToDashboard} className="font-clash font-medium p-5">Close/Discard Changes</Button>
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
          <Button size="icon" variant="ghost" className="mx-3" onClick={onToggleTheme}>
            { theme === 'light' ? <Sun className="w-6" /> : <Moon className="w-6"/>}
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
