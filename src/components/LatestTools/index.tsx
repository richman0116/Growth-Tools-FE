'use client'
import { FilterPopoverTool } from "@/components/admin/filter-popover-tool";
import { ToolCardInfo } from "@/components/cards/tool-card-info";
import { Button } from "@/components/ui/button";
import { Grid3X3, TableProperties } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getCategoryById,
} from "@/services/tool";
import { useGlobalStoreContext } from "../../hooks/GlobalStoreContext";
import MarketingToolHero from "@/components/marketingTools/MarketingToolHero";
import clsx from "clsx";
import LocalStorageHandler, {USER, LATEST_TOOLS} from "@/helpers/localStorage";
import { supabase } from "@/lib/supabaseClient";

interface ILatestTools {
  categoryLists: Category[]
  filterTools: any
}

const LatestTools = ({ categoryLists, filterTools }: ILatestTools) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [variant, setVariant] = useState<"default" | "thumbnail">("default");
  const [categoryId, setCategoryId] = useState<string>("");
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const { isFirstRender, setClapToolIds, setIsFirstRender, isPublishedTool, latestToolsData,  setLatestToolsData } = useGlobalStoreContext();


  useEffect(() => {
    const userInfoStringify = LocalStorageHandler.get(USER);
    if (userInfoStringify) {
      const userInfo: any = JSON.parse(userInfoStringify);
      const userId = userInfo && userInfo.id;
      (async () => {
        const { data, error } = await supabase
          .from('users')
          .select('clap_tool_ids')
          .eq('id', userId);
        if (error) {
          console.error('Error fetching user clap tool IDs:', error.message);
          setClapToolIds([]);
        }
  
        const clap_tool_ids = data ? data[0]?.clap_tool_ids : [];
        setClapToolIds(clap_tool_ids)
      })();
    } else {
      setClapToolIds([]);
    }
  },[setClapToolIds])

  useEffect(() => {
    if (isFirstRender) {
      setLatestToolsData(filterTools);
      setCategories(categoryLists);
      setIsFirstRender(false);
      LocalStorageHandler.set(LATEST_TOOLS, JSON.stringify(filterTools))
    } else if (isPublishedTool) {
      const latestToolsStringify = LocalStorageHandler.get(LATEST_TOOLS)
      if (latestToolsStringify) {
        const latestTools: any = JSON.parse(latestToolsStringify);
        setLatestToolsData(latestTools);
        setCategories(categoryLists);
      }
    } else {
      const latestToolsStringify = LocalStorageHandler.get(LATEST_TOOLS)
      if (latestToolsStringify) {
        const latestTools: any = JSON.parse(latestToolsStringify);
        setLatestToolsData(latestTools);
        setCategories(categoryLists);
      }
    }

  }, [categoryLists, filterTools, isFirstRender, isPublishedTool, setIsFirstRender, setLatestToolsData])

  const onFilter = (
    category?: Category,
    sort?: string,
    order?: "ASC" | "DESC"
  ) => {
    if (category) {
      setCategoryId(category.id);
      getCategoryById(category.id).then((res) => {
        setCategory(res);
      });
    }
    if (sort) {
      setSort(sort);
    }
    if (order) {
      setOrder(order);
    }
  };
  
  return (

    <>
      <MarketingToolHero toolName="latest " />
      <section className="h-auto min-h-[70vh] flex flex-col gap-6 px-4 pb-4 md:px-12 md:pb-14">
        <div className="flex gap-4 items-center border-t-[1px] pt-4 md:pt-8">
          <FilterPopoverTool
            categories={categories}
            onSubmitFilter={onFilter}
          />

          <span className="font-medium font-sm font-satoshi text-description dark:text-white text-sm">Show as:</span>
          <Button
            variant="ghost"
            size="icon"
            className="p-0 w-auto h-auto"
            onClick={() => setVariant("default")}
          >
            <TableProperties
              className={clsx(
                variant === "default" ? "text-[#164CD9]" : "text-black dark:text-white"
              )}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="p-0 w-auto h-auto"
            onClick={() => setVariant("thumbnail")}
          >
            <Grid3X3
              className={clsx(
                variant === "thumbnail" ? "text-[#164CD9]" : "text-black dark:text-white"
              )}
            />
          </Button>
        </div>
        {!latestToolsData?.length && (
            <div
              className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
              role="alert"
            >
              <p className="font-bold">Ops</p>
              <p className="text-sm">We have no tool to show.</p>
            </div>
          )}
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-7 gap-y-9">
            {latestToolsData?.length ?
              latestToolsData.map((tool: { id: any; clap_count?:any }) => (
                <ToolCardInfo
                  key={`tool-card-${tool?.id}`}
                  variant={variant}
                  tool={tool}
                  isLoading={false}
                />
              )) : ""}
          </div>
      </section>
    </>
  )
}

export default LatestTools