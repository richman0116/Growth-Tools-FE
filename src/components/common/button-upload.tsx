import React from "react";
import { UploadIcon } from "../icons/UploadIcon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface ButtonUploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const ButtonUpload = React.forwardRef<HTMLInputElement, ButtonUploadProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <Button
          className={cn(
            "flex gap-2 cursor-pointer rounded-full text-base font-medium h-12",
            className
          )}
          variant="outline"
          size="lg"
        >
          <UploadIcon />
          Upload avatar
        </Button>
        <Input
          className="absolute top-0 left-0 opacity-0"
          type="file"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

ButtonUpload.displayName = "ButtonUpload";

export { ButtonUpload };
