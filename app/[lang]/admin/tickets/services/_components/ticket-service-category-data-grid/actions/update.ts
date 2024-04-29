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

import { NECESSARY_TICKET_SERVICE_CATEGORY_FIELDS } from "../constants";
import { TicketServiceCategory } from "../types";

export async function updateTicketServiceCategory(
  data: unknown
): Promise<TicketServiceCategory> {
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
    });

    const result = schema.safeParse(data);

    if (!result.success) {
      const {
        ticket_service_category_model: { id, name },
      } = await getDictionary(language);

      const fieldErrors = {
        [id]: result.error.flatten().fieldErrors.id,
        [name]: result.error.flatten().fieldErrors.name,
      };

      const message = Object.entries(fieldErrors)
        .filter(([, value]) => value)
        .reduce((acc, [key, value]) => `${acc}${key}: ${value}\n`, "");

      throw new Error(message);
    }

    const updated = await prisma.$transaction(async (tx) => {
      const category = await tx.ticketServiceCategory.findUniqueOrThrow({
        where: { id: result.data.id },
      });

      if (
        !ability.can(
          "update",
          subject("TicketServiceCategory", category),
          "name"
        )
      )
        throw new Error(errors.FORBIDDEN_ERROR);

      return await tx.ticketServiceCategory.update({
        where: { id: result.data.id },
        data: { name: result.data.name },
        select: NECESSARY_TICKET_SERVICE_CATEGORY_FIELDS,
      });
    });

    revalidatePath("/[lang]/admin/tickets/services", "page");

    return updated;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
