"use client";

import ANNOUNCEMENT from "@/assets/images/announcement.png";
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
import { Filter } from "@/components/icons/Filter";
import { Button } from "@/components/ui/button";
import { Grid3X3, TableProperties } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function TrendingToolsPage() {
  const [variant, setVariant] = useState<"default" | "thumbnail">("default");

  console.log(variant);

  return (
    <>
      <section className="relative">
        <Image
          src={ANNOUNCEMENT}
          width={427}
          className="absolute right-0"
          alt=""
        />
        <div className="py-[52px] px-12 max-w-4xl">
          <h1 className="font-extrabold text-4xl lg:text-5xl mb-6">
            Discover <span className="textGradient">marketing tools</span> that{" "}
            <br />
            supercharge your growth
          </h1>
          <p className="mb-6">
            Browse through hundreds of unique tools to boost your marketing &
            startup. Start by clicking Categories below to pick tools in
            different marketing topics.
          </p>
          <div className="flex gap-6">
            <Button className="font-bold">View Latest Tools</Button>
            <Button variant="outline">Trending tools</Button>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6 p-12">
        <div className="flex gap-4 items-center">
          <div className="cursor-pointer py-2 px-4 flex items-center gap-3 rounded-full bg-gray-50">
            <Filter />
            <span className="text-sm text-secondary">Filter</span>
          </div>
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
