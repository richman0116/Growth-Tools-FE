import { TanstackProvider } from "@/providers/TanstackProvider";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import localFont from "next/font/local";

import { DashBoardTemplate } from "@/components/admin/dash-board-template";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GlobalStoreProvider } from "../hooks/GlobalStoreContext";

const classDisplay = localFont({
    src: [
        {
            path: "../assets/fonts/ClashDisplay-Bold.woff",
            weight: "700",
            style: "normal",
        },
        {
            path: "../assets/fonts/ClashDisplay-Light.woff",
            weight: "300",
            style: "normal",
        },
        {
            path: "../assets/fonts/ClashDisplay-Medium.woff",
            weight: "500",
            style: "normal",
        },
        {
            path: "../assets/fonts/ClashDisplay-Regular.woff",
            weight: "400",
            style: "normal",
        },
        {
            path: "../assets/fonts/ClashDisplay-Semibold.woff",
            weight: "600",
            style: "normal",
        },
    ],
    variable: "--font-clash",
});

const satoshi = localFont({
    src: [
        {
            path: "../assets/fonts/Satoshi-Black.woff",
            weight: "900",
            style: "normal",
        },
        {
            path: "../assets/fonts/Satoshi-Bold.woff",
            weight: "700",
            style: "normal",
        },
        {
            path: "../assets/fonts/Satoshi-Light.woff",
            weight: "300",
            style: "normal",
        },
        {
            path: "../assets/fonts/Satoshi-Medium.woff",
            weight: "500",
            style: "normal",
        },
        {
            path: "../assets/fonts/Satoshi-Regular.woff",
            weight: "400",
            style: "normal",
        },
    ],
    variable: "--font-satoshi",
});

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// });

export const metadata: Metadata = {
    title: "Growth Tools - #1 Curated Marketing Tools List by Growth Virality",
    description: "Over 500+ of the best curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more..",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <title>Growth Tools - #1 Curated Marketing Tools List by Growth Virality</title>
            <link rel="icon" type="image/svg+xml" href="//s3.amazonaws.com/appforest_uf/f1658467734108x989486572275380100/Untitled%20design%20%288%29.svg" />
            <meta name="fragment" content="!" />
            <meta name="description" content="Over 500+ of the best curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.." />
            <link rel="canonical" href="https://tools.growthvirality.com/" />
            <meta property="og:title" content="Growth Tools - 500+ curated marketing tools for Marketers & Founders" />
            <meta name="twitter:title" content="Growth Tools - 500+ curated marketing tools for Marketers & Founders" />
            <meta property="og:site_name" content="Growth Tools" />
            <meta name="twitter:site_name" content="Growth Tools" />
            <meta property="og:description" content="Over 500+ of the best curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.." />
            <meta name="twitter:description" content="Over 500+ of the best curated marketing tools to use across AI, Content SEO, Social, Paid, Email, Productivity, & more.." />
            <link rel="image_src" href="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F2394e56ea77fb59b3a6d75e6fd94c644.cdn.bubble.io%2Ff1657661829561x267166805603615170%2FGrowth%2520Virality%2520Infrographic%2520Guide.png?w=&h=&auto=compress&dpr=1&fit=max" />
            <meta property="og:image" content="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F2394e56ea77fb59b3a6d75e6fd94c644.cdn.bubble.io%2Ff1657661829561x267166805603615170%2FGrowth%2520Virality%2520Infrographic%2520Guide.png?w=&h=&auto=compress&dpr=1&fit=max" />
            <meta name="twitter:image:src" content="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F2394e56ea77fb59b3a6d75e6fd94c644.cdn.bubble.io%2Ff1657661829561x267166805603615170%2FGrowth%2520Virality%2520Infrographic%2520Guide.png?w=&h=&auto=compress&dpr=1&fit=max" />
            <meta property="og:url" content="https://tools.growthvirality.com/" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="viewport" content="width=device-width,initial-scale=1.0" />
            <body className={cn(classDisplay.variable, satoshi.variable)}>
                <GlobalStoreProvider>
                    <TanstackProvider>
                        <Toaster />
                        <DashBoardTemplate navCollapsedSize={0}>{children}</DashBoardTemplate>
                    </TanstackProvider>
                </GlobalStoreProvider>
            </body>
        </html>
    );
}
