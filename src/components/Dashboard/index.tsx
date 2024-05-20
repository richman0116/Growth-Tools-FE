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

interface IDashboard {
  categoryLists: Category[]
  filterTools: any
}

export default function Dashboard({categoryLists, filterTools}: IDashboard) {
  
  const pathName = usePathname();
  const categoryHandle = pathName.split("/")[1];

  const { setToolsListLoading } = useGlobalStoreContext();
  const [categoryId, setCategoryId] = useState<string>("");
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [tools, setTools] = useState<ToolInfo[]>([]);
  const [page, setPage] = useState(1);
  const [take] = useState(10);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
  const [isLoading, setIsLoading] = useState(false);

  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 0,
    take: 0,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [categories, setCategories] = useState<Category[]>([]);

  const [variant, setVariant] = useState<"default" | "thumbnail">("default");

  const onNextPage = () => {
    setPage(page + 1);
  };

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

  useEffect(() => {
    const initFetchingData = async () => {
      const cateListInfos = categoryLists;
      const cateInfo = cateListInfos.filter((cateListInfo) => cateListInfo.handle === "/"+categoryHandle)
      setCategoryId(cateInfo[0]?.id);
      setCategory(cateInfo[0]);
      setCategories(cateListInfos);
    };
    initFetchingData().then(() => {
    });
  }, [categoryHandle, categoryLists, setToolsListLoading]);

  useEffect(() => {
    setToolsListLoading(true);
    setIsLoading(true);
    if (!categoryId) return;

    setTools(filterTools?.data);
    setPagination(filterTools?.pagination);
    setToolsListLoading(false);
    setIsLoading(false);
  }, [setToolsListLoading, filterTools.data, filterTools?.pagination, categoryId, filterTools]);

  return (
    <>
      {
        category?.name === "Trending Tools" ?
          <MarketingToolHero />
          :
          <BreadCrumb pagination={pagination} category={category} />
      }

      <section className="h-auto min-h-[70vh] flex flex-col gap-6 p-4 md:p-8">
        <div className="flex gap-4 items-center">
          <FilterPopoverTool
            categories={categories}
            onSubmitFilter={onFilter}
          />

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
        {!tools?.length && !isLoading && (
          <div
            className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
            role="alert"
          >
            <p className="font-bold">Ops</p>
            <p className="text-sm">We have no tool to show.</p>
          </div>
        )}
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {isLoading && (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          )}
          {!!tools?.length &&
            !isLoading &&
            tools.map((tool) => (
              <ToolCardInfo
                key={`tool-card-${tool.id}`}
                variant={variant}
                tool={tool}
                isLoading={false}
              />
            ))}
        </div>
        <div className="flex justify-center">
          {pagination?.hasNextPage && (
            <Button variant="outline" onClick={onNextPage}>
              View More
            </Button>
          )}
        </div>
      </section>
    </>
  );
}
