'use client'
import GasIcon from "../icons/gas";
import { Clap } from "../icons/Clap";
import { Prize } from "../icons/Prize";
import { Card } from "../ui/card";
import Placeholder from "@/assets/images/placeholder.png";
import Image from "next/image";
import { useAuthContext } from "@/hooks/AuthContext";
import { useCallback, useEffect, useState } from "react";
import LocalStorageHandler, { USER, LATEST_TOOLS, ORDER_TOOLS } from "@/helpers/localStorage";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useGlobalStoreContext } from "@/hooks/GlobalStoreContext";

export const ToolCardInfo = (props: {
  tool: any;
  isLoading: boolean;
  variant: "default" | "thumbnail";
}) => {
  const { isLoggedIn } = useAuthContext();
  const { clapToolIds, setClapToolIds } = useGlobalStoreContext();
  const { tool, variant } = props;
  const router = useRouter();
  const [clapCount, setClapCount] = useState<number>(0)
  const [isClapping, setIsClapping] = useState<boolean>(false);
  const fetchClapCount = async (toolId: string) => {
    const { data, error } = await supabase
      .from('tools')
      .select('clap_count')
      .eq('id', toolId);

    if (error) {
      console.error('Error fetching clap count:', error.message);
      return null;
    }

    return data[0]?.clap_count || 0;
  };
  const fetchClapToolIds = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('clap_tool_ids')
      .eq('id', userId);

    if (error) {
      console.error('Error fetching user clap tool IDs:', error.message);
      return null;
    }

    return data[0]?.clap_tool_ids || [];
  };
  
  useEffect(() => {
    setClapCount(tool.clap_count)
  }, [tool.clap_count]);

  const handleToolDetail = useCallback(async (name: string, toolId: string) => {
    router.push(`/tool/${name}`)
    const { data } = await supabase.from('tools').select('tool_view_count').eq('id', toolId);
    if (data) {
      const tool_view_count = data[0].tool_view_count + 1;
      await supabase.from('tools').update({ tool_view_count }).eq('id', toolId)
    }
  },[router])

  const handleClap = useCallback(async (tool: any) => {

    if (isLoggedIn) {

      const userInfoStringify = LocalStorageHandler.get(USER);
      const userInfo: any = userInfoStringify && JSON.parse(userInfoStringify);
      const userId = userInfo && userInfo.id;

      if (!clapToolIds.includes(tool.id)) {

        setIsClapping(true);

        let clap_count = tool.clap_count + 1;
        setClapCount(clap_count);

        const { error: updateClapCountError } = await supabase
          .from('tools')
          .update({ clap_count })
          .eq('id', tool.id);
        
        if (!updateClapCountError) {

          const clap_tool_ids = await fetchClapToolIds(userId);
          clap_tool_ids.push(tool.id);

          const { error: updateClapToolIds } = await supabase
            .from('users')
            .update({ clap_tool_ids: clap_tool_ids })
            .eq('id', userId)
          
          const new_clap_tool_ids = await fetchClapToolIds(userId);
          setClapToolIds(new_clap_tool_ids);
          
          const latestToolsStringify = LocalStorageHandler.get(LATEST_TOOLS)
          if (latestToolsStringify) {

            const latestTools: any = JSON.parse(latestToolsStringify);
            const latest_tools = latestTools.map((latestTool: any) => {
              if (latestTool.id === tool.id) {
                return { ...latestTool, clap_count: latestTool.clap_count + 1 };
              } else {
                return latestTool;
              }
            });

            LocalStorageHandler.set(LATEST_TOOLS, JSON.stringify(latest_tools));
          }
          
          const orderToolsStringify = LocalStorageHandler.get(ORDER_TOOLS)
          if (orderToolsStringify) {

            const orderTools: any = JSON.parse(orderToolsStringify);
            const order_tools = orderTools.map((orderTool: any) => {
              if (orderTool.id === tool.id) {
                return { ...orderTool, clap_count: orderTool.clap_count + 1 };
              } else {
                return orderTool;
              }
            });
            
            LocalStorageHandler.set(ORDER_TOOLS, JSON.stringify(order_tools));
          }

          setIsClapping(false);
        } else {
          clap_count -= 1;
          setClapCount(clap_count);
        }
      }
    } else {
      router.push('/sign-in')
    }
  },[clapToolIds, isLoggedIn, router, setClapToolIds])

  if (variant === "thumbnail") {
    return (
      <div>
        <div onClick={() => handleToolDetail(tool.name, tool.id)} className="hover:cursor-pointer rounded-2xl shadow-xl">
          <Card className="relative w-full flex flex-col items-center overflow-hidden dark:shadow-md dark:shadow-gray-400 rounded-s-[16px]"> {/* Add fixed height */}
            <div className="px-10 sm:px-15 md:px-15 lg:px-[120px] xl:px-[50px] 2xl:px-[150px] h-[420px] mb-[-160px] pt-[70px] overflow-hidden"> {/* Add overflow-hidden */}
              <Image
                className="rounded-xl transition-transform ease-in-out duration-200 delay-150 hover:scale-125 shadow-custom hover:shadow-hoverCustom dark:hover:shadow-gray-300 h-full object-top" // Add object-cover and object-top
                src={tool.logo ? tool.logo : Placeholder}
                alt="thumbnail"
                width={300}
                height={200}
                style={{ zIndex: 20 }} // Ensure the image is above other elements
              />
            </div>
            <div className="absolute left-4 top-4 w-10 h-10 rounded-[7px] items-center justify-center border-[1px] border-gray-300 dark:border-gray-50">
              <Image src={tool.logo ? tool.logo : Placeholder} alt="logo" className="w-full h-full rounded-[7px]" width={32} height={32}/>
            </div>
            <div className="absolute flex items-center justify-between top-4 right-4">
              <div className="flex items-center gap-2">
                {
                  tool.trending_status ? <div className="flex items-center justify-center p-2 rounded-lg h-9 dark:border-white dark:border-[1px]">
                    <GasIcon />
                  </div> : ""
                }
                {
                  tool.peer_reviewed_status ? <div className="flex items-center justify-center p-2 rounded-lg h-9 dark:border-white dark:border-[1px]">
                    <Prize className="fill-current dark:fill-white"/>
                  </div> : ""
                }
                {
                  tool.deal_status ? <div className="flex items-center justify-center p-2 rounded-lg h-9 text-secondary dark:text-white dark:border-white dark:border-[1px]">
                    <span className="font-semibold font-clash">Deal</span>
                  </div> : ""
                }
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-6">
          <h4 className="text-base font-semibold mb-2 font-clash">{tool.name}</h4>
          <p className="text-sm mb-3 line-clamp-3 font-satoshi text-description dark:text-white">{tool.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div onClick={() => handleToolDetail(tool.name, tool.id)} className="hover:cursor-pointer">
      <Card className="flex shadow-xl border-[0.5px] dark:border-none dark:shadow-gray-400 hover:shadow-2xl min-h-[170px] p-[16px] gap-5 rounded-[16px]">
        <div className="mt-[3px]">
          <div className="w-10 h-10 flex items-center rounded-[7px] shadow-md border-[1px] border-gray-300 dark:border-gray-50">
            <Image src={tool.logo ? tool.logo : Placeholder} alt="logo" className="w-full h-full rounded-[7px]" width={32} height={32}/>
          </div>
        </div>
        <div className="w-full flex flex-col justify-between">
          <div>
            <h4 className="text-base font-semibold mb-2.5 font-clash">{tool.name}</h4>
            <p className="text-sm line-clamp-3 font-satoshi font-medium text-description dark:text-white">{tool.description}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {
                tool.trending_status ? <div className="flex items-center justify-center p-2 rounded-[7px] border h-9 dark:border-white dark:border-[1px]">
                  <GasIcon />
                </div> : ""
              }
              {
                tool.peer_reviewed_status ? <div className="flex items-center justify-center p-2 rounded-[7px] h-9 border dark:border-white dark:border-[1px]">
                  <Prize className="fill-current dark:fill-white"/>
                </div> : ""
              }
              {
                tool.deal_status ? <div className="flex items-center justify-center p-2 rounded-[7px] h-9 text-secondary dark:text-white dark:border-white dark:border-[1px]">
                  <span className="font-semibold font-clash">Deal</span>
                </div> : ""
              }
            </div>
            <button className="p-2 rounded-lg border flex gap-2 hover:bg-orange-500 hover:text-white clapIcon dark:border-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClap(tool);
              }}
              disabled={isClapping}
            >
              <span className="text-sm font-medium font-satoshi">{clapCount}</span>
              <Clap className="fill-white" />
          </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
