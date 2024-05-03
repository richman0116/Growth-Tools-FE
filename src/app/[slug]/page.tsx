"use client";

import { FilterPopoverTool } from "@/components/admin/filter-popover-tool";
import { ToolCardInfo } from "@/components/cards/tool-card-info";
import { BreadcrumbDashboard } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Grid3X3, TableProperties } from "lucide-react";
import { useEffect, useState } from "react";
import {
  filterTool,
  getCategoryByHandle,
  getCategoryById,
  getCategoryList,
} from "@/services/tool";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalStoreContext } from "../../hooks/GlobalStoreContext";

export default function MarketingPage() {
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
    setToolsListLoading(true);
    const initFetchingData = async () => {
      const [cateInfo, cateListInfo] = await Promise.all([
        getCategoryByHandle(categoryHandle),
        getCategoryList(),
      ]);
      setCategoryId(cateInfo?.id);
      setCategory(cateInfo);
      setCategories(cateListInfo);
    };
    initFetchingData().then(() => {
      setToolsListLoading(false);
    });
    // getCategoryByHandle(categoryHandle).then((res) => {
    //   setCategoryId(res?.id);
    //   setCategory(res);
    // });
    // getCategoryList().then((res) => {
    //   setCategories(res || []);
    // });
  }, [categoryHandle, setToolsListLoading]);

  useEffect(() => {
    setToolsListLoading(true);
    setIsLoading(true);
    if (!categoryId) return;

    filterTool({
      order,
      page,
      take,
      sort,
      categoryId,
    }).then((res) => {
      setTools(res?.data);
      setPagination(res?.pagination);
      setToolsListLoading(false);
      setIsLoading(false);
    });
  }, [order, page, sort, take, categoryId, setToolsListLoading]);

  return (
    <>
      <div className="md:px-12 md:pt-16 pt-6 px-6">
        <BreadcrumbDashboard />

        <h3 className="font-bold text-[32px] mt-6 mb-8 font-clash">
          {pagination.itemCount}{" "}
          <span className="font-medium font-clash">{category?.name} tools</span>
        </h3>
        <Separator />
      </div>

      <section className="h-[70vh] flex flex-col gap-6 p-4 md:p-8">
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
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
