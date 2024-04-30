"use server";

import { revalidatePath } from "next/cache";
import { subject } from "@casl/ability";
import { UserRole } from "@prisma/client";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";

export async function deleteResourceComment(id: string): Promise<void> {
  const language = getAppLanguage();

  const [session, errors] = await Promise.all([
    auth(),
    getDictionary(language),
  ]);

  const ability = createAbilityFor(session);

  try {
    const resource = await prisma.$transaction(async (tx) => {
      const comment = await tx.resourceComment.findUniqueOrThrow({
        where: { id },
      });

      if (!ability.can("delete", subject("ResourceComment", comment)))
        throw new Error(errors.FORBIDDEN_ERROR);

      const { resourceId } = await tx.resourceComment.delete({ where: { id } });

      return resourceId;
    });

    const CONTEXT: Record<UserRole, string | null> = {
      [UserRole.ADMIN]: `/[lang]/admin/resources/${resource}`,
      [UserRole.TECHNICIAN]: `/[lang]/technicians/resources/${resource}`,
      [UserRole.USER]: null,
    };

    const path = session?.user ? CONTEXT[session.user.role] : null;

    if (path) revalidatePath(path, "page");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
