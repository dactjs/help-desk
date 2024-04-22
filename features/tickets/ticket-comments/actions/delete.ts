"use server";

import { revalidatePath } from "next/cache";
import { subject } from "@casl/ability";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";

export async function deleteTicketComment(id: string): Promise<void> {
  const language = getAppLanguage();

  const [session, errors] = await Promise.all([
    auth(),
    getDictionary(language),
  ]);

  const ability = createAbilityFor(session);

  try {
    const ticket = await prisma.$transaction(async (tx) => {
      const comment = await tx.ticketComment.findUniqueOrThrow({
        where: { id },
      });

      if (!ability.can("delete", subject("TicketComment", comment)))
        throw new Error(errors.FORBIDDEN_ERROR);

      const { ticketId } = await tx.ticketComment.delete({ where: { id } });

      return ticketId;
    });

    revalidatePath(`/[lang]/admin/tickets/${ticket}`, "page");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
