"use server";

import { redirect } from "next/navigation";
import { typeToFlattenedError } from "zod";

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
