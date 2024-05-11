"use server";

import { accessibleBy } from "@casl/prisma";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { prisma } from "@/lib/prisma";

import { NECESSARY_TICKET_SERVICE_CATEGORY_FIELDS } from "../constants";
import { TicketServiceCategory } from "../types";

export async function query(input: string): Promise<TicketServiceCategory[]> {
  const session = await auth();

  const ability = createAbilityFor(session);

  // TODO: add pagination
  const categories = await prisma.ticketServiceCategory.findMany({
    where: {
      AND: [
        accessibleBy(ability).TicketServiceCategory,
        { name: { mode: "insensitive", contains: input } },
      ],
    },
    orderBy: { name: "desc" },
    select: NECESSARY_TICKET_SERVICE_CATEGORY_FIELDS,
  });

  return categories;
}
