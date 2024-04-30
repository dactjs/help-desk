export type TicketActionDialogType =
  (typeof TicketActionDialogType)[keyof typeof TicketActionDialogType];

export const TicketActionDialogType = {
  TAKE: "TAKE",
  ASSIGN: "ASSIGN",
  TRANSFER: "TRANSFER",
  OPEN: "OPEN",
  RESOLVE: "RESOLVE",
  CLOSE: "CLOSE",
  CANCEL: "CANCEL",
} as const;
