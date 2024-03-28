"use client";

import { cn } from "@/lib/utils";
import { dashboardNavigation } from "@/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { TooltipProvider } from "../ui/tooltip";
import { Footer } from "./footer";
import { TopHeader } from "./header";
import { Sidebar } from "./sidebar";
import { useMediaQuery } from "usehooks-ts";

interface DashboardBoardProps {
  navCollapsedSize: number;
  children: ReactNode;
}

const defaultLayout = [16, 84];

export function DashBoard({
  navCollapsedSize,
  children,
}: Readonly<DashboardBoardProps>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const ref = useRef<ImperativePanelHandle>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

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
            "relative transition-all duration-300 ease-in-out border-r-[1px] !overflow-visible"
          )}
        >
          <Sidebar
            isCollapsed={isCollapsed}
            links={dashboardNavigation}
            onCollapse={collapsePanel}
          />
        </ResizablePanel>
        <ResizablePanel
          defaultSize={defaultLayout[1]}
          minSize={30}
          className="relative"
        >
          <TopHeader />
          {children}
          <Footer />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
