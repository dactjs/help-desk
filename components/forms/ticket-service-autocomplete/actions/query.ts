"use server";

import { prisma } from "@/lib/prisma";

import { NECESSARY_TICKET_SERVICE_FIELDS } from "../constants";
import { TicketService } from "../types";

// TODO: add authorization
export async function query(input: string): Promise<TicketService[]> {
  const services = await prisma.ticketService.findMany({
    where: {
      OR: [
        { name: { mode: "insensitive", contains: input } },
        { category: { name: { mode: "insensitive", contains: input } } },
      ],
    },
    orderBy: [{ category: { name: "desc" } }, { name: "desc" }],
    select: NECESSARY_TICKET_SERVICE_FIELDS,
  });

  return services;
}
