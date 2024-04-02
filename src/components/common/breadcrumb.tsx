import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function BreadcrumbDashboard() {
  const pathName = usePathname();
  const keyPage = pathName.split("/")[1];
  const idPage = pathName.split("/")[2];
  const urlPage = `/${keyPage}`;

  const listPathName = pathName.split("/").map((item) => `/${item}`);

  console.log(listPathName);

  const textPage = (link: string) => {
    switch (link) {
      case "/":
        return "Home";
      case "/trending-tools":
        return "Trending tools";
      case "/analytics":
        return "Analytics";
      default:
        return "Unknown page";
    }
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {listPathName?.map((link, i) => {
          const isLastItem = i + 1 === listPathName.length;

          if (isLastItem) {
            return (
              <BreadcrumbItem key={link}>
                <BreadcrumbPage className="font-normal capitalize">
                  {link.split("/")[1]}
                </BreadcrumbPage>
              </BreadcrumbItem>
            );
          }

          return (
            <>
              <BreadcrumbItem key={link}>
                <BreadcrumbLink
                  className="font-bold text-base text-primary"
                  href={link}
                >
                  {textPage(link)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          );
        })}
        {/* <BreadcrumbItem>
          <BreadcrumbLink className="font-bold text-base text-primary" href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            className="font-bold text-base text-primary"
            href={urlPage}
          >
            {textPage()}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-normal">{idPage}</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
