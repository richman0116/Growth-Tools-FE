import React from "react";
import { Button } from "../ui/button";
import { Clap } from "../icons/Clap";
import { LinkIcon } from "../icons/LinkIcon";

export const VisitButtonList = (props: {
    url?: string
    clapCountProp: number
}) => {
    const onVisitWebsite = () => {
        window.open(props.url, "_blank");
    }
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
