import { CirclePlus } from "lucide-react";

type AddDealCardProps = {
  title: string;
  onClick?: () => void;
};

export const AddDealCard = ({ title, onClick }: AddDealCardProps) => {
  return (
    <div
      className="rounded-xl border border-grGray flex flex-col min-h-44 gap-4 items-center justify-center shadow-md hover:shadow-lg p-5 cursor-pointer w-full dark:shadow-gray-400 dark:hover:shadow-gray-400"
      onClick={onClick}
    >
      <CirclePlus size={48} className="text-secondary dark:text-white" />
      <h3 className="text-secondary text-sm font-medium font-clash dark:text-white">{title}</h3>
    </div>
  );
};
