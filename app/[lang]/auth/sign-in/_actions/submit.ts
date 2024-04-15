"use server";

import { redirect } from "next/navigation";

import { signIn } from "@/auth";
import { AuthError } from "@/auth/errors";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";
import { zod } from "@/lib/zod";
import { FormAction } from "@/types/form-action";

export const submit: FormAction = async (_, formData) => {
  const language = getAppLanguage();

  try {
    const z = zod(language);

    const schema = z.object({
      username: z.string(),
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

    await signIn("credentials", {
      username: result.data.username,
      password: result.data.password,
      redirect: false,
    });
  } catch (error) {
    const errors = await getDictionary(language);

    if (error instanceof AuthError) {
      return {
        complete: false,
        errors: {
          server: errors[error.code] ?? errors.UNEXPECTED_ERROR,
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

  redirect(`/${language}/dashboard`);
};
