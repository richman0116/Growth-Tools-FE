'use client'
import { FilterPopoverTool } from "@/components/admin/filter-popover-tool";
import { ToolCardInfo } from "@/components/cards/tool-card-info";
import { Button } from "@/components/ui/button";
import { Grid3X3, TableProperties } from "lucide-react";
import { useEffect, useState } from "react";
import {
  filterTool,
  getCategoryById,
  getCategoryList,
} from "@/services/tool";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalStoreContext } from "../../hooks/GlobalStoreContext";
import MarketingToolHero from "@/components/marketingTools/MarketingToolHero";
import BreadCrumb from "@/components/marketingTools/BreadCrumb";
import clsx from "clsx";
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
  const [tools, setTools] = useState([]);
  const { isFirstRender } = useGlobalStoreContext();

  useEffect(() => {
    if (isFirstRender) {
      setTools(filterTools);
      setCategories(categoryLists)
    } else {
      (async () => {
        const { data, error } = await supabase
          .from('tools')
          .select('*')
          .order('updated_at', { ascending: false });
        if (error) {
          console.error('Error fetching data:', error.message);
          setTools([]);
        }
        const toolsData: any = data;
        const latestToolsData = toolsData.slice(0, 10);
        console.log(latestToolsData)
        setTools(latestToolsData);
      })();
    }
  }, [categoryLists, filterTools, isFirstRender, setCategories])

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
    <section className="h-auto min-h-[70vh] flex flex-col gap-6 px-4 pb-4 md:px-8 md:pb-8">
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
      {!tools?.length && (
          <div
            className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
            role="alert"
          >
            <p className="font-bold">Ops</p>
            <p className="text-sm">We have no tool to show.</p>
          </div>
        )}
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {tools?.length &&
            tools.map((tool: { id: any; }) => (
              <ToolCardInfo
                key={`tool-card-${tool.id}`}
                variant={variant}
                tool={tool}
                isLoading={false}
              />
            ))}
        </div>
    </section>
  )
}

export default LatestTools