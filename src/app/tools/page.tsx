"use client";
import ANNOUNCEMENT from "@/assets/images/announcement.png";
import { FilterPopoverTool } from "@/components/admin/filter-popover-tool";
import { ToolCardInfo } from "@/components/cards/tool-card-info";
import { Button } from "@/components/ui/button";
import { Grid3X3, TableProperties } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MarketingPage() {
  const pathName = usePathname();
  const keyPage = pathName.split("/")[1];
  const categoryHandle = pathName.split("/")[2];

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

  return (
    <>
      <section className="relative">
        <Image
          src={ANNOUNCEMENT}
          width={427}
          className="absolute right-0 hidden md:hidden lg:block"
          alt="Announcement"
          style={{ width: 'auto', height: 'auto' }}
          priority
        />
        <div className="py-[52px] md:px-12 md:max-w-4xl max-w-full px-4">
          <h1 className="font-extrabold text-4xl lg:text-5xl mb-6">
            Discover <span className="textGradient">marketing tools</span> that{" "}
            <br />
            supercharge your growth
          </h1>
          <p className="mb-6">
            Browse through hundreds of unique tools to boost your marketing &
            startup. Start by clicking Categories below to pick tools in
            different marketing topics.
          </p>
          <div className="flex gap-2 md:gap-6">
            <Button className="font-bold h-12">View Latest Tools</Button>
            <Button variant="outline" className="h-12">
              Trending tools
            </Button>
          </div>
        </div>
      </section>

      <section className="h-svh flex flex-col gap-6 p-4 md:p-8">
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
