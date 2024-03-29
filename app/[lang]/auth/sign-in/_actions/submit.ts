"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import { typeToFlattenedError } from "zod";

import { auth, signIn } from "@/auth";
import { AuthError } from "@/auth/errors";
import { SignInCredentials } from "@/auth/types";
import { getLanguageFromHeaders } from "@/utils/get-language-from-headers";
import { zod } from "@/lib/zod";
import { getErrorsDictionary } from "@/dictionaries/errors";

export type SubmitActionState = {
  errors: {
    api: string | null;
    fields: typeToFlattenedError<SignInCredentials>["fieldErrors"] | null;
  };
};

export async function submit(
  _: SubmitActionState,
  formData: FormData
): Promise<SubmitActionState> {
  const lang = getLanguageFromHeaders(headers());

  try {
    const z = zod(lang);

    const schema = z.object({
      username: z.string(),
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

    await signIn("credentials", {
      username: result.data.username,
      password: result.data.password,
      redirect: false,
    });
  } catch (error) {
    const errors = await getErrorsDictionary(lang);

    if (error instanceof AuthError) {
      return {
        errors: {
          api: errors[error.code] ?? errors.UNEXPECTED_ERROR,
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

  const session = await auth();

  redirect(session?.user?.role === UserRole.ADMIN ? "/admin" : "/dashboard");
}
