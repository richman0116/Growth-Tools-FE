import React from "react";
import IDEA_IMAGE from "@/assets/images/idea.png";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

export const IdeaButton = () => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row items-center justify-between px-3 py-4 lg:py-8 lg:px-6 rounded-2xl shadow-lg borderGradient">
      <div className="flex items-center gap-2 lg:gap-6">
        <Image src={IDEA_IMAGE} width={40} height={40} alt="" style={{width:'auto', height:'auto'}} />
        <h4 className="font-medium text-base max-w-full lg:max-w-64 flex-1">
          Do you have a better suggestion for Email Marketing?
        </h4>
      </div>
      <Button
        variant="ghost"
        size="lg"
        className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-green-500 rounded-full text-white text-base hover:text-white"
      >
        <Plus className="w-5" />
        Submit Tool
      </Button>
    </div>
  );
};
