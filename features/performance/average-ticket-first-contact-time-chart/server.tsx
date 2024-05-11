import { accessibleBy } from "@casl/prisma";
import { TicketTraceType } from "@prisma/client";
import { differenceInSeconds } from "date-fns/differenceInSeconds";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/performance";
import { prisma } from "@/lib/prisma";

import { ClientAverageTicketFirstContactTimeChart } from "./client";
import { AverageTicketFirstContactTimeChartData } from "./types";

export interface ServerAverageTicketFirstContactTimeChartProps {
  start?: Date;
  end?: Date;
  technicianId?: string;
}

export async function ServerAverageTicketFirstContactTimeChart({
  start,
  end,
  technicianId,
}: ServerAverageTicketFirstContactTimeChartProps) {
  const language = getAppLanguage();

  const session = await auth();

  const ability = createAbilityFor(session);

  const [tickets, dictionary] = await Promise.all([
    prisma.ticket.findMany({
      where: {
        AND: [
          accessibleBy(ability).Ticket,
          {
            assignedToId: technicianId,
            createdAt: { gte: start, lte: end },
          },
        ],
      },
      select: {
        traces: {
          where: {
            AND: [
              accessibleBy(ability).TicketTrace,
              {
                type: {
                  in: [
                    TicketTraceType.RECEPTION,
                    TicketTraceType.ASSIGNMENT,
                    TicketTraceType.CANCELLED,
                  ],
                },
              },
            ],
          },
          orderBy: { createdAt: "asc" },
          select: { createdAt: true },
        },
      },
    }),
    getDictionary(language),
  ]);

  const total = tickets.reduce((prev, current) => {
    if (current.traces.length < 2) return prev;

    const [first, last] = current.traces;

    const diff = differenceInSeconds(last.createdAt, first.createdAt);

    return prev + diff;
  }, 0);

  const data: AverageTicketFirstContactTimeChartData = total / tickets.length;

  return (
    <ClientAverageTicketFirstContactTimeChart
      data={data}
      dictionary={{
        average_ticket_first_contact_time_chart:
          dictionary.average_ticket_first_contact_time_chart,
      }}
    />
  );
}
