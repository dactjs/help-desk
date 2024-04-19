export type ResourceActionDialogType =
  (typeof ResourceActionDialogType)[keyof typeof ResourceActionDialogType];

export const ResourceActionDialogType = {
  ASSIGN: "ASSIGN",
  TRANSFER: "TRANSFER",
  UNASSIGN: "UNASSIGN",
  REPAIR: "REPAIR",
  OUTPUT: "OUTPUT",
} as const;
