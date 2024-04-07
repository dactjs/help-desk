"use server";

import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getErrorsDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";

import { ResourceSchema, Resource } from "../schemas/resource";
import { NECESSARY_RESOURCE_FIELDS } from "../constants";
import { getDictionary } from "../dictionaries";

// TODO: add authorization
export async function updateResource(data: unknown): Promise<Resource> {
  const language = getAppLanguage();

  try {
    const z = zod(language);

    const schema = z.object({
      id: z.string().uuid(),
      brand: z.string(),
      model: z.string(),
      serial: z.string(),
    });

    const result = schema.safeParse(data);

    if (!result.success) {
      const { brand, model, serial } = await getDictionary(language);

      const errors = {
        [brand]: result.error.flatten().fieldErrors.brand,
        [model]: result.error.flatten().fieldErrors.model,
        [serial]: result.error.flatten().fieldErrors.serial,
      };

      const message = Object.entries(errors)
        .filter(([, value]) => value)
        .reduce((acc, [key, value]) => `${acc}${key}: ${value}\n`, "");

      throw new Error(message);
    }

    const updated = await prisma.resource.update({
      where: { id: result.data.id },
      data: {
        brand: result.data.brand,
        model: result.data.model,
        serial: result.data.serial,
      },
      select: NECESSARY_RESOURCE_FIELDS,
    });

    const stripped = ResourceSchema(language).parse(updated);

    return stripped;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    const errors = await getErrorsDictionary(language);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
