"use client";

import { SkeletonTable } from "@/components/common/skeleton-table";
import { toolColumns } from "@/components/profile/table/tool-column";
import { DataTable } from "@/components/profile/table/data-table";
import { getTools } from "@/services/tool";
import { useQuery } from "@tanstack/react-query";

export default function ProfilePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["tool"],
    queryFn: getTools,
  });

  return (

    <section>
      <div className="container">
        <div className="h-vh flex-1 flex-col space-y-8 md:flex py-12">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight font-clash">Tools</h2>
              <p className="text-muted-foreground font-satoshi">
                Here&apos;s a list view our tools
              </p>
            </div>
          </div>
          {isLoading ? (
            <SkeletonTable />
          ) : data?.data?.length ? (
            <DataTable data={data?.data as any} columns={toolColumns} />
          ) : (
            <div
              className="bg-blue-100 border border-secondary text-secondary rounded-md px-4 py-3"
              role="alert"
            >
              <p className="font-bold">Ops</p>
              <p className="text-sm">We have no tool to show.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
