import { TicketStatus } from "@prisma/client";

export type TicketStatGridData = Array<{
  status: TicketStatus;
  count: number;
}>;
