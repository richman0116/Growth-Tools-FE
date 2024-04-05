import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, suffix, ...props }, ref) => {
    return (
      <div className="flex items-center relative">
        {prefix && (
          <span className="border-r left-0 absolute w-24 h-full flex items-center justify-center font-bold text-[#8C8C8C] text-base">
            {prefix}
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-full border border-input bg-transparent px-3 py-1 text-sm shadow-md hover:shadow-lg transition-colors outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-secondary focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            prefix ? "!pl-28" : "",
            suffix ? "!pr-28" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <span className="border-l right-0 absolute w-24 h-full flex items-center justify-center font-bold text-[#8C8C8C] text-base">
            {suffix}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
