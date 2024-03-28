"use client";

import { cn } from "@/lib/utils";
import { dashboardNavigation } from "@/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { TooltipProvider } from "../ui/tooltip";
import { Footer } from "./footer";
import { TopHeader } from "./header";
import { Sidebar } from "./sidebar";

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
            setIsCollapsed(true);
          }}
          onExpand={() => {
            setIsCollapsed(false);
          }}
          className={cn(
            isCollapsed && "min-w-[50px]",
            "relative transition-all duration-300 ease-in-out border-r-[1px] !overflow-visible"
          )}
        >
          <div
            onClick={collapsePanel}
            className="rounded-full w-8 h-8 border flex items-center justify-center absolute top-4 -right-4 z-10 bg-white cursor-pointer"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5" color="#1F6BDA" />
            ) : (
              <ChevronLeft className="w-5" color="#1F6BDA" />
            )}
          </div>
          <Sidebar isCollapsed={isCollapsed} links={dashboardNavigation} />
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
