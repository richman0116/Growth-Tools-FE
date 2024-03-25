import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card } from "../ui/card";
import { StaticImageData } from "next/image";

export const ToolCard = ({
  logo,
  variant = "default",
  title,
  description,
}: {
  logo: StaticImageData;
  variant?: "default" | "thumbnail";
  title: string;
  description: string;
}) => {
  return (
    <Card className="flex p-3 gap-4">
      <div className="w-12 h-12 p-2 border-[1px] rounded-md">
        <img src={logo.src} alt="logo" className="" />
      </div>
      <div className="flex-1">
        <h4 className="text-base font-bold">{title}</h4>
        <p className="text-sm">{description}</p>
      </div>
    </Card>
  );
};
