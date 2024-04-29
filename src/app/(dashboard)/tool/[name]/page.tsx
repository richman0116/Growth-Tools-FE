"use client";

import ADS_BANNER from "@/assets/images/ads-banner.png";
import Placeholder from "@/assets/images/placeholder.png";
import TOOL_LOGO_1 from "@/assets/images/tool-logo-1.png";
import TOOL_LOGO_2 from "@/assets/images/tool-logo-2.png";
import TOOL_THUMBNAIL_1 from "@/assets/images/tool-thumbnail-1.png";
import TOOL_THUMBNAIL_2 from "@/assets/images/tool-thumbnail-2.png";
import { ToolCard } from "@/components/cards/tool-card";
import { BreadcrumbDashboard } from "@/components/common/breadcrumb";
import { DealCard } from "@/components/common/deal-card";
import { IdeaButton } from "@/components/common/idea-button";
import { VisitButtonList } from "@/components/common/visit-button";
import { Prize } from "@/components/icons/Prize";
import { StarIcon } from "@/components/icons/StartIcon";
import GasIcon from "@/components/icons/gas";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { getToolByName } from "../../../../services/tool";

export default function ToolsDetailPage() {
  const pathName = usePathname();
  const name = pathName.split("/")[2];
  const swiper = useSwiper();

  const { data } = useQuery({
    queryKey: ["tool"],
    queryFn: () => getToolByName(name),
  });

  const toolData = data?.result;

  return (
    <section className="relativ px-4 py-6 lg:px-12 lg:py-16">
      {toolData && (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_1fr)_365px] gap-2 lg:gap-[140px]">
          <div>
            <div className="mb-6">
              <BreadcrumbDashboard displayName={toolData?.name} />
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 mb-6">
              <div className="w-16 h-16 flex items-center justify-center border rounded-lg shadow">
                <Image
                  src={toolData?.logo ?? Placeholder}
                  width={64}
                  height={64}
                  alt={toolData?.description ?? ""}
                />
              </div>
              <h3 className="font-bold text-[40px]">{toolData?.name}</h3>
              <div className="flex items-center gap-6">
                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600">
                  <Prize fill="white" />
                  Peer Reviewed
                </Button>

                <GasIcon />
              </div>
            </div>

            <p className="text-base text-description font-medium">
              {toolData?.shortDescription}
            </p>

            <VisitButtonList url={toolData?.website} />

            <Separator />

            <div>
              <h4 className="text-[18px] font-semibold mb-4 mt-12">
                Website Screenshot
              </h4>
              <div className="mb-12 relative">
                <Swiper
                  spaceBetween={50}
                  slidesPerView={1}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                  modules={[Navigation]}
                  centeredSlides
                  loop
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                >
                  {toolData?.screenshots &&
                    toolData?.screenshots.map(
                      (screenshot: string | StaticImport, i) => {
                        return (
                          <SwiperSlide key={`screen-shot-${i}`}>
                            <Image
                              src={screenshot}
                              width={1000}
                              height={330}
                              className="bg-cover h-full min-h-80"
                              alt=""
                            />
                          </SwiperSlide>
                        );
                      }
                    )}
                  <div
                    className="swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer p-2 rounded-full shadow-md bg-white"
                    onClick={() => swiper?.slidePrev()}
                  >
                    <ChevronLeft />
                  </div>
                  <div
                    className="swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer p-2 rounded-full shadow-md bg-white"
                    onClick={() => swiper?.slideNext()}
                  >
                    <ChevronRight />
                  </div>
                </Swiper>
              </div>
              <h4 className="text-[18px] font-semibold mb-4">Deals</h4>
              <div className="grid grid-col-1 lg:grid-cols-2 gap-[30px]">
                {toolData?.toolDeals.map(
                  (deal: {
                    id: Key | null | undefined;
                    name: string;
                    price: any;
                    discountPrice: any;
                  }) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <DealCard
                        key={deal.id}
                        title={deal.name}
                        price={String(Number(deal.price))}
                        salePrice={String(Number(deal.discountPrice))}
                        // onEdit={() => handleEditDeal("update", deal)}
                        // onRemove={() => handleDeleteDeal(deal.id)}
                      />
                    );
                  }
                )}
              </div>
            </div>

            <div>
              <h4 className="text-[18px] font-semibold mb-4 mt-12">
                Description
              </h4>
              <p className="text-base font-medium text-description">
                {toolData?.description}
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
              <VisitButtonList url={toolData?.website} />
            </div>
          </div>

          {/* left sidebar */}
          <div className="">
            <div>
              <h4 className="text-[18px] font-semibold mb-4">Key Features</h4>
              <p className="text-base font-medium text-description">
                {toolData?.keyFeatures?.map((key: any) => {
                  return key;
                })}
              </p>
            </div>
            <div>
              <h4 className="text-[18px] font-semibold mb-4 mt-12">
                Use cases
              </h4>
              <ul className="grid grid-cols-1 gap-4">
                {toolData?.useCases?.map(
                  (
                    data:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | PromiseLikeOfReactNode
                      | null
                      | undefined,
                    index: any
                  ) => (
                    <li
                      key={`star-${index}`}
                      className="flex items-start gap-4"
                    >
                      <StarIcon />
                      <p className="flex-1 text-base font-medium">{data}</p>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="mb-12">
              <h4 className="text-[18px] font-semibold mb-4 mt-12">
                Added by:
              </h4>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={toolData?.author?.avatar}
                      alt="@shadcn"
                      width={32}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-base">{`${toolData?.author?.firstName} ${toolData?.author?.lastName}`}</p>
                </div>
                <Button
                  variant="link"
                  className="text-secondary my-4 p-0 h-max"
                >
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
      )}
    </section>
  );
}
