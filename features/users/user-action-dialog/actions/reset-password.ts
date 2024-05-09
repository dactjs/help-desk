"use server";

import { revalidatePath } from "next/cache";
import { subject } from "@casl/ability";
import { UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/users";
import { getDictionary as getErrorsDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";
import { FormAction } from "@/types/form-action";

export const resetPassword: FormAction = async (_, formData) => {
  const language = getAppLanguage();

  const [session, { user_action_dialog }, errors] = await Promise.all([
    auth(),
    getDictionary(language),
    getErrorsDictionary(language),
  ]);

  try {
    const z = zod(language);

    const schema = z
      .object({
        user: z.string().uuid(),
        password: z.string(),
        confirm_password: z.string(),
      })
      .refine(
        ({ password, confirm_password }) => password === confirm_password,
        {
          path: ["confirm_password"],
          message:
            user_action_dialog[
              "actions--reset-password-passwords-do-not-match"
            ],
        }
      );

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

    const ability = createAbilityFor(session);

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUniqueOrThrow({
        where: { id: result.data.user },
      });

      if (!ability.can("reset-password", subject("User", user)))
        throw new Error(errors.FORBIDDEN_ERROR);

      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(result.data.password, salt);

      await tx.user.update({
        where: { id: result.data.user },
        data: { password: hash },
      });
    });

    const CONTEXT: Record<UserRole, string | null> = {
      [UserRole.ADMIN]: "/[lang]/admin/users",
      [UserRole.TECHNICIAN]: "/[lang]/technicians/users",
      [UserRole.USER]: null,
    };

    const path = session?.user ? CONTEXT[session.user.role] : null;

    if (path) revalidatePath(path, "page");

    return {
      complete: true,
      errors: {
        server: null,
        fields: null,
      },
    };
  } catch (error) {
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
