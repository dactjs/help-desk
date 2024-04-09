"use server";

import { redirect } from "next/navigation";
import { typeToFlattenedError } from "zod";
import * as bcrypt from "bcryptjs";

import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getErrorsDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";

type CreateUserData = {
  username: string;
  email: string;
  name: string;
  password: string;
};

export type SubmitActionState = {
  errors: {
    api: string | null;
    fields: typeToFlattenedError<CreateUserData>["fieldErrors"] | null;
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
      username: z.string(),
      email: z.string().email(),
      name: z.string(),
      password: z.string(),
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

  redirect(`/${language}/admin/users`);
}
