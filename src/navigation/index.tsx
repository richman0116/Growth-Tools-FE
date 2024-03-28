import { Role } from "@/lib/enum";
import { LogOut, LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";
import ZIP_ICON from "@/assets/icons/zip.svg";
import ANALYTICS_ICON from "@/assets/icons/analytics.svg";
import DESIGN_ICON from "@/assets/icons/design.svg";
import TODO_ICON from "@/assets/icons/to_do.svg";
import MESSAGE_ICON from "@/assets/icons/read_message.svg";
import HASHTAG_ICON from "@/assets/icons/hashtag_large.svg";
import TECHNICAL_ICON from "@/assets/icons/technical_support.svg";
import FTP_ICON from "@/assets/icons/ftp.svg";
import PROJECT_ICON from "@/assets/icons/project.svg";
import ADS_ICON from "@/assets/icons/web_advertising.svg";
import GOAL_ICON from "@/assets/icons/goal.svg";
import OPRAH_ICON from "@/assets/icons/oprah_winfrey.svg";
import VIDEO_CLIP_ICON from "@/assets/icons/video_clip.svg";
import AD_BANNER_ICON from "@/assets/icons/ad_banner.svg";
import BOT_ICON from "@/assets/icons/bot.svg";
import {
  ForwardRefExoticComponent,
  ReactElement,
  ReactNode,
  SVGProps,
} from "react";
import { Zip } from "@/components/icons/Zip";
import { Analytics } from "@/components/icons/Analytics";
import { Design } from "@/components/icons/Design";
import { Todo } from "@/components/icons/Todo";
import { ReadMessage } from "@/components/icons/ReadMessage";
import { HashTag } from "@/components/icons/HashTag";
import { TechnicalSupport } from "@/components/icons/TechnicalSupport";
import { Ftp } from "@/components/icons/Ftp";
import { Project } from "@/components/icons/Project";
import { WebAdvertising } from "@/components/icons/WebAdvertising";
import { Goal } from "@/components/icons/Goal";
import { OprahWinfrey } from "@/components/icons/OprahWinfrey";
import { VideoClip } from "@/components/icons/VideoClip";
import { AddBanner } from "@/components/icons/AddBanner";
import { Bot } from "@/components/icons/Bot";

export interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: (fill?: string) => ReactElement<any>;
    href: string;
    roles?: Role[];
  }[];
  userRole?: Role;
  onCollapse: () => void;
}

export const dashboardNavigation: NavProps["links"] = [
  {
    title: "Trending Tools",
    href: "/trending-tools",
    icon: (fill) => <Zip fill={fill} />,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: (fill) => <Analytics fill={fill} />,
  },
  {
    title: "Design",
    href: "#",
    icon: (fill) => <Design fill={fill} />,
  },
  {
    title: "Productivity",
    href: "#",
    icon: (fill) => <Todo fill={fill} />,
  },
  {
    title: "Email Marketing",
    href: "#",
    icon: (fill) => <ReadMessage fill={fill} />,
  },
  {
    title: "Social Media",
    href: "#",
    icon: (fill) => <HashTag fill={fill} />,
  },
  {
    title: "Customer Support",
    href: "#",
    icon: (fill) => <TechnicalSupport fill={fill} />,
  },
  {
    title: "File Management",
    href: "#",
    icon: (fill) => <Ftp fill={fill} />,
  },
  {
    title: "Project Management",
    href: "#",
    icon: (fill) => <Project fill={fill} />,
  },
  {
    title: "SEO",
    href: "#",
    icon: (fill) => <WebAdvertising fill={fill} />,
  },
  {
    title: "Marketing",
    href: "#",
    icon: (fill) => <Goal fill={fill} />,
  },
  {
    title: "Influencer Management",
    href: "#",
    icon: (fill) => <OprahWinfrey fill={fill} />,
  },
  {
    title: "Content",
    href: "#",
    icon: (fill) => <VideoClip fill={fill} />,
  },
  {
    title: "Ads Management",
    href: "#",
    icon: (fill) => <AddBanner fill={fill} />,
  },
  {
    title: "AI",
    href: "#",
    icon: (fill) => <Bot fill={fill} />,
  },
];
