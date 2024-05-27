'use client'
import Link from "next/link";
import GasIcon from "../icons/gas";
import { Clap } from "../icons/Clap";
import { Prize } from "../icons/Prize";
import { Card } from "../ui/card";
import Placeholder from "@/assets/images/placeholder.png";
import Image from "next/image";
import { useAuthContext } from "@/hooks/AuthContext";
import { useCallback, useEffect, useState } from "react";
import LocalStorageHandler, { USER } from "@/helpers/localStorage";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import LoadingSpinner from "../icons/LoadingSpinner";

export const ToolCardInfo = (props: {
  tool: any;
  isLoading: boolean;
  variant: "default" | "thumbnail";
}) => {

  const { isLoggedIn } = useAuthContext();
  const { tool, variant } = props;
  const router = useRouter();
  const [clapCount, setClapCount] = useState<number>(0)
  const [clapToolIds, setClapToolIds] = useState<string[]>([])
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
    (async () => {
      const userInfoStringify = LocalStorageHandler.get(USER);
      const userInfo = userInfoStringify && JSON.parse(userInfoStringify);
      const userId = userInfo?.id;

      if (!userId) {
        console.error('User ID not found in local storage.');
        return;
      }

      const clapToolIds = await fetchClapToolIds(userId);
      setClapToolIds(clapToolIds);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const clapCount = await fetchClapCount(tool.id);
      setClapCount(clapCount);
    })();
  }, [tool.id]);


  const handleClap = useCallback(async (tool: ToolInfo) => {
    if (isLoggedIn) {
      const userInfoStringify = LocalStorageHandler.get(USER);
      const userInfo: any = userInfoStringify && JSON.parse(userInfoStringify);
      const userId = userInfo && userInfo.id;
      if (!clapToolIds.includes(tool.id)) {
        setIsClapping(true);
        const clap_count = await fetchClapCount(tool.id);
        const { error: updateClapCountError } = await supabase
          .from('tools')
          .update({ clap_count: clap_count + 1 })
          .eq('id', tool.id);
        const new_clap_count = await fetchClapCount(tool.id);
        setClapCount(new_clap_count);
        const clap_tool_ids = await fetchClapToolIds(userId);
        clap_tool_ids.push(tool.id);
        const { error: updateClapToolIds } = await supabase
          .from('users')
          .update({ clap_tool_ids: clap_tool_ids })
          .eq('id', userId)
        const new_clap_tool_ids = await fetchClapToolIds(userId);
        setClapToolIds(new_clap_tool_ids);
        setIsClapping(false);
      }
    } else {
      router.push('/sign-in')
    }
  },[clapToolIds, isLoggedIn, router])

  if (variant === "thumbnail") {
    return (
      <div>
        <Link href={`/tool/${tool.name}`}>
          <Card className="w-full flex flex-col items-center overflow-hidden min-h-[260px] dark:shadow-md dark:shadow-gray-400">
            <div className="flex z-10 justify-between w-full p-3">
              <div className="w-9 h-9 rounded-md items-center justify-center">
                <Image src={tool.logo ? tool.logo : Placeholder} alt="logo" className="w-full h-full rounded-sm" width={32} height={32}/>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center p-2 rounded-lg h-9 hover:bg-orange-500 hover:text-white clapIcon dark:border-white dark:border-[1px]">
                  <GasIcon />
                </div>
                <div className="flex items-center justify-center p-2 rounded-lg h-9 hover:bg-orange-500 hover:text-white clapIcon dark:border-white dark:border-[1px]">
                  <Prize className="fill-current dark:fill-white"/>
                </div>
                <div className="flex items-center justify-center p-2 rounded-lg h-9 hover:bg-orange-500 hover:text-white clapIcon text-secondary dark:text-white dark:border-white dark:border-[1px]">
                  <span className="font-semibold font-clash">Deal</span>
                </div>
              </div>
            </div>
            <div className="relative flex px-10 sm:px-15 md:px-15 lg:px-20 xl:px-[100px]">
              <Image
                className="w-full rounded-lg transition-transform ease-in-out duration-200 delay-150 hover:scale-125 shadow-custom hover:shadow-hoverCustom dark:hover:shadow-gray-300"
                src={tool.logo ? tool.logo : Placeholder}
                alt="thumbnail"
                width={300}
                height={300}
              />
            </div>
          </Card>
        </Link>
        <div className="mt-4">
          <h4 className="text-base font-semibold mb-2 font-clash">{tool.name}</h4>
          <p className="text-sm mb-3 line-clamp-3 font-satoshi text-description dark:text-white">{tool.description}</p>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/tool/${tool.name}`}>
      <Card className="flex shadow-md border-2 dark:border-none dark:shadow-gray-400 hover:shadow-xl min-h-[166px]">
        <div className="p-3">
          <div className="w-9 h-9 flex items-center rounded-md shadow-md">
            <Image src={tool.logo ? tool.logo : Placeholder} alt="logo" className="w-full h-full rounded-sm" width={32} height={32}/>
          </div>
        </div>
        <div className="w-full flex flex-col py-3 pr-3 justify-between">
          <div>
            <h4 className="text-base font-semibold mb-2 font-clash">{tool.name}</h4>
            <p className="text-sm mb-3 line-clamp-3 font-satoshi font-medium text-description dark:text-white">{tool.description}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center p-2 rounded-lg border h-9 hover:bg-orange-500 hover:text-white clapIcon dark:border-white">
                <GasIcon />
              </div>
              <div className="flex items-center justify-center p-2 rounded-lg h-9 hover:bg-orange-500 hover:text-white clapIcon text-secondary dark:text-white dark:border-white dark:border-[1px]">
                <span className="font-semibold font-clash">Deal</span>
              </div>
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
    </Link>
  );
};
