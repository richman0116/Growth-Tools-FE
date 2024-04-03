"use client";

import { Checkbox } from "@/components/ui/checkbox";

export type CheckBoxGrowthProps = {
  checked: boolean;
  label: string;
  id: string;
  onChange?: (checked: boolean) => void;
};

export const CheckBoxGrowth = ({
  id,
  label,
  checked,
  onChange,
  ...props
}: CheckBoxGrowthProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={checked}
        id={id}
        onCheckedChange={onChange}
        {...props}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};
