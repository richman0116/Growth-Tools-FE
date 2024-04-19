import { Branch, GeneralStatus, Role, SafetyCheckType } from "@/lib/enum";
import { ShieldCheck, ShieldX } from "lucide-react";

export const options = [
  {
    value: "option-1",
    label: "Option 1",
  },
  {
    value: "option-2",
    label: "Option 2",
  },
];

export const toolStatus = [
  {
    value: GeneralStatus.Published,
    label: "Published",
    icon: ShieldCheck,
  },
  {
    value: GeneralStatus.Pending,
    label: "Pending",
    icon: ShieldX,
  },
];

export const roleStatus = [
  {
    value: Role.General,
    label: "General app",
  },
  {
    value: Role.User,
    label: "User app",
  },
];

export const safetyCheckOptions = [
  {
    value: SafetyCheckType.DRIVER,
    label: "Driver",
  },
  {
    value: SafetyCheckType.VEHICLE,
    label: "Vehicle",
  },
];

export const branchOptions = [
  {
    value: Branch.BW,
    label: "Berry Workshop",
  },
  {
    value: Branch.EX,
    label: "External Auditor / Consultant",
  },
  {
    value: Branch.HO,
    label: "Head Office",
  },
  {
    value: Branch.LO,
    label: "Logistics",
  },
  {
    value: Branch.ME,
    label: "Medowie",
  },
  {
    value: Branch.WO,
    label: "Workshop",
  },
];
