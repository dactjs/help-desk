import { accessibleBy } from "@casl/prisma";
import { TicketStatus } from "@prisma/client";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/performance";
import { prisma } from "@/lib/prisma";

import { ClientTicketCompletionRateChart } from "./client";
import { TicketCompletionRateChartData } from "./types";

export interface ServerTicketCompletionRateChartProps {
  start?: Date;
  end?: Date;
}

export async function ServerTicketCompletionRateChart({
  start,
  end,
}: ServerTicketCompletionRateChartProps) {
  const language = getAppLanguage();

  const session = await auth();

  const ability = createAbilityFor(session);

  const [completed, uncompleted, dictionary] = await Promise.all([
    prisma.ticket.count({
      where: {
        AND: [
          accessibleBy(ability).Ticket,
          {
            status: {
              in: [
                TicketStatus.RESOLVED,
                TicketStatus.CLOSED,
                TicketStatus.CANCELLED,
              ],
            },
          },
          { createdAt: { gte: start, lte: end } },
        ],
      },
    }),
    prisma.ticket.count({
      where: {
        AND: [
          accessibleBy(ability).Ticket,
          {
            status: {
              in: [
                TicketStatus.UNASSIGNED,
                TicketStatus.ASSIGNED,
                TicketStatus.IN_PROGRESS,
              ],
            },
          },
          { createdAt: { gte: start, lte: end } },
        ],
      },
    }),
    getDictionary(language),
  ]);

  const data: TicketCompletionRateChartData = {
    completed,
    uncompleted,
  };

  return (
    <ClientTicketCompletionRateChart
      data={data}
      dictionary={{
        ticket_completion_rate_chart: dictionary.ticket_completion_rate_chart,
      }}
    />
  );
}
