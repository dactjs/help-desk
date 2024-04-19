export type TicketActionDialogType =
  (typeof TicketActionDialogType)[keyof typeof TicketActionDialogType];

export const TicketActionDialogType = {
  ASSIGN: "ASSIGN",
  TRANSFER: "TRANSFER",
  OPEN: "OPEN",
  RESOLVE: "RESOLVE",
  CLOSE: "CLOSE",
  CANCEL: "CANCEL",
} as const;
