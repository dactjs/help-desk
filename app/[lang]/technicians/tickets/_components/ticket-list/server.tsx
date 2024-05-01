import { ReadonlyURLSearchParams } from "next/navigation";
import { accessibleBy } from "@casl/prisma";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { prisma } from "@/lib/prisma";

import { ClientTicketList } from "./client";
import { DEFAULT_PAGINATION } from "./config";
import { NECESSARY_TICKET_FIELDS } from "./constants";

export interface ServerTicketListProps {
  searchParams: ReadonlyURLSearchParams;
}

export async function ServerTicketList({
  searchParams,
}: ServerTicketListProps) {
  const language = getAppLanguage();

  const session = await auth();

  const ability = createAbilityFor(session);

  const params = new URLSearchParams(searchParams);

  const search = params.get("search");

  const status = params.get("status");

  const page = params.get("page")
    ? Number(params.get("page"))
    : DEFAULT_PAGINATION.PAGE;

  const pageSize = params.get("pageSize")
    ? Number(params.get("pageSize"))
    : DEFAULT_PAGINATION.PAGE_SIZE;

  const [tickets, count, dictionary] = await Promise.all([
    prisma.ticket.findMany({
      where: {
        AND: [
          accessibleBy(ability).Ticket,
          {
            ...(search && { issue: { mode: "insensitive", contains: search } }),
            ...(status && { status: { in: JSON.parse(status) } }),
          },
        ],
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { createdAt: "desc" },
      select: NECESSARY_TICKET_FIELDS,
    }),
    prisma.ticket.count({
      where: {
        AND: [
          accessibleBy(ability).Ticket,
          {
            ...(search && { issue: { mode: "insensitive", contains: search } }),
            ...(status && { status: { in: JSON.parse(status) } }),
          },
        ],
      },
    }),
    getDictionary(language),
  ]);

  return (
    <ClientTicketList
      tickets={tickets}
      count={count}
      language={language}
      dictionary={{
        ticket_model: dictionary.ticket_model,
        ticket_list: dictionary.ticket_list,
      }}
    />
  );
}
