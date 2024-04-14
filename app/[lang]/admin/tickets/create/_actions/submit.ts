"use server";

import { redirect } from "next/navigation";
import { TicketStatus, TicketTraceType } from "@prisma/client";
import { typeToFlattenedError } from "zod";

import { auth } from "@/auth";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";

import { CreateTicketData } from "../_types";

export type SubmitActionState = {
  errors: {
    api: string | null;
    fields: typeToFlattenedError<CreateTicketData>["fieldErrors"] | null;
  };
};

// TODO: add authorization
export async function submit(
  _: SubmitActionState,
  data: CreateTicketData
): Promise<SubmitActionState> {
  const language = getAppLanguage();

  const session = await auth();

  if (!session?.user?.id) redirect(`/${language}/auth/sign-in`);

  try {
    const z = zod(language);

    const schema = z.object({
      issue: z.string(),
      service: z.string().uuid(),
      user: z.string().uuid(),
      technician: z.string().uuid().nullish(),
    });

    const result = schema.safeParse(data);

    if (!result.success) {
      return {
        errors: {
          api: null,
          fields: result.error.flatten().fieldErrors,
        },
      };
    }

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
                { type: TicketTraceType.RECEPTION, madeById: session.user.id },
                { type: TicketTraceType.ASSIGNMENT, madeById: session.user.id },
              ],
            },
          },
        }),
      },
    });
  } catch (error) {
    const errors = await getDictionary(language);

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

  redirect(`/${language}/admin/tickets`);
}
