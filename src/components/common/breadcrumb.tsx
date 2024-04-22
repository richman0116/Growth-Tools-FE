import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function BreadcrumbDashboard(props: { displayName?: string }) {
  const { displayName } = props;
  const pathName = usePathname();
  const keyPage = pathName.split("/")[1];
  const idPage = pathName.split("/")[2];
  const listPathName = pathName.split("/").map((item) => `/${item}`);

  const textPage = (link: string) => {
    switch (link) {
      case "/":
        return "Home";
      case "/trending-tools":
        return "Trending tools";
      case "/analytics":
        return "Analytics";
      case "/design":
        return "Design";
      case "/productivity":
        return "Productivity";
      case "/social-media":
        return "Social Media";
      case "/email-marketing":
        return "Email Marketing";
      case "/customer-support":
        return "Customer Support";
      case "/file-management":
        return "File Management";
      case "/project-management":
        return "Project Management";
      case "/seo":
        return "SEO";
      case "/marketing":
        return "Marketing";
      case "/influencer-management":
        return "Influencer Management";
      case "/content":
        return "Content";
      case "/ads-management":
        return "Ads Management";
      case "/ai":
        return "AI";
      case "/tool":
        return "Tool";
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
              <BreadcrumbItem key={`last-item-${link}`}>
                <BreadcrumbPage className="font-normal capitalize">
                  {displayName && idPage
                    ? displayName
                    : textPage(`/${link.split("/")[1]}`)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            );
          }

          return (
            <>
              <BreadcrumbItem key={`link-${link}`}>
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
      </BreadcrumbList>
    </Breadcrumb>
  );
}
