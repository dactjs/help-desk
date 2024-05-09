import { Prisma, TicketTraceType } from "@prisma/client";

export const NECESSARY_TICKET_FIELDS = {
  traces: {
    where: {
      type: {
        in: [
          TicketTraceType.RECEPTION,
          TicketTraceType.RESOLVED,
          TicketTraceType.CANCELLED,
        ],
      },
    },
    take: 2,
    orderBy: { createdAt: "asc" },
    select: { createdAt: true },
  },
} satisfies Prisma.TicketFindManyArgs["select"];
