"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TicketStatus, TicketTraceType } from "@prisma/client";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";
import { FormAction } from "@/types/form-action";

export const submit: FormAction = async (_, formData) => {
  const language = getAppLanguage();

  const [session, errors] = await Promise.all([
    auth(),
    getDictionary(language),
  ]);

  if (!session?.user?.id) redirect(`/${language}/auth/sign-in`);

  try {
    const z = zod(language);

    const schema = z.object({
      issue: z.string(),
      service: z.string().uuid(),
      user: z.string().uuid(),
      technician: z.string().uuid().optional(),
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

    const ability = createAbilityFor(session);

    if (!ability.can("create", "Ticket"))
      throw new Error(errors.FORBIDDEN_ERROR);

    await prisma.ticket.create({
      data: {
        issue: result.data.issue,
        serviceId: result.data.service,
        sentById: result.data.user,
        traces: {
          create: {
            type: TicketTraceType.RECEPTION,
            madeById: session.user.id,
          },
        },

        ...(result.data.technician && {
          status: TicketStatus.ASSIGNED,
          assignedToId: result.data.technician,
          traces: {
            createMany: {
              data: [
                {
                  type: TicketTraceType.RECEPTION,
                  madeById: session.user.id,
                },
                {
                  type: TicketTraceType.ASSIGNMENT,
                  madeById: session.user.id,
                },
              ],
            },
          },
        }),
      },
    });

    revalidatePath("/[lang]/admin/tickets", "page");

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
