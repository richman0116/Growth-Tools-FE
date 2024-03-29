"use client";

import { ReactNode } from "react";
import { Footer } from "../common/footer";
import { TopHeader } from "../common/auth-header";

interface AuthTemplateProps {
  children: ReactNode;
}

export function AuthTemplate({ children }: Readonly<AuthTemplateProps>) {
  return (
    <>
      <TopHeader />
      {children}
      <Footer />
    </>
  );
}
