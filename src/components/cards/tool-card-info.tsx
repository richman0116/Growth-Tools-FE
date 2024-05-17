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
          <Card className="relative flex flex-col items-center shadow-lg overflow-hidden cardItem">
            <div className="absolute top-0 left-0 z-10 flex justify-between items-start w-full p-3">
              <div className="w-9 h-9 rounded-sm tagItem flex items-center justify-center">
                <img src={tool.logo} alt="logo" className="w-full h-full rounded-sm"/>
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
            <div className="relative h-64 w-[70%] flex items-end justify-end">
              <img
                className="w-full cardImageItem rounded-t-lg"
                src={tool.logo}
                alt="thumbnail"
              />
            </div>
          </Card>
        </Link>
        <div className="mt-4">
          <h4 className="text-base font-bold mb-2">{tool.name}</h4>
          <p className="text-sm mb-3 line-clamp-3">{tool.description}</p>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/tool/${tool.name}`}>
      <Card className="flex shadow-lg">
        <div className="p-3">
          <div className="w-9 h-9 border-[1px] flex items-center rounded-sm shadow-md">
            <img src={tool.logo} alt="logo" className="w-full h-full rounded-sm"/>
          </div>
        </div>
        <div className="flex-1 py-3 pr-3">
          <h4 className="text-base font-bold mb-2">{tool.name}</h4>
          <p className="text-sm mb-3 line-clamp-3">{tool.description}</p>
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
