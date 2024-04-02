"use client";

import ADS_BANNER from "@/assets/images/ads-banner.png";
import CLEAN_SHOT from "@/assets/images/clean-shot.png";
import EXAMPLE_IMAGE from "@/assets/images/example-image.png";
import TOOL_LOGO_1 from "@/assets/images/tool-logo-1.png";
import TOOL_LOGO_2 from "@/assets/images/tool-logo-2.png";
import TOOL_THUMBNAIL_1 from "@/assets/images/tool-thumbnail-1.png";
import TOOL_THUMBNAIL_2 from "@/assets/images/tool-thumbnail-2.png";
import { ToolCard } from "@/components/cards/tool-card";
import { BreadcrumbDashboard } from "@/components/common/breadcrumb";
import { IdeaButton } from "@/components/common/idea-button";
import { VisitButtonList } from "@/components/common/visit-button";
import { Prize } from "@/components/icons/Prize";
import { StarIcon } from "@/components/icons/StartIcon";
import GasIcon from "@/components/icons/gas";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function TrendingToolsDetailPage() {
  return (
    <section className="relativ px-4 py-6 lg:px-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_1fr)_365px] gap-2 lg:gap-[140px]">
        <div>
          <div className="mb-6">
            <BreadcrumbDashboard />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 mb-6">
            <div className="w-16 h-16 flex items-center justify-center border rounded-lg shadow">
              <Image src={CLEAN_SHOT} alt="" width={42} height={42} />
            </div>
            <h3 className="font-bold text-[40px]">Domyshoot</h3>
            <div className="flex items-center gap-6">
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
                <Prize fill="white" />
                Peer Reviewed
              </Button>

              <GasIcon />
            </div>
          </div>

          <p className="text-base text-description font-medium">
            DoMyShoot is an AI powered product photography app to help online
            sellers create pro-quality photos, cheaper and faster.
          </p>

          <VisitButtonList />

          <Separator />

          <div>
            <h4 className="text-[18px] font-semibold mb-4 mt-12">
              Website Screenshot
            </h4>
            <div className="mb-12">
              <Image src={EXAMPLE_IMAGE} width={1000} height={330} alt="" />
            </div>
            <h4 className="text-[18px] font-semibold mb-4">Deals</h4>
            <div className="grid grid-col-1 lg:grid-cols-2 gap-[30px]">
              <div className="rounded-xl border border-grGray shadow-lg p-5">
                <h4 className="mb-2 font-semibold text-[18px]">
                  Lifetime 50% off
                </h4>
                <p className="font-medium text-sm mb-2">
                  $4.99 <span className="text-label">$10</span> / monthly
                </p>
                <p className="text-accentGreen font-medium p-2 rounded-lg border border-grGray2 w-max mb-2">
                  You save $5.01
                </p>
                <Button variant="link" className="text-secondary p-0 h-max">
                  Click to learn more
                </Button>
              </div>
              <div className="rounded-xl border border-grGray shadow-lg p-5">
                <h4 className="mb-2 font-semibold text-[18px]">
                  Lifetime 50% off
                </h4>
                <p className="font-medium text-sm mb-2">
                  $4.99 <span className="text-label">$10</span> / monthly
                </p>
                <p className="text-accentGreen font-medium p-2 rounded-lg border border-grGray2 w-max mb-2">
                  You save $5.01
                </p>
                <Button variant="link" className="text-secondary p-0 h-max">
                  Click to learn more
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[18px] font-semibold mb-4 mt-12">
              Description
            </h4>
            <p className="text-base font-medium text-description">
              Sed pretium augue magna, id vehicula purus faucibus et. Sed eros
              justo, tincidunt sit amet suscipit at, cursus a metus. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Vestibulum aliquam
              facilisis ligula, rhoncus finibus nunc sodales a. Donec in luctus
              nisi. Sed luctus nisl in nisl semper aliquet. Morbi quam quam,
              convallis vel euismod in, interdum id libero. Donec in tellus quis
              dui interdum semper nec vitae felis.{" "}
            </p>
          </div>

          <div className="my-8 lg:my-[78px]">
            <IdeaButton />
          </div>

          <div>
            <h4 className="text-[18px] font-semibold mb-4 mt-12">
              Discover <span className="text-secondary">more</span> Ads
              Management tools
            </h4>
            <div className="grid gap-4">
              {[
                {
                  id: "/trending-tools/tool-1",
                  logo: TOOL_LOGO_1,
                  thumbnail: TOOL_THUMBNAIL_1,
                  title: "Tool 1",
                  description:
                    "Quickly publish, edit and distribute more engaging content for your multi-page, long format newsletter.",
                },
                {
                  id: "/trending-tools/tool-2",
                  logo: TOOL_LOGO_2,
                  thumbnail: TOOL_THUMBNAIL_2,
                  title: "Tool 2",
                  description:
                    "Quickly publish, edit and distribute more engaging content for your multi-page, long format newsletter.",
                },
              ].map((props, index) => (
                <ToolCard key={`tool-card-${index}`} {...props} />
              ))}
            </div>
            <Button variant="link" className="text-secondary my-4 p-0 h-max">
              Browse 1 Ads Management tools
            </Button>
          </div>

          <div className="pb-12">
            <VisitButtonList />
          </div>
        </div>

        {/* left sidebar */}
        <div className="">
          <div>
            <h4 className="text-[18px] font-semibold mb-4">Key Features</h4>
            <p className="text-base font-medium text-description">
              DoMyShoot is an AI-powered product photography app to help online
              sellers create pro-quality photos, cheaper and faster. The
              intelligent camera has in-built guides to help sellers click
              images for their eCommerce product category whether it`s fashion
              or food. Once you click your images on the app on your smartphone,
              our AI transforms them into high-quality product photos for
              marketplace listings or social media posts. Creating fresh content
              for eCommerce has never been as simple!
            </p>
          </div>
          <div>
            <h4 className="text-[18px] font-semibold mb-4 mt-12">Use cases</h4>
            <ul className="grid grid-cols-1 gap-4">
              {[
                {
                  description:
                    "Social Media Management: With the increasing importance of social media in marketing strategies, businesses need effective tools to manage their social media presence. ",
                },
                {
                  description:
                    "Email Marketing Automation: Email marketing remains a powerful tool for businesses to reach and engage with their target audience. ",
                },
                {
                  description:
                    "Search Engine Optimization (SEO): In today's digital landscape, having a strong online presence is crucial for businesses to attract organic traffic and generate leads. ",
                },
              ].map((data, index) => (
                <li key={`star-${index}`} className="flex items-start gap-4">
                  <StarIcon />
                  <p className="flex-1 text-base font-medium">
                    {data?.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-12">
            <h4 className="text-[18px] font-semibold mb-4 mt-12">Added by:</h4>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    width={32}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="font-medium text-base">Cameron Williamson</p>
              </div>
              <Button variant="link" className="text-secondary my-4 p-0 h-max">
                View profile
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-grGray shadow-lg p-5">
            <h4 className="mb-2 font-semibold text-base gap-2 flex items-center">
              <Image
                width={32}
                height={32}
                className=""
                alt=""
                src={ADS_BANNER}
              />
              Advertisement
            </h4>
            <p className="font-medium text-base text-description mb-6">
              Promote your product or service to a vast audience of designers
              and founders.
            </p>

            <Button className="h-11 px-6">Fill out the form</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
