import React, { useCallback } from "react";
import { Button } from "../ui/button";
import { Clap } from "../icons/Clap";
import { LinkIcon } from "../icons/LinkIcon";
import { supabase } from "@/lib/supabaseClient";

export const VisitButtonList = (props: {
    url?: string
    clapCountProp: number
    toolId: string
}) => {
    const onVisitWebsite = useCallback(async () => {
        const { data } = await supabase.from('tools').select('website_view_count').eq('id', props.toolId);
        if (data) {
        const website_view_count = data[0].website_view_count + 1;
        await supabase.from('tools').update({ website_view_count }).eq('id', props.toolId)
        }
        window.open(props.url, "_blank");
    },[props.toolId, props.url])
    return (
        <div className="w-full flex gap-2 md:gap-6 my-10 justify-between items-center flex-col xl:flex-row">
            <Button className="py-7 px-10 text-base font-semibold flex items-center gap-2 font-clash w-full xl:w-8/9" onClick={onVisitWebsite}>
                Visit Website <LinkIcon fill="currentColor" />
            </Button>
            <div className="w-full xl:w-[120px] py-4 px-6 border flex items-center justify-center rounded-full gap-2 bg-orange-500 text-white">
                <span className="text-base font-bold">{props.clapCountProp}</span>
                <Clap fill="white" />
            </div>
        </div>
    );
};
