"use server";

import { revalidatePath } from "next/cache";
import { subject } from "@casl/ability";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { getDictionary as getErrorsDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";

import { NECESSARY_TICKET_SERVICE_FIELDS } from "../constants";
import { TicketService } from "../types";

export async function updateTicketService(
  data: unknown
): Promise<TicketService> {
  const language = getAppLanguage();

  const [session, errors] = await Promise.all([
    auth(),
    getErrorsDictionary(language),
  ]);

  const ability = createAbilityFor(session);

  try {
    const z = zod(language);

    const schema = z.object({
      id: z.string().uuid(),
      name: z.string(),
      category: z.union([
        z.string().uuid(),
        z.object({
          id: z.string().uuid(),
          name: z.string(),
        }),
      ]),
    });

    const result = schema.safeParse(data);

    if (!result.success) {
      const {
        ticket_service_model: { id, name, category },
      } = await getDictionary(language);

      const fieldErrors = {
        [id]: result.error.flatten().fieldErrors.id,
        [name]: result.error.flatten().fieldErrors.name,
        [category]: result.error.flatten().fieldErrors.category,
      };

      const message = Object.entries(fieldErrors)
        .filter(([, value]) => value)
        .reduce((acc, [key, value]) => `${acc}${key}: ${value}\n`, "");

      throw new Error(message);
    }

    const updated = await prisma.$transaction(async (tx) => {
      const service = await tx.ticketService.findUniqueOrThrow({
        where: { id: result.data.id },
      });

      if (
        !ability.can("update", subject("TicketService", service), "name") ||
        !ability.can("update", subject("TicketService", service), "categoryId")
      )
        throw new Error(errors.FORBIDDEN_ERROR);

      return await tx.ticketService.update({
        where: { id: result.data.id },
        data: {
          name: result.data.name,
          categoryId:
            typeof result.data.category === "object"
              ? result.data.category.id
              : result.data.category,
        },
        select: NECESSARY_TICKET_SERVICE_FIELDS,
      });
    });

    revalidatePath("/[lang]/admin/tickets/services", "page");

    return updated;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
