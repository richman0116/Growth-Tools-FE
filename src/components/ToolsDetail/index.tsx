"use client";

import ADS_BANNER from "@/assets/images/ads-banner.png";
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
import Image, { StaticImageData } from "next/image";
import { filterTool, getToolByName } from "../../services/tool";
import { Key, useEffect, useState } from "react";
import Placeholder from "@/assets/images/placeholder.png";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { supabase } from "@/lib/supabaseClient";

interface IToolsDetail {
  toolData: ToolInfo
}

const ToolsDetail = ({ toolData }: IToolsDetail) => {
  
  const [clapCount, setClapCount] = useState<number>(0);

  const swiper = useSwiper();

  const { data: relatedTools } = useQuery({
    queryKey: ["related-tools"],
    queryFn: () =>
      filterTool({
        categoryId: toolData?.category?.id,
        page: 1,
        take: 10,
        order: "DESC",
      }),
    enabled: !!toolData?.category?.id,
  });

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('tools').select('clap_count').eq('id', toolData.id)
      const clap_count: number = data ? data[0]?.clap_count : 0;
      setClapCount(clap_count)
    })()
  })

  return (
    <section className="px-4 py-6 lg:px-12 lg:py-18">
      {toolData && (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_1fr)_365px] lg:flex lg:flex-col xl:grid xl:grid-cols-[minmax(0,_1fr)_365px] gap-5 lg:gap-20 2xl:gap-[100px]">
          <div>
            <div className="mb-6">
              <BreadcrumbDashboard displayName={toolData?.name} />
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-row items-center lg:justify-start gap-8 xl:gap-7 mb-6">
              <h3 className="w-full font-bold text-lg md:text-[18] 2xl:text-[38px] font-clash text-black dark:text-white whitespace-nowrap block sm:hidden">{toolData?.name}</h3>
              <div className="flex gap-4 2xl:gap-7 items-center flex-col-reverse sm:flex-row">
                <div className="w-14 h-14 2xl:w-16 2xl:h-16 flex items-center justify-center border rounded-lg shadow">
                  <Image
                    src={toolData?.logo ?? Placeholder}
                    width={64}
                    height={64}
                    alt={toolData?.description ?? ""}
                    className="w-full h-full rounded-md"
                  />
                </div>
                <h3 className="font-bold text-lg md:text-[18] 2xl:text-[38px] font-clash text-black dark:text-white whitespace-nowrap hidden sm:block">{toolData?.name}</h3>
              </div>
              <div className="flex items-center gap-6">
                <Button className="flex items-center gap-1 2xl:gap-2 bg-gradient-to-r from-blue-700 to-blue-500 rounded-[8px] px-2.5">
                  <Prize fill="white" />
                  <p className="font-clash font-normal text-[13px]">Peer Reviewed</p>
                </Button>
                <GasIcon />
              </div>
            </div>

            <p className="text-base font-medium font-satoshi text-description dark:text-white">
              {toolData?.shortDescription}
            </p>

            <VisitButtonList url={toolData?.website} clapCountProp={clapCount} />

            <Separator />

            <div>
              <h4 className="text-[18px] font-semibold mb-4 mt-12 font-clash text-black dark:text-white">
                Website Screenshot
              </h4>
              <div className="mb-12 relative">
                <Swiper
                  slidesPerView={1}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                  modules={[Navigation]}
                  loop
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                >
                  {
                    toolData?.screenshots ?
                      toolData?.screenshots.map(
                        (screenshot: string | StaticImport, i) => {
                          return (
                            <SwiperSlide key={`screen-shot-${i}`}>
                              <Image
                                src={screenshot}
                                width={1000}
                                height={330}
                                className="bg-cover h-full min-h-80 object-fill w-full border-2 border-[#F1F1F1] rounded-xl"
                                alt="Website Screenshot"
                              />
                            </SwiperSlide>
                          );
                        }
                      ) : 
                      <SwiperSlide>
                        <Image
                          src={Placeholder}
                          width={1000}
                          height={330}
                          className="bg-cover h-full min-h-80 object-fill w-full border-2 border-[#F1F1F1] rounded-xl"
                          alt="Website Screenshot"
                        />
                      </SwiperSlide>
                  }
                  <div
                    className="swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer p-2 rounded-full shadow-md bg-white dark:bg-black"
                    onClick={() => swiper?.slidePrev()}
                  >
                    <ChevronLeft />
                  </div>
                  <div
                    className="swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer p-2 rounded-full shadow-md bg-white dark:bg-black"
                    onClick={() => swiper?.slideNext()}
                  >
                    <ChevronRight />
                  </div>
                </Swiper>
              </div>
              {toolData?.toolDeals?.length ? (
                <>
                  <h4 className="text-[18px] mb-4 font-clash font-semibold">Deals</h4>
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
                          />
                        );
                      }
                    )}
                  </div>
                </>
              ) : ''}
            </div>

            <div className="lg:my-[78px]">
              <IdeaButton />
            </div>

            <div className="my-14">
              <h4 className="text-[18px] font-semibold mb-3 mt-12 font-clash text-black dark:text-white">
                Description
              </h4>
              <p className="text-base font-medium font-satoshi text-description dark:text-white">
                {toolData?.description}
              </p>
            </div>
            
            <div className="hidden lg:block xl:hidden mb-20">
              <div>
                <h4 className="text-[18px] font-semibold mb-4 font-clash text-black dark:text-white">Key Features</h4>
                <p className="text-base font-medium font-satoshi text-description dark:text-white">
                  {toolData?.keyFeatures?.map((key: any) => {
                    return key;
                  })}
                </p>
              </div>
              <div>
                <h4 className="text-[18px] font-semibold mb-4 mt-12 font-clash text-black dark:text-white">
                  Use cases
                </h4>
                <ul className="grid grid-cols-1 gap-4 font-satoshi">
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
                        <p className="flex-1 text-base font-medium text-description dark:text-white">{data}</p>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="mb-12">
                <h4 className="text-[18px] font-semibold mb-4 mt-12 font-clash text-black dark:text-white">
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
                    <p className="font-medium text-base font-satoshi text-description dark:text-white">{`${toolData?.author?.firstName} ${toolData?.author?.lastName}`}</p>
                  </div>
                  <Button
                    variant="link"
                    className="my-4 p-0 h-max font-clash"
                  >
                    <p className="text-secondary dark:text-white">View profile</p>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-grGray shadow-lg p-5 dark:shadow-gray-400 dark:border-none">
                <h4 className="mb-2 font-semibold text-base gap-2 flex items-center font-clash text-black dark:text-white">
                  <Image
                    width={32}
                    height={32}
                    className=""
                    alt=""
                    src={ADS_BANNER}
                  />
                  Advertisement
                </h4>
                <p className="font-medium text-base mb-6 font-satoshi text-description dark:text-white">
                  Promote your product or service to a vast audience of designers
                  and founders.
                </p>

                <Button className="h-10 px-6 font-clash font-light text-sm text-white">Fill out the form</Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <h4 className="text-[18px] font-semibold mb-4 font-clash">
                  Discover <span className="text-secondary dark:text-white">more</span> Ads
                  Management tools
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {relatedTools?.data?.map((props, index) => (
                    <ToolCard
                      key={`tool-card-${props.id}-${index}`}
                      id={props.name}
                      description={props.shortDescription as string}
                      logo={props.logo as unknown as StaticImageData}
                      thumbnail={props.logo as unknown as StaticImageData}
                      title={props.name}
                      variant="default"
                    />
                  ))}
                </div>
              </div>
              <h4 className="text-sm font-medium font-clash text-secondary dark:text-white">
                Browse <span>1</span> Ads
                Management tools
              </h4>
            </div>
            <div className="pb-0 xl:pb-12">
              <VisitButtonList url={toolData?.website} clapCountProp={clapCount} />
            </div>
          </div>

          {/* left sidebar */}
          <div className="block lg:hidden xl:block">
            <div>
              <h4 className="text-[18px] font-semibold mb-4 font-clash text-black dark:text-white">Key Features</h4>
              <p className="text-base font-medium font-satoshi text-description dark:text-white">
                {toolData?.keyFeatures?.map((key: any) => {
                  return key;
                })}
              </p>
            </div>
            <div>
              <h4 className="text-[18px] font-semibold mb-4 mt-12 font-clash text-black dark:text-white">
                Use cases
              </h4>
              <ul className="grid grid-cols-1 gap-4 font-satoshi">
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
                      <p className="flex-1 text-base font-medium text-description dark:text-white">{data}</p>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="mb-12">
              <h4 className="text-[18px] font-semibold mb-4 mt-12 font-clash text-black dark:text-white">
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
                  <p className="font-medium text-base font-satoshi text-description dark:text-white">{`${toolData?.author?.firstName} ${toolData?.author?.lastName}`}</p>
                </div>
                <Button
                  variant="link"
                  className="my-4 p-0 h-max font-clash"
                >
                  <p className="text-secondary dark:text-white">View profile</p>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-grGray shadow-lg p-5 dark:shadow-gray-400 dark:border-none">
              <h4 className="mb-2 font-semibold text-base gap-2 flex items-center font-clash text-black dark:text-white">
                <Image
                  width={32}
                  height={32}
                  className=""
                  alt=""
                  src={ADS_BANNER}
                />
                Advertisement
              </h4>
              <p className="font-medium text-base mb-6 font-satoshi text-description dark:text-white">
                Promote your product or service to a vast audience of designers
                and founders.
              </p>

              <Button className="h-10 px-6 font-clash font-light text-sm text-white">Fill out the form</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ToolsDetail
