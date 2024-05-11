import { accessibleBy } from "@casl/prisma";
import { TicketStatus } from "@prisma/client";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { prisma } from "@/lib/prisma";

import { ClientTicketStatGrid } from "./client";
import { TicketStatGridData } from "./types";

export interface ServerTicketStatGridProps {
  start?: Date;
  end?: Date;
}

export async function ServerTicketStatGrid({
  start,
  end,
}: ServerTicketStatGridProps) {
  const language = getAppLanguage();

  const session = await auth();

  const ability = createAbilityFor(session);

  const [tickets, dictionary] = await Promise.all([
    prisma.ticket.groupBy({
      by: "status",
      _count: { _all: true },
      where: {
        AND: [
          accessibleBy(ability).Ticket,
          { createdAt: { gte: start, lte: end } },
        ],
      },
    }),
    getDictionary(language),
  ]);

  const INITIAL_VALUES = [
    {
      status: TicketStatus.UNASSIGNED,
      count: 0,
    },
    {
      status: TicketStatus.ASSIGNED,
      count: 0,
    },
    {
      status: TicketStatus.IN_PROGRESS,
      count: 0,
    },
    {
      status: TicketStatus.RESOLVED,
      count: 0,
    },
    {
      status: TicketStatus.CLOSED,
      count: 0,
    },
    {
      status: TicketStatus.CANCELLED,
      count: 0,
    },
  ];

  const data: TicketStatGridData = INITIAL_VALUES.map(({ status, count }) => {
    const ticket = tickets.find((ticket) => ticket.status === status);

    return {
      status,
      count: ticket?._count._all ?? count,
    };
  });

  return (
    <ClientTicketStatGrid
      data={data}
      language={language}
      dictionary={{ ticket_model: dictionary.ticket_model }}
    />
  );
}
