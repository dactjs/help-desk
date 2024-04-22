"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";
import { FormAction } from "@/types/form-action";

export const createResourceComment: FormAction = async (_, formData) => {
  const language = getAppLanguage();

  const [session, errors] = await Promise.all([
    auth(),
    getDictionary(language),
  ]);

  try {
    const z = zod(language);

    const schema = z.object({
      resource: z.string().uuid(),
      content: z.string(),
    });

    const result = schema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      return {
        complete: false,
        errors: {
          server: null,
          fields: result.error.flatten().fieldErrors,
        },
      };
    }

    const ability = createAbilityFor(session);

    if (!ability.can("create", "ResourceComment"))
      throw new Error(errors.FORBIDDEN_ERROR);

    await prisma.resourceComment.create({
      data: {
        content: result.data.content,
        resourceId: result.data.resource,
        writtenById: String(session?.user?.id),
      },
    });

    revalidatePath(`/[lang]/admin/resources/${result.data.resource}`, "page");

    return {
      complete: true,
      errors: {
        server: null,
        fields: null,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        complete: false,
        errors: {
          server: error.message,
          fields: null,
        },
      };
    }

    return {
      complete: false,
      errors: {
        server: errors.UNEXPECTED_ERROR,
        fields: null,
      },
    };
  }
};
