import { startOfWeek } from "date-fns/startOfWeek";
import { endOfWeek } from "date-fns/endOfWeek";

import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { prisma } from "@/lib/prisma";

import { ClientTicketWeeklyActivityChart } from "./client";
import { DAYS } from "./constants";
import { TicketWeeklyActivityChartData } from "./types";

type Serie = Omit<TicketWeeklyActivityChartData[number], "hour">;

export async function ServerTicketWeeklyActivityChart() {
  const language = getAppLanguage();

  const now = Date.now();

  const [tickets, dictionary] = await Promise.all([
    prisma.ticket.findMany({
      where: {
        createdAt: {
          gte: startOfWeek(now),
          lte: endOfWeek(now),
        },
      },
    }),
    getDictionary(language),
  ]);

  const INITIAL_VALUES = Array.from({ length: 23 }).reduce<
    Record<number, Serie>
  >(
    (acc, _, index) => ({
      ...acc,
      [index]: {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      },
    }),
    {}
  );

  const data = Object.entries(
    tickets.reduce<Record<number, Serie>>((acc, current) => {
      const hour = current.createdAt.getHours();
      const day = DAYS[current.createdAt.getDay() as keyof typeof DAYS];

      return {
        ...acc,
        [hour]: {
          ...acc[hour],
          [day]: acc[hour][day] + 1,
        },
      };
    }, INITIAL_VALUES)
  ).map(([hour, count]) => ({ hour: Number(hour), ...count }));

  return (
    <ClientTicketWeeklyActivityChart
      data={data}
      dictionary={{
        ticket_weekly_activity_chart: dictionary.ticket_weekly_activity_chart,
      }}
    />
  );
}
