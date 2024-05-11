"use server";

import { accessibleBy } from "@casl/prisma";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { prisma } from "@/lib/prisma";

import { NECESSARY_TICKET_SERVICE_FIELDS } from "../constants";
import { TicketService } from "../types";

export async function query(input: string): Promise<TicketService[]> {
  const session = await auth();

  const ability = createAbilityFor(session);

  // TODO: add pagination
  const services = await prisma.ticketService.findMany({
    where: {
      AND: [
        accessibleBy(ability).TicketService,
        {
          OR: [
            { name: { mode: "insensitive", contains: input } },
            { category: { name: { mode: "insensitive", contains: input } } },
          ],
        },
      ],
    },
    orderBy: [{ category: { name: "desc" } }, { name: "desc" }],
    select: NECESSARY_TICKET_SERVICE_FIELDS,
  });

  return services;
}
