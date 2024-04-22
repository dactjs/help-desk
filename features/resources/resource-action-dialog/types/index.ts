export type ResourceActionDialogType =
  (typeof ResourceActionDialogType)[keyof typeof ResourceActionDialogType];

export const ResourceActionDialogType = {
  INPUT: "INPUT",
  ASSIGN: "ASSIGN",
  TRANSFER: "TRANSFER",
  UNASSIGN: "UNASSIGN",
  REPAIR: "REPAIR",
  OUTPUT: "OUTPUT",
} as const;
