import { cn } from "@/lib/utils";
import React from "react";
import { UploadIcon } from "../icons/UploadIcon";
import { Button } from "../ui/button";

interface ButtonUploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const ButtonUpload = React.forwardRef<HTMLInputElement, ButtonUploadProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-max">
        <Button
          className={cn(
            "flex gap-2 cursor-pointer rounded-full w-max text-base font-medium h-12",
            className
          )}
          variant="outline"
          size="lg"
        >
          <UploadIcon />
          Upload avatar
        </Button>
        <input
          type="file"
          className={
            "cursor-pointer absolute top-0 left-0 h-full w-full opacity-0"
          }
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

ButtonUpload.displayName = "ButtonUpload";

export { ButtonUpload };
