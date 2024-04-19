"use server";

import { revalidatePath } from "next/cache";
import { subject } from "@casl/ability";
import { ResourceStatus, ResourceTraceType } from "@prisma/client";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";
import { FormAction } from "@/types/form-action";

export const repair: FormAction = async (_, formData) => {
  const language = getAppLanguage();

  const [session, errors] = await Promise.all([
    auth(),
    getDictionary(language),
  ]);

  try {
    const z = zod(language);

    const schema = z.object({
      resource: z.string().uuid(),
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

    await prisma.$transaction(async (tx) => {
      const resource = await tx.resource.findUniqueOrThrow({
        where: { id: result.data.resource },
      });

      if (!ability.can("repair", subject("Resource", resource)))
        throw new Error(errors.FORBIDDEN_ERROR);

      await tx.resource.update({
        where: { id: result.data.resource },
        data: {
          status: ResourceStatus.REPAIR_IN_PROGRESS,
          traces: {
            create: {
              type: ResourceTraceType.REPAIR,
              madeById: String(session?.user?.id),
            },
          },
        },
      });
    });

    revalidatePath("/[lang]/admin/resources", "page");

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
