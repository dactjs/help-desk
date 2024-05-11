import { ReadonlyURLSearchParams } from "next/navigation";
import { accessibleBy } from "@casl/prisma";
import { startOfDay } from "date-fns/startOfDay";
import { endOfDay } from "date-fns/endOfDay";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/logs";
import { prisma } from "@/lib/prisma";

import { ParamsSchema } from "../../_schemas";

import { ClientLogDataGrid } from "./client";
import { NECESSARY_LOG_FIELDS } from "./constants";

export interface ServerLogDataGridProps {
  searchParams: ReadonlyURLSearchParams;
}

export async function ServerLogDataGrid({
  searchParams,
}: ServerLogDataGridProps) {
  const language = getAppLanguage();

  const session = await auth();

  const ability = createAbilityFor(session);

  const params = new URLSearchParams(searchParams);

  const result = ParamsSchema.safeParse(Object.fromEntries(params));

  const start = result.data?.start ?? startOfDay(new Date());
  const end = result.data?.end ?? endOfDay(new Date());

  // TODO: add pagination
  const [logs, dictionary] = await Promise.all([
    prisma.log.findMany({
      where: {
        AND: [
          accessibleBy(ability).Log,
          { timestamp: { gte: start, lte: end } },
        ],
      },
      orderBy: { timestamp: "desc" },
      select: NECESSARY_LOG_FIELDS,
    }),
    getDictionary(language),
  ]);

  return (
    <ClientLogDataGrid
      logs={logs}
      language={language}
      dictionary={{
        log: dictionary.log,
        log_data_grid: dictionary.log_data_grid,
        log_details_dialog: dictionary.log_details_dialog,
      }}
    />
  );
}
