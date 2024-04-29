"use server";

import { subject } from "@casl/ability";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/resources";
import { getDictionary as getErrorsDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";

import { NECESSARY_RESOURCE_FIELDS } from "../constants";
import { Resource } from "../types";

export async function updateResource(data: unknown): Promise<Resource> {
  const language = getAppLanguage();

  const [session, errors] = await Promise.all([
    auth(),
    getErrorsDictionary(language),
  ]);

  const ability = createAbilityFor(session);

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
      const {
        resource_model: { id, brand, model, serial },
      } = await getDictionary(language);

      const fieldErrors = {
        [id]: result.error.flatten().fieldErrors.id,
        [brand]: result.error.flatten().fieldErrors.brand,
        [model]: result.error.flatten().fieldErrors.model,
        [serial]: result.error.flatten().fieldErrors.serial,
      };

      const message = Object.entries(fieldErrors)
        .filter(([, value]) => value)
        .reduce((acc, [key, value]) => `${acc}${key}: ${value}\n`, "");

      throw new Error(message);
    }

    const updated = await prisma.$transaction(async (tx) => {
      const resource = await tx.resource.findUniqueOrThrow({
        where: { id: result.data.id },
      });

      if (
        !ability.can("update", subject("Resource", resource), "brand") ||
        !ability.can("update", subject("Resource", resource), "model") ||
        !ability.can("update", subject("Resource", resource), "serial")
      )
        throw new Error(errors.FORBIDDEN_ERROR);

      return await tx.resource.update({
        where: { id: result.data.id },
        data: {
          brand: result.data.brand,
          model: result.data.model,
          serial: result.data.serial,
        },
        select: NECESSARY_RESOURCE_FIELDS,
      });
    });

    return updated;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
