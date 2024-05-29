import { Rocket, ShieldX, X } from "lucide-react";
import { toast } from "sonner";

export const toastError = (message: string) => {
  toast.error(message, {
    duration: 30000,
    style: {
      background: "#ef4444",
      color: "white",
      border: 1,
      display: "flex",
      alignItems: "center",
      gap: 4,
    },
    cancel: {
      label: <X size={14} />,
    },
    cancelButtonStyle: {
      background: "transparent",
      color: "white",
    },
    icon: <ShieldX size={18} />,
  });
};

export const toastSuccess = (message: string) => {
  toast.success(message, {
    duration: 6000,
    style: {
      background: "#22c55e",
      color: "white",
      border: 1,
      display: "flex",
      alignItems: "center",
      gap: 4,
    },
    cancel: {
      label: <X size={14} />,
    },
    cancelButtonStyle: {
      background: "transparent",
      color: "white",
    },
    icon: <Rocket size={18} />,
  });
};
