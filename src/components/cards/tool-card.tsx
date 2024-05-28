import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import GasIcon from "../icons/gas";
import { Clap } from "../icons/Clap";
import { Prize } from "../icons/Prize";
import { Card } from "../ui/card";
import Placeholder from "@/assets/images/placeholder.png";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
interface IToolCard {
  name: string;
  id: string;
  logo: StaticImageData;
  variant ?: "default" | "thumbnail";
  title: string;
  description: string;
  thumbnail: StaticImageData;
}

export const ToolCard = ({
  name,
  id,
  logo,
  variant = "default",
  title,
  description,
  thumbnail,
}: IToolCard) => {
  const router = useRouter();
  const handleToolDetail = useCallback(async (toolName: string, toolId: string) => {
    router.push(toolName)
    const { data } = await supabase.from('tools').select('tool_view_count').eq('id', toolId);
    if (data) {
      const tool_view_count = data[0].tool_view_count + 1;
      await supabase.from('tools').update({ tool_view_count }).eq('id', toolId)
    }
  },[router])

  if (variant === "thumbnail") {
    return (
      <div>
        <Card className="relative flex flex-col items-center overflow-hidden dark:shadow-md dark:shadow-gray-400">
          <div className="absolute top-0 left-0 z-10 flex justify-between items-start w-full p-3">
            <div className="w-9 h-9 rounded-md items-center justify-center border border-gray-300 dark:border-gray-50">
              <Image src={logo ? logo : Placeholder} alt="logo" className="w-full h-full rounded-sm" width={32} height={32} />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center p-2 rounded-lg h-9 hover:bg-orange-500 hover:text-white clapIcon text-secondary dark:text-white dark:border-white dark:border-[1px]">
                <span className="font-semibold font-clash">Deal</span>
              </div>
            </div>
          </div>
          <div className="relative flex px-10 sm:px-15 md:px-15 lg:px-20 xl:px-[100px]">
            <Image
              className="w-full rounded-lg transition-transform ease-in-out duration-200 delay-150 hover:scale-125 shadow-custom hover:shadow-hoverCustom dark:hover:shadow-gray-300"
              src={thumbnail ? thumbnail : Placeholder}
              alt="thumbnail"
              width={300}
              height={300}
            />
          </div>
        </Card>
        <div className="mt-4">
          <h4 className="text-base font-semibold mb-2 font-clash dark:text-white">{title ? title : "Title"}</h4>
          <p className="text-sm mb-3 line-clamp-3 font-satoshi text-description dark:text-white">{description ? description : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"}</p>
        </div>
      </div>
    );
  }

  return (
    <div onClick={() => handleToolDetail(name, id)} className="hover:cursor-pointer">
      <Card className="flex shadow-md dark:shadow-gray-400 hover:shadow-xl">
        <div className="p-3">
          <div className="w-9 h-9 flex items-center rounded-md shadow-md border border-gray-300 dark:border-gray-50">
             <Image
              src={logo ? logo : Placeholder}
              alt="logo"
              width={32}
              height={32}
              className="w-full h-full rounded-sm"
            />
          </div>
        </div>
        <div className="flex-1 py-3 pr-3">
          <h4 className="text-base font-semibold mb-2 font-clash whitespace-nowrap">{title}</h4>
          <p className="text-sm mb-3 line-clamp-3 font-satoshi">{description}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center p-2 rounded-lg border h-9 hover:bg-orange-500 hover:text-white clapIcon dark:border-white">
                <GasIcon />
              </div>
              <div className="flex items-center justify-center p-2 rounded-lg h-9 hover:bg-orange-500 hover:text-white clapIcon text-secondary dark:text-white dark:border-white dark:border-[1px]">
                <span className="font-semibold font-clash">Deal</span>
              </div>
            </div>
            {/* <div className="p-2 rounded-lg border flex gap-2 hover:bg-orange-500 hover:text-white clapIcon dark:border-white">
              <span className="text-sm font-medium font-satoshi">52k</span>
              <Clap className="fill-white" />
            </div> */}
          </div>
        </div>
      </Card>
    </div>
  );
};
