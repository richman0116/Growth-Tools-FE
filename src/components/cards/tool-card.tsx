import { StaticImageData } from "next/image";
import Link from "next/link";
import GasIcon from "../common/icons/gas";
import { Card } from "../ui/card";
import Image from 'next/image'

export const ToolCard = ({
  logo,
  variant = "default",
  title,
  description,
  thumbnail,
}: {
  logo: StaticImageData;
  variant?: "default" | "thumbnail";
  title: string;
  description: string;
  thumbnail: StaticImageData;
}) => {
  if (variant === "thumbnail") {
    return (
      <div>
        <Link href="#">
          <Card className="relative flex flex-col items-center shadow-lg">
            <div className="absolute top-0 left-0 z-10 flex justify-between w-full p-3">
              <div className="w-12 h-12 p-2">
                <Image src={logo.src} alt="logo" />
              </div>
              <div className="flex gap-2">
                <GasIcon />
                <span className="font-semibold text-secondary">Deal</span>
              </div>
            </div>
            <Image className="w-3/4" src={thumbnail.src} alt="thumbnail" />
          </Card>
        </Link>
        <div className="mt-4">
          <h4 className="text-base font-bold mb-2">{title}</h4>
          <p className="text-sm mb-3">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <Link href="#">
      <Card className={`flex shadow-lg`}>
        <div className="p-3">
          <div className="w-12 h-12 p-2 border-[1px] rounded-md shadow-md">
            <Image width={48} height={48} src={logo.src} alt="logo" />
          </div>
        </div>
        <div className="flex-1 py-3 pr-3">
          <h4 className="text-base font-bold mb-2">{title}</h4>
          <p className="text-sm mb-3">{description}</p>
          <div className="flex gap-2">
            <GasIcon />
            <span className="font-semibold text-secondary">Deal</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
