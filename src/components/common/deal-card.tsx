import React from "react";
import { Button } from "../ui/button";
import { EditIcon } from "../icons/EditIcon";
import { TrashIcon } from "../icons/TrashIcon";

type DealCardProps = {
  title: string;
  price: string;
  salePrice: string;
  onClick?: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
};

export const DealCard = ({
  title,
  price,
  salePrice,
  onClick,
  onEdit,
  onRemove,
}: DealCardProps) => {
  return (
    <div className="rounded-xl border border-grGray shadow-lg p-5">
      <h4 className="mb-2 font-semibold text-[18px] flex justify-between">
        {title}
        <span className="flex cursor-pointer gap-2">
          {onEdit && (
            <span onClick={onEdit}>
              <EditIcon />
            </span>
          )}
          {onRemove && (
            <span onClick={onRemove}>
              <TrashIcon />
            </span>
          )}
        </span>
      </h4>
      <p className="font-medium text-sm mb-2">
        ${salePrice} <span className="text-label">${price}</span> / monthly
      </p>
      <p className="text-accentGreen font-medium p-2 rounded-lg border border-grGray2 w-max mb-2">
        You save ${+price - +salePrice}
      </p>
      <Button
        variant="link"
        className="text-secondary p-0 h-max"
        onClick={onClick}
      >
        Click to learn more
      </Button>
    </div>
  );
};
