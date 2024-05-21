import React from "react";
import { Button } from "../ui/button";
import { Clap } from "../icons/Clap";
import { LinkIcon } from "../icons/LinkIcon";

export const VisitButtonList = (props: {
    url?: string
}) => {
    const onVisitWebsite = () => {
        window.open(props.url, "_blank");
    }
    return (
        <div className="grid grid-cols-[minmax(0,_1fr)_110px] gap-2 md:gap-6 my-10">
            <Button className="h-[52px] text-base font-semibold flex items-center gap-2 font-clash" onClick={onVisitWebsite}>
                Visit Website <LinkIcon fill="currentColor" />
            </Button>
            <div className="p-2 border flex h-[52px] items-center justify-center rounded-full gap-2 bg-orange-500 text-white">
                <span className="text-base font-bold">52k</span>
                <Clap fill="white" />
            </div>
        </div>
    );
};
