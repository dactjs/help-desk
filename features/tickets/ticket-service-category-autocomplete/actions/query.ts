"use server";

import { prisma } from "@/lib/prisma";

import { NECESSARY_TICKET_SERVICE_CATEGORY_FIELDS } from "../constants";
import { TicketServiceCategory } from "../types";

// TODO: add authorization
export async function query(input: string): Promise<TicketServiceCategory[]> {
  const categories = await prisma.ticketServiceCategory.findMany({
    where: { name: { mode: "insensitive", contains: input } },
    orderBy: { name: "desc" },
    select: NECESSARY_TICKET_SERVICE_CATEGORY_FIELDS,
  });

  return categories;
}
