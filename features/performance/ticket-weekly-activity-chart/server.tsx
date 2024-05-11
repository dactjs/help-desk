import { accessibleBy } from "@casl/prisma";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/performance";
import { prisma } from "@/lib/prisma";

import { ClientTicketWeeklyActivityChart } from "./client";
import { DAYS } from "./constants";
import { TicketWeeklyActivityChartData } from "./types";

type Serie = Omit<TicketWeeklyActivityChartData[number], "hour">;

export interface ServerTicketWeeklyActivityChartProps {
  start?: Date;
  end?: Date;
}

export async function ServerTicketWeeklyActivityChart({
  start,
  end,
}: ServerTicketWeeklyActivityChartProps) {
  const language = getAppLanguage();

  const session = await auth();

  const ability = createAbilityFor(session);

  const [tickets, dictionary] = await Promise.all([
    prisma.ticket.findMany({
      where: {
        AND: [
          accessibleBy(ability).Ticket,
          { createdAt: { gte: start, lte: end } },
        ],
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

  const data: TicketWeeklyActivityChartData = Object.entries(
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
