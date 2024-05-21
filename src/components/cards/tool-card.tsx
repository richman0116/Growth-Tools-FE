import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import GasIcon from "../icons/gas";
import { Clap } from "../icons/Clap";
import { Prize } from "../icons/Prize";
import { Card } from "../ui/card";
import Placeholder from "@/assets/images/placeholder.png";

export const ToolCard = ({
  id,
  logo,
  variant = "default",
  title,
  description,
  thumbnail,
}: {
  id: string;
  logo: StaticImageData;
  variant?: "default" | "thumbnail";
  title: string;
  description: string;
  thumbnail: StaticImageData;
}) => {
  if (variant === "thumbnail") {
    return (
      <div>
        <Link href={id}>
          <Card className="relative flex flex-col items-center shadow-lg overflow-hidden cardItem">
            <div className="absolute top-0 left-0 z-10 flex justify-between items-start w-full p-3">
              <div className="w-8 h-8 flex items-center rounded-lg">
                <Image
                  src={logo ? logo : Placeholder}
                  width={32}
                  height={32}
                  alt="logo"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg">
                  <GasIcon />
                </div>
                <div className="p-2 rounded-lg">
                  <Prize />
                </div>
                <div className="p-2 rounded-lg">
                  <span className="font-semibold text-secondary">Deal</span>
                </div>
              </div>
            </div>
            <div className="relative h-64 w-[70%]">
              <Image
                className="w-3/4 cardImageItem"
                src={thumbnail ? thumbnail : Placeholder}
                fill
                alt="thumbnail"
              />
            </div>
          </Card>
        </Link>
        <div className="mt-4">
          <h4 className="text-base font-bold mb-2">{title}</h4>
          <p className="text-sm mb-3 line-clamp-3">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <Link href={id}>
      <Card className="flex shadow-lg border dark:border-white dark:shadow-gray-400">
        <div className="p-3">
          <div className="w-9 h-9 flex items-center rounded-md shadow-md">
             <Image
              src={logo}
              height={32}
              width={32}
              alt="logo"
              className="w-full h-full rounded-sm"
            />
          </div>
        </div>
        <div className="flex-1 py-3 pr-3">
          <h4 className="text-base font-semibold mb-2 font-clash">{title}</h4>
          <p className="text-sm mb-3 line-clamp-3 font-satoshi">{description}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center p-2 rounded-lg border h-9 hover:bg-orange-500 hover:text-white clapIcon dark:border-white">
                <GasIcon />
              </div>
              <div className="flex items-center justify-center p-2 rounded-lg border h-9 hover:bg-orange-500 hover:text-white clapIcon dark:text-white dark:border-white">
                <Prize className="fill-current dark:fill-white"/>
              </div>
              <div className="flex items-center justify-center p-2 rounded-lg border h-9 hover:bg-orange-500 hover:text-white clapIcon text-secondary dark:text-white dark:border-white">
                <span className="font-semibold font-clash">Deal</span>
              </div>
            </div>
            <div className="p-2 rounded-lg border flex gap-2 hover:bg-orange-500 hover:text-white clapIcon dark:border-white">
              <span className="text-sm font-medium font-satoshi">52k</span>
              <Clap className="fill-white" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
