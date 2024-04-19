"use client";

import { FilterPopoverTool } from "@/components/admin/filter-popover-tool";
import { ToolCardInfo } from "@/components/cards/tool-card-info";
import { BreadcrumbDashboard } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Grid3X3, TableProperties } from "lucide-react";
import { useEffect, useState } from "react";
<<<<<<< Updated upstream
import { filterTool, getCategoryByHandle, getCategoryById, getCategoryList } from "../../../../services/tool";
=======
import {
  filterTool,
  getCategoryByHandle,
  getCategoryList,
} from "../../../../services/tool";
>>>>>>> Stashed changes
import { usePathname } from "next/navigation";

export default function MarketingPage() {
  const pathName = usePathname();
  const keyPage = pathName.split("/")[1];
  const categoryHandle = pathName.split("/")[2];

<<<<<<< Updated upstream
    const [categoryId, setCategoryId] = useState<string>("");
    const [category, setCategory] = useState<Category | undefined>(undefined);
    const [tools, setTools] = useState<ToolInfo[]>([]);
    const [page, setPage] = useState(1);
    const [take] = useState(10);
    const [sort, setSort] = useState<string | undefined>(undefined);
    const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState<PaginationMeta>({
        page: 0,
        take: 0,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: false
=======
  const [categoryId, setCategoryId] = useState<string>("");
  const [tools, setTools] = useState<ToolInfo[]>([]);
  const [page, setPage] = useState(1);
  const [take] = useState(10);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
  const [isLoading, setIsLoading] = useState(true);
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
    }
    if (sort) {
      setSort(sort);
    }
    if (order) {
      setOrder(order);
    }
  };

  useEffect(() => {
    getCategoryByHandle(categoryHandle).then((res) => {
      setCategoryId(res?.id);
>>>>>>> Stashed changes
    });
    getCategoryList().then((res) => {
      setCategories(res);
    });
    // if (!categoryId) {
    //     const redirectedCategoryId = localStorage.getItem('categoryId');
    //     if (!redirectedCategoryId) return;
    //     setCategoryId(redirectedCategoryId);
    // }
  }, []);

  useEffect(() => {
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
      setIsLoading(false);
    });
  }, [order, page, sort, take, categoryId]);

  return (
    <>
      <div className="px-12 pt-16">
        <BreadcrumbDashboard />

        <h3 className="font-bold text-[32px] mt-6 mb-8">
          528 <span className="font-medium">File Management Tools</span>
        </h3>
        <Separator />
      </div>

<<<<<<< Updated upstream
    const onFilter = (category?: Category, sort?: string, order?: "ASC" | "DESC") => {
        if (category) {
            setCategoryId(category.id)
            getCategoryById(category.id).then((res) => {
                setCategory(res)
            })
        }
        if (sort) {
            setSort(sort)
        }
        if (order) {
            setOrder(order);
        }
    }

    useEffect(() => {
        getCategoryByHandle(categoryHandle).then((res) => {
            setCategoryId(res?.id)
            setCategory(res)
        })
        getCategoryList().then((res) => {
            setCategories(res || []);
        })
        // if (!categoryId) {
        //     const redirectedCategoryId = localStorage.getItem('categoryId');
        //     if (!redirectedCategoryId) return;
        //     setCategoryId(redirectedCategoryId);
        // }
    }, [])

    useEffect(() => {
        setIsLoading(true)
        if (!categoryId) return;
        filterTool({
            order,
            page,
            take,
            sort,
            categoryId,
        }).then((res) => {
            setTools(res?.data);
            setPagination(res?.pagination)
            setIsLoading(false)
        })
    }, [order, page, sort, take, categoryId])

    return (
        <>
            <div className="px-12 pt-16">
                <BreadcrumbDashboard />

                <h3 className="font-bold text-[32px] mt-6 mb-8">
                    {pagination.itemCount} <span className="font-medium">{category?.name} tools</span>
                </h3>
                <Separator />
=======
      <section className="min-h-[700px] flex flex-col gap-6 p-4 md:p-8">
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
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!tools?.length && !isLoading && (
            <div
              className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
              role="alert"
            >
              <p className="font-bold">Ops</p>
              <p className="text-sm">We have no tool to show.</p>
>>>>>>> Stashed changes
            </div>
          )}
          {isLoading && (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
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
