import { differenceInSeconds } from "date-fns/differenceInSeconds";

import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/performance";
import { prisma } from "@/lib/prisma";

import { ClientAverageTicketResolutionTimeChart } from "./client";
import { NECESSARY_TICKET_FIELDS } from "./constants";
import { AverageTicketResolutionTimeChartData } from "./types";

export interface ServerAverageTicketResolutionTimeChartProps {
  start: Date;
  end: Date;
}

export async function ServerAverageTicketResolutionTimeChart({
  start,
  end,
}: ServerAverageTicketResolutionTimeChartProps) {
  const language = getAppLanguage();

  // TODO: add auth
  const [tickets, dictionary] = await Promise.all([
    prisma.ticket.findMany({
      where: { createdAt: { gte: start, lte: end } },
      select: NECESSARY_TICKET_FIELDS,
    }),
    getDictionary(language),
  ]);

  const total = tickets.reduce((prev, current) => {
    if (current.traces.length < 2) return prev;

    const first = current.traces[0];
    const last = current.traces[current.traces.length - 1];

    const diff = differenceInSeconds(last.createdAt, first.createdAt);

    return prev + diff;
  }, 0);

  const data: AverageTicketResolutionTimeChartData = total / tickets.length;

  return (
    <ClientAverageTicketResolutionTimeChart
      data={data}
      dictionary={{
        average_ticket_resolution_time_chart:
          dictionary.average_ticket_resolution_time_chart,
      }}
    />
  );
}
