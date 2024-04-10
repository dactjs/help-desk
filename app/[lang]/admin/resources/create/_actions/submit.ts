"use server";

import { redirect } from "next/navigation";
import { ResourceTraceType } from "@prisma/client";
import { typeToFlattenedError } from "zod";

import { auth } from "@/auth";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getErrorsDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";

type CreateResourceData = {
  brand: string;
  model: string;
  serial: string;
};

export type SubmitActionState = {
  errors: {
    api: string | null;
    fields: typeToFlattenedError<CreateResourceData>["fieldErrors"] | null;
  };
};

// TODO: add authorization
export async function submit(
  _: SubmitActionState,
  formData: FormData
): Promise<SubmitActionState> {
  const language = getAppLanguage();

  const session = await auth();

  if (!session?.user?.id) redirect(`/${language}/auth/sign-in`);

  try {
    const z = zod(language);

    const schema = z.object({
      brand: z.string(),
      model: z.string(),
      serial: z.string(),
    });

    const result = schema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      return {
        errors: {
          api: null,
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
      },
    });
  } catch (error) {
    const errors = await getErrorsDictionary(language);

    if (error instanceof Error) {
      return {
        errors: {
          api: error.message,
          fields: null,
        },
      };
    }

    return {
      errors: {
        api: errors.UNEXPECTED_ERROR,
        fields: null,
      },
    };
  }

  redirect(`/${language}/admin/resources`);
}
