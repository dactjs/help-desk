import { differenceInSeconds } from "date-fns/differenceInSeconds";

import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/performance";
import { prisma } from "@/lib/prisma";

import { ClientAverageTicketFirstContactTimeChart } from "./client";
import { NECESSARY_TICKET_FIELDS } from "./constants";
import { AverageTicketFirstContactTimeChartData } from "./types";

export interface ServerAverageTicketFirstContactTimeChartProps {
  start: Date;
  end: Date;
}

export async function ServerAverageTicketFirstContactTimeChart({
  start,
  end,
}: ServerAverageTicketFirstContactTimeChartProps) {
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
