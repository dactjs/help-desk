"use server";

import { revalidatePath } from "next/cache";

import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";

// TODO: add authorization
export async function deleteTicketService(id: string): Promise<void> {
  const language = getAppLanguage();

  try {
    await prisma.ticketService.delete({ where: { id } });

    revalidatePath("/[lang]/admin/tickets/services", "page");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    const errors = await getDictionary(language);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
