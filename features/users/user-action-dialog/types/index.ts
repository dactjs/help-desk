export type UserActionDialogType =
  (typeof UserActionDialogType)[keyof typeof UserActionDialogType];

export const UserActionDialogType = {
  RESET_PASSWORD: "RESET_PASSWORD",
} as const;
