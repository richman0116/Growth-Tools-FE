"use client";

import * as React from "react";

import { Sun } from "lucide-react";
import Image from "next/image";
import LOGO from "@/assets/images/logo-growth-tools.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function TopHeader() {
  return (
    <div className="flex gap-2 px-12 py-4 border-b-[1px] items-center">
      <Image
        width={LOGO.width}
        height={LOGO.height}
        alt="logo"
        src={LOGO.src}
      />
      <Input className="ml-auto" type="search" placeholder="Search..." />
      <Button variant="ghost">
        <Sun />
      </Button>
      <Button>Try AI Search</Button>
      <Button variant="outline">Submit Tool</Button>
      <Button>Sign Up</Button>
    </div>
  );
}
