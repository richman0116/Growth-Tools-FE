"use client";

import TOOL_LOGO_1 from "@/assets/images/tool-logo-1.png";
import TOOL_LOGO_2 from "@/assets/images/tool-logo-2.png";
import TOOL_LOGO_3 from "@/assets/images/tool-logo-3.png";
import TOOL_LOGO_4 from "@/assets/images/tool-logo-4.png";
import TOOL_LOGO_5 from "@/assets/images/tool-logo-5.png";
import TOOL_THUMBNAIL_1 from "@/assets/images/tool-thumbnail-1.png";
import TOOL_THUMBNAIL_2 from "@/assets/images/tool-thumbnail-2.png";
import TOOL_THUMBNAIL_3 from "@/assets/images/tool-thumbnail-3.png";
import TOOL_THUMBNAIL_4 from "@/assets/images/tool-thumbnail-4.png";
import TOOL_THUMBNAIL_5 from "@/assets/images/tool-thumbnail-5.png";
import { ToolCard } from "@/components/cards/tool-card";
import { Button } from "@/components/ui/button";
import { Table, TableProperties } from "lucide-react";
import { useState } from "react";

export default function TrendingToolsPage() {
  const [varinat, setVariant] = useState<"default" | "thumbnail">("default");

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
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setVariant("default")}
        >
          <TableProperties />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setVariant("thumbnail")}
        >
          <Table />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {[
          {
            logo: TOOL_LOGO_1,
            thumbnail: TOOL_THUMBNAIL_1,
            title: "Tool 1",
            description:
              "Quickly publish, edit and distribute more engaging content for your multi-page, long format newsletter.",
          },
          {
            logo: TOOL_LOGO_2,
            thumbnail: TOOL_THUMBNAIL_2,
            title: "Tool 2",
            description:
              "Quickly publish, edit and distribute more engaging content for your multi-page, long format newsletter.",
          },
          {
            logo: TOOL_LOGO_3,
            thumbnail: TOOL_THUMBNAIL_3,
            title: "Tool 3",
            description:
              "Quickly publish, edit and distribute more engaging content for your multi-page, long format newsletter.",
          },
          {
            logo: TOOL_LOGO_4,
            thumbnail: TOOL_THUMBNAIL_4,
            title: "Tool 4",
            description:
              "Quickly publish, edit and distribute more engaging content for your multi-page, long format newsletter.",
          },
          {
            logo: TOOL_LOGO_5,
            thumbnail: TOOL_THUMBNAIL_5,
            title: "Tool 5",
            description:
              "Quickly publish, edit and distribute more engaging content for your multi-page, long format newsletter.",
          },
          {
            logo: TOOL_LOGO_1,
            thumbnail: TOOL_THUMBNAIL_1,
            title: "Tool 6",
            description:
              "Quickly publish, edit and distribute more engaging content for your multi-page, long format newsletter.",
          },
        ].map((props, index) => (
          <ToolCard key={`tool-card-${index}`} variant={varinat} {...props} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="outline">View More</Button>
      </div>
    </div>
  );
}
