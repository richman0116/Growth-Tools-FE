"use client";

import { SkeletonTable } from "@/components/common/skeleton-table";
import { toolColumns } from "@/components/profile/table/tool-column";
import { DataTable } from "@/components/profile/table/data-table";
import { getTools } from "@/services/tool";
import { useQuery } from "@tanstack/react-query";

export default function ProfilePage() {
  const { data } = useQuery({
    queryKey: ["tool"],
    queryFn: getTools,
  });

  return (
    <section>
      <div className="container">
        <div className="h-full flex-1 flex-col space-y-8 md:flex py-12">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Tools</h2>
              <p className="text-muted-foreground">
                Here&apos;s a list view our tools
              </p>
            </div>
          </div>
          {data?.length ? (
            <DataTable data={data as any} columns={toolColumns} />
          ) : (
            <SkeletonTable />
          )}
        </div>
      </div>
    </section>
  );
}
