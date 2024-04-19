"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { toastError } from "@/helpers/toasts";
import { Tool, publishTool } from "@/services/tool";
import { GeneralStatus } from "@/lib/enum";
import { queryClient } from "@/providers/client";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const toolData = row.original as Tool;

  // const deleteToolMutation = useMutation({
  //   mutationFn: (id: string) => deleteTool(id),
  //   mutationKey: ["delete-tool"],
  //   onSuccess(data, _variables, _context) {
  //     console.log(data);
  //   },
  //   onError: (error, _variables, _context) => {
  //     toastError(error?.message ?? "Can't delete tool, please try again!");
  //   },
  // });

  const publishedMutation = useMutation({
    mutationFn: (id: string) => publishTool(id),
    mutationKey: ["publish-tool"],
    onSuccess(data, _variables, _context) {
      if (data?.status === GeneralStatus.Published) {
        queryClient.invalidateQueries({ queryKey: ["tool"] });
      } else {
        toastError("Can't published tool, please try again!");
      }
    },
    onError: (error, _variables, _context) => {
      toastError(error?.message ?? "Can't published tool, please try again!");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>View</DropdownMenuItem>
        {toolData?.status === GeneralStatus.Pending && (
          <DropdownMenuItem
            onClick={() => publishedMutation.mutate(toolData.id)}
          >
            Published
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
