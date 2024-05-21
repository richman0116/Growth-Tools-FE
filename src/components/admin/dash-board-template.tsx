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
import { useGlobalStoreContext } from "../../hooks/GlobalStoreContext";
import { AuthContextProvider } from "@/hooks/AuthContext";
import clsx from "clsx";

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
  const { isCategoryLoading, setCategoryLoading } = useGlobalStoreContext();
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
          <AuthContextProvider>
            <Header />
            {children}
            <Footer />
          </AuthContextProvider>
        </GoogleOAuthProvider>
      );
    }

    return (
      <TooltipProvider delayDuration={0}>
        <div
          className={clsx(
            "flex justify-center items-center h-screen",
            isCategoryLoading ? "block" : "hidden"
          )}
        >
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <ResizablePanelGroup
          direction="horizontal"
          className={cn("h-full min-h-screen items-stretch")}
          style={{
            display: isCategoryLoading ? "none" : "flex",
          }}
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
              "hidden md:block relative transition-all duration-300 ease-in-out border-r-[1px] !overflow-visible max-w-60"
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
            className="relative overflow-x-auto"
          >
            <AuthContextProvider>
              <AuthHeader />
              {children}
              <Footer />
            </AuthContextProvider>
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
    setCategoryLoading(true);
    getCategoryList().then((res) => {
      setDashboardNavigation(res);
      setCategoryLoading(false);
    });
  }, [setCategoryLoading]);

  return dynamicLayout();
}
