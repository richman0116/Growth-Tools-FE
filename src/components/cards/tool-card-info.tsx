/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import GasIcon from "../icons/gas";
import { Clap } from "../icons/Clap";
import { Prize } from "../icons/Prize";
import { Card } from "../ui/card";

export const ToolCardInfo = (props: {
  tool: ToolInfo;
  isLoading: boolean;
  variant: "default" | "thumbnail";
}) => {
  const { tool, variant } = props;
  if (variant === "thumbnail") {
    return (
      <div>
        <Link href={`/tool/${tool.name}`}>
          <Card className="w-full flex flex-col items-center shadow-md overflow-hidden border-2 dark:shadow-gray-400 dark:border-none min-h-[260px]">
            <div className="flex z-10 justify-between w-full p-3">
              <div className="w-9 h-9 rounded-md items-center justify-center">
                <img src={tool.logo} alt="logo" className="w-full h-full rounded-sm"/>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center p-2 rounded-lg h-9 hover:bg-orange-500 hover:text-white clapIcon dark:border-white dark:border-[1px]">
                  <GasIcon />
                </div>
                <div className="flex items-center justify-center p-2 rounded-lg h-9 hover:bg-orange-500 hover:text-white clapIcon dark:border-white dark:border-[1px]">
                  <Prize className="fill-current dark:fill-white"/>
                </div>
                <div className="flex items-center justify-center p-2 rounded-lg h-9 hover:bg-orange-500 hover:text-white clapIcon text-secondary dark:text-white dark:border-white dark:border-[1px]">
                  <span className="font-semibold font-clash">Deal</span>
                </div>
              </div>
            </div>
            <div className="relative flex px-10 sm:px-15 md:px-15 lg:px-20 xl:px-[100px]">
              <img
                className="w-full rounded-lg transition-transform ease-in-out duration-200 delay-150 hover:scale-125 shadow-custom hover:shadow-hoverCustom dark:hover:shadow-gray-300"
                src={tool.logo}
                alt="thumbnail"
              />
            </div>
          </Card>
        </Link>
        <div className="mt-4">
          <h4 className="text-base font-semibold mb-2 font-clash">{tool.name}</h4>
          <p className="text-sm mb-3 line-clamp-3 font-satoshi text-description dark:text-white">{tool.description}</p>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/tool/${tool.name}`}>
      <Card className="flex shadow-md border-2 dark:border-none dark:shadow-gray-400 hover:shadow-xl min-h-[166px]">
        <div className="p-3">
          <div className="w-9 h-9 flex items-center rounded-md shadow-md">
            <img src={tool.logo} alt="logo" className="w-full h-full rounded-sm"/>
          </div>
        </div>
        <div className="w-full flex flex-col py-3 pr-3 justify-between">
          <div>
            <h4 className="text-base font-semibold mb-2 font-clash">{tool.name}</h4>
            <p className="text-sm mb-3 line-clamp-3 font-satoshi font-medium text-description dark:text-white">{tool.description}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center p-2 rounded-lg border h-9 hover:bg-orange-500 hover:text-white clapIcon dark:border-white">
                <GasIcon />
              </div>
              <div className="flex items-center justify-center p-2 rounded-lg h-9 hover:bg-orange-500 hover:text-white clapIcon text-secondary dark:text-white dark:border-white dark:border-[1px]">
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
