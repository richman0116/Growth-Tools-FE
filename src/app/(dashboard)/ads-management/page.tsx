"use client";

import { FilterPopover } from "@/components/admin/filter-popover";
import { ToolCard } from "@/components/cards/tool-card";
import { BreadcrumbDashboard } from "@/components/common/breadcrumb";
import { TOOL_MOCK_DATA } from "@/components/mockData/tool-mock-data";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Grid3X3, TableProperties } from "lucide-react";
import { useState } from "react";

export default function AdsManagementPage() {
  const [variant, setVariant] = useState<"default" | "thumbnail">("default");

  return (
    <>
      <div className="px-12 pt-16">
        <BreadcrumbDashboard />

        <h3 className="font-bold text-[32px] mt-6 mb-8">
          528 <span className="font-medium">File Management Tools</span>
        </h3>
        <Separator />
      </div>

      <section className="min-h-[700px] flex flex-col gap-6 p-4 md:p-8">
        <div className="flex gap-4 items-center">
          <FilterPopover />

          <span className="font-medium font-sm text-gray-500">Show as:</span>
          <Button
            variant="ghost"
            size="icon"
            className="p-0 w-auto h-auto"
            onClick={() => setVariant("default")}
          >
            <TableProperties
              color={variant === "default" ? "#164CD9" : "black"}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="p-0 w-auto h-auto"
            onClick={() => setVariant("thumbnail")}
          >
            <Grid3X3 color={variant === "thumbnail" ? "#164CD9" : "black"} />
          </Button>
        </div>
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOL_MOCK_DATA.map((props, index) => (
            <ToolCard key={`tool-card-${index}`} variant={variant} {...props} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="outline">View More</Button>
        </div>
      </section>
    </>
  );
}
