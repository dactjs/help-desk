"use server";

import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { getDictionary as getErrorsDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";

import { NECESSARY_TICKET_SERVICE_FIELDS } from "../constants";
import { TicketService } from "../types";

// TODO: add authorization
export async function updateTicketService(
  data: unknown
): Promise<TicketService> {
  const language = getAppLanguage();

  try {
    const z = zod(language);

    const schema = z.object({
      id: z.string().uuid(),
      category: z.string().uuid(),
    });

    const result = schema.safeParse(data);

    if (!result.success) {
      const {
        ticket_service_model: { id, category },
      } = await getDictionary(language);

      const errors = {
        [id]: result.error.flatten().fieldErrors.id,
        [category]: result.error.flatten().fieldErrors.category,
      };

      const message = Object.entries(errors)
        .filter(([, value]) => value)
        .reduce((acc, [key, value]) => `${acc}${key}: ${value}\n`, "");

      throw new Error(message);
    }

    const updated = await prisma.ticketService.update({
      where: { id: result.data.id },
      data: { categoryId: result.data.category },
      select: NECESSARY_TICKET_SERVICE_FIELDS,
    });

    return updated;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    const errors = await getErrorsDictionary(language);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
