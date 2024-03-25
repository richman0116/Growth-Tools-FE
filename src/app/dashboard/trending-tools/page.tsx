"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useUserStore from "@/stores/user";
import { Search, Table, TableProperties } from "lucide-react";
import TOOL_LOGO_1 from "@/assets/images/tool-logo-1.png";
import TOOL_LOGO_2 from "@/assets/images/tool-logo-2.png";
import TOOL_LOGO_3 from "@/assets/images/tool-logo-3.png";
import TOOL_LOGO_4 from "@/assets/images/tool-logo-4.png";
import TOOL_LOGO_5 from "@/assets/images/tool-logo-5.png";
import { ToolCard } from "@/components/cards/tool-card";

export default function Index() {
  return (
    <div className="flex flex-col gap-6 p-12">
      <h1 className="font-extrabold text-4xl lg:text-5xl">
        Discover marketing tools that supercharge your growth
      </h1>
      <p>
        Browse through hundreds of unique tools to boost your marketing &
        startup. Start by clicking Categories below to pick tools in different
        marketing topics.
      </p>
      <div className="flex gap-6">
        <Button>View Latest Tools</Button>
        <Button variant="outline">Trending tools</Button>
      </div>
      <hr />
      <div className="flex gap-4 items-center">
        <Button>Filter</Button>
        <span>Show as:</span>
        <Button variant="ghost">
          <TableProperties />
        </Button>
        <Button variant="ghost">
          <Table />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {[
          {
            logo: TOOL_LOGO_1,
            title: "Tool 1",
            description:
              "Quickly publish, edit and distribute more engaging content for your multi-page, long format newsletter.",
          },
          {
            logo: TOOL_LOGO_2,
            title: "Tool 2",
            description:
              "Quickly publish, edit and distribute more engaging content for your multi-page, long format newsletter.",
          },
          {
            logo: TOOL_LOGO_3,
            title: "Tool 3",
            description:
              "Quickly publish, edit and distribute more engaging content for your multi-page, long format newsletter.",
          },
          {
            logo: TOOL_LOGO_4,
            title: "Tool 4",
            description:
              "Quickly publish, edit and distribute more engaging content for your multi-page, long format newsletter.",
          },
          {
            logo: TOOL_LOGO_5,
            title: "Tool 5",
            description:
              "Quickly publish, edit and distribute more engaging content for your multi-page, long format newsletter.",
          },
        ].map((props, index) => (
          <ToolCard key={`tool-card-${index}`} {...props} />
        ))}
      </div>
    </div>
  );
}
