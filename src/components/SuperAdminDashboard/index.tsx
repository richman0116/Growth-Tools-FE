import { ToolDatas } from "@/mockData/mockData"
import Image from "next/image"
import Placeholder from "@/assets/images/placeholder.png";
import { Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SuperAdminDashboard = async () => {
  return (
    <section className="h-auto min-h-[70vh] flex flex-col gap-6 p-4 md:px-8 md:py-8">
      <table className="">
        <thead className="dark:bg-[#211b41]">
          <tr className="font-clash text-sm">
            <th className="py-5">Tool ID</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Short Description</th>
            <th>Description</th>
            <th>Website</th>
            <th>Key Features</th>
            <th>Screenshots</th>
            <th>Deals</th>
            <th>Usecases</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="">
          {
            ToolDatas.map((toolData, index) => (
              <tr key={index} className="text-center font-satoshi odd:bg-gray-200 even:bg-white text-xs odd:dark:bg-[#2b234d] even:dark:bg-[#211b41]">
                <td className="py-5">{toolData.id}</td>
                <td>{toolData.name}</td>
                <td><Image src={toolData.logo ? toolData.logo : Placeholder} width={32} height={27} alt="tool logo" className="m-auto" /></td>
                <td>{toolData.shortDescription}</td>
                <td>{toolData.description}</td>
                <td>{toolData.website}</td>
                <td>{toolData.keyFeatures}</td>
                <td>{toolData.screenshots}</td>
                <td>{toolData.deals}</td>
                <td>{toolData.useCases}</td>
                <td>{toolData.price}</td>
                <td><div className={cn("w-[85px] py-1.5 rounded-full m-auto", toolData.status === "Published" ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500")}>{toolData.status}</div></td>
                <td><div className="flex gap-3 justify-center items-center"><Edit className="w-5 text-purple-600" /><Trash2 className="w-5 text-red-500"/></div></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  )
}

export default SuperAdminDashboard