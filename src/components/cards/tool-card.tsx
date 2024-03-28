import { StaticImageData } from "next/image";
import Link from "next/link";
import GasIcon from "../common/icons/gas";
import { Card } from "../ui/card";
import Image from "next/image";
import { Prize } from "../icons/Prize";
import { Clap } from "../icons/Clap";
import { useRef } from "react";

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
          <Card className="relative flex flex-col items-center shadow-lg overflow-hidden cardItem">
            <div className="absolute top-0 left-0 z-10 flex justify-between items-start w-full p-3">
              <div className="w-12 h-12 p-2 rounded-lg tagItem">
                <Image src={logo.src} width={48} height={48} alt="logo" />
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg tagItem">
                  <GasIcon />
                </div>
                <div className="p-2 rounded-lg tagItem">
                  <Prize />
                </div>
                <div className="p-2 rounded-lg tagItem">
                  <span className="font-semibold text-secondary">Deal</span>
                </div>
              </div>
            </div>
            <Image
              className="w-3/4 cardImageItem"
              src={thumbnail.src}
              width={225}
              height={200}
              alt="thumbnail"
            />
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
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg border h-9">
                <GasIcon />
              </div>
              <div className="p-2 rounded-lg h-9">
                <Prize />
              </div>
              <div className="p-2 rounded-lg h-9">
                <span className="font-semibold text-secondary">Deal</span>
              </div>
            </div>
            <div className="p-2 rounded-lg border flex gap-2 hover:bg-orange-500 hover:text-white clapIcon">
              <span className="text-sm font-medium">52k</span>
              <Clap className="fill-white" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
