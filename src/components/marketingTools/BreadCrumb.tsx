import { BreadcrumbDashboard } from "../common/breadcrumb";
import { Separator } from "@radix-ui/react-dropdown-menu";

const BreadCrumb = ({pagination, category}:any) => {
  return (
    <div className="md:px-12 md:pt-16 pt-6 px-6">
      <BreadcrumbDashboard />
      <h3 className="font-bold text-[32px] mt-6 mb-8 font-clash">
        {pagination.itemCount}{" "}
        <span className="font-medium font-clash">{category?.name} tools</span>
      </h3>
      <Separator />
    </div>
  )
}

export default BreadCrumb