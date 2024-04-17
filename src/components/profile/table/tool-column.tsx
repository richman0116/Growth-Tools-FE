"use client";

import { ColumnDef } from "@tanstack/react-table";
import Placeholder from "@/assets/images/placeholder.png";
import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import Image from "next/image";

export const toolColumns: ColumnDef<any>[] = [
  {
    accessorKey: "logo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Logo" />
    ),
    cell: ({ row }) => (
      <Image
        src={!!row.getValue("logo") ? row.getValue("logo") : Placeholder}
        width={40}
        height={40}
        alt="thumbnail"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px]">{row.getValue("name")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "shortDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px]">{row.getValue("shortDescription")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("price")}$
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = toolStatus.find(
  //       (status) => status.value === row.getValue("status")
  //     );

  //     const colorSwitch =
  //       status?.value === GeneralStatus.Active
  //         ? "text-green-500"
  //         : "text-red-500";

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className={`mr-1 h-4 w-4 ${colorSwitch}`} />
  //         )}
  //         <span className={`${colorSwitch} font-medium text-sm`}>
  //           {status.label}
  //         </span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
