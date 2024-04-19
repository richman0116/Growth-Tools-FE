import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function BreadcrumbDashboard(props: {
    displayName?: string;
}) {

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
            case "/category":
                return "Category";
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
                            <BreadcrumbItem key={link}>
                                <BreadcrumbPage className="font-normal capitalize">
                                    {displayName ? displayName : textPage(link)}
                                    {/* {(!displayName && idPage)
                                        ? link.split("/")[1]
                                        : textPage(`/${link.split("/")[1]}`)} */}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        );
                    }

                    return (
                        <>
                            <BreadcrumbItem key={link}>
                                <BreadcrumbLink
                                    className="font-bold text-base text-primary"
                                    href={link == '/category' ? '/' : link}
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
