"use server";

import { revalidatePath } from "next/cache";
import { subject } from "@casl/ability";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";

export async function deleteTicket(id: string): Promise<void> {
  const language = getAppLanguage();

  const [session, errors] = await Promise.all([
    auth(),
    getDictionary(language),
  ]);

  const ability = createAbilityFor(session);

  try {
    await prisma.$transaction(async (tx) => {
      const ticket = await tx.ticket.findUniqueOrThrow({ where: { id } });

      if (!ability.can("delete", subject("Ticket", ticket)))
        throw new Error(errors.FORBIDDEN_ERROR);

      await tx.ticket.delete({ where: { id } });
    });

    revalidatePath("/[lang]/admin/tickets", "page");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
