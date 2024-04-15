"use server";

import { redirect } from "next/navigation";
import { ResourceTraceType } from "@prisma/client";

import { auth } from "@/auth";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";
import { FormAction } from "@/types/form-action";

// TODO: add authorization
export const submit: FormAction = async (_, formData) => {
  const language = getAppLanguage();

  const session = await auth();

  if (!session?.user?.id) redirect(`/${language}/auth/sign-in`);

  try {
    const z = zod(language);

    const schema = z.object({
      brand: z.string(),
      model: z.string(),
      serial: z.string(),
      user: z.string().uuid().optional(),
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

    await prisma.resource.create({
      data: {
        brand: result.data.brand,
        model: result.data.model,
        serial: result.data.serial,
        traces: {
          create: {
            type: ResourceTraceType.INPUT,
            madeById: session.user.id,
          },
        },

        ...(result.data.user && {
          assignedToId: result.data.user,
          traces: {
            createMany: {
              data: [
                {
                  type: ResourceTraceType.INPUT,
                  madeById: session.user.id,
                },
                {
                  type: ResourceTraceType.ASSIGNMENT,
                  madeById: session.user.id,
                },
              ],
            },
          },
        }),
      },
    });

    return {
      complete: true,
      errors: {
        server: null,
        fields: null,
      },
    };
  } catch (error) {
    const errors = await getDictionary(language);

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
