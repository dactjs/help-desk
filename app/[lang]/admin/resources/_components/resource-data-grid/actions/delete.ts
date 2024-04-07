"use server";

import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getErrorsDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";

import { ResourceSchema, Resource } from "../schemas/resource";
import { NECESSARY_RESOURCE_FIELDS } from "../constants";

// TODO: add authorization
export async function deleteResource(id: string): Promise<Resource> {
  const language = getAppLanguage();

  try {
    const deleted = await prisma.resource.delete({
      where: { id },
      select: NECESSARY_RESOURCE_FIELDS,
    });

    const stripped = ResourceSchema(language).parse(deleted);

    return stripped;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    const errors = await getErrorsDictionary(language);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
