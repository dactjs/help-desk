"use server";

import * as bcrypt from "bcryptjs";

import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";
import { FormAction } from "@/types/form-action";

// TODO: add authorization
export const submit: FormAction = async (_, formData) => {
  const language = getAppLanguage();

  try {
    const z = zod(language);

    const schema = z.object({
      username: z.string(),
      email: z.string().email(),
      name: z.string(),
      password: z.string(),
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

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(result.data.password, salt);

    await prisma.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hash,
        name: result.data.name,
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
