"use server";

import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getErrorsDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";

import { TicketSchema, Ticket } from "../schemas/ticket";
import { NECESSARY_TICKET_FIELDS } from "../constants";

// TODO: add authorization
export async function deleteTicket(id: string): Promise<Ticket> {
  const language = getAppLanguage();

  try {
    const deleted = await prisma.ticket.delete({
      where: { id },
      select: NECESSARY_TICKET_FIELDS,
    });

    const stripped = TicketSchema(language).parse(deleted);

    return stripped;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    const errors = await getErrorsDictionary(language);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
