"use client";

import { NOT_DASHBOARD_URL } from "@/helpers/common";
import { cn } from "@/lib/utils";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { usePathname } from "next/navigation";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { useMediaQuery } from "usehooks-ts";
import { getCategoryList } from "../../services/tool";
import { AuthHeader } from "../common/auth-header";
import { Footer } from "../common/footer";
import { Header } from "../common/header";
import { ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { Skeleton } from "../ui/skeleton";
import { TooltipProvider } from "../ui/tooltip";
import { Sidebar } from "./sidebar";

interface DashboardBoardProps {
  navCollapsedSize: number;
  children: ReactNode;
}

const defaultLayout = [16, 84];

export function DashBoardTemplate({
  navCollapsedSize,
  children,
}: Readonly<DashboardBoardProps>) {
  const pathName = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dashboardNavigation, setDashboardNavigation] = useState<Category[]>(
    []
  );
  const ref = useRef<ImperativePanelHandle>(null);
  const isMobile = useMediaQuery("(max-width: 480px)");

  const isNotDashBoardLayout = NOT_DASHBOARD_URL.some(
    (path: string) => path === pathName
  );

  const dynamicLayout = () => {
    if (isNotDashBoardLayout) {
      return (
        <GoogleOAuthProvider clientId="583270569276-at80fs6dtu4p6a8m6v7ktv2gsv8d203c.apps.googleusercontent.com">
          <Header />
          {children}
          <Footer />
        </GoogleOAuthProvider>
      );
    }

    return (
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full min-h-screen items-stretch"
        >
          <ResizablePanel
            ref={ref}
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={15}
            maxSize={20}
            onCollapse={() => {
              if (isMobile) return;
              setIsCollapsed(true);
            }}
            onExpand={() => {
              if (isMobile) return;
              setIsCollapsed(false);
            }}
            className={cn(
              isCollapsed && "min-w-[50px]",
              "relative transition-all duration-300 ease-in-out border-r-[1px] !overflow-visible max-w-60"
            )}
          >
            {dashboardNavigation?.length ? (
              <Sidebar
                isCollapsed={isCollapsed}
                links={dashboardNavigation}
                onCollapse={collapsePanel}
              />
            ) : (
              <div className="grid gap-3 py-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                <div className="space-y-3">
                  {Array.from({ length: 10 }, (_, i) => (
                    <Fragment key={`skeleton-${i}`}>
                      <Skeleton className="h-6 w-[200px]" />
                      <Skeleton className="h-6 w-[130px]" />
                    </Fragment>
                  ))}
                </div>
              </div>
            )}
          </ResizablePanel>
          <ResizablePanel
            defaultSize={defaultLayout[1]}
            minSize={30}
            className="relative"
          >
            <AuthHeader />
            {children}
            <Footer />
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    );
  };

  const collapsePanel = () => {
    const panel = ref.current;

    if (panel) {
      if (isCollapsed) {
        panel.expand();
      } else {
        panel.collapse();
      }
    }
  };

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  useEffect(() => {
    getCategoryList().then((res) => {
      setDashboardNavigation(res);
    });
  }, []);

  return dynamicLayout();
}
