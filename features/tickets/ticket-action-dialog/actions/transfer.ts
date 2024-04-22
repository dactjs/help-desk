"use server";

import { revalidatePath } from "next/cache";
import { subject } from "@casl/ability";
import { TicketStatus, TicketTraceType } from "@prisma/client";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";
import { FormAction } from "@/types/form-action";

export const transfer: FormAction = async (_, formData) => {
  const language = getAppLanguage();

  const [session, errors] = await Promise.all([
    auth(),
    getDictionary(language),
  ]);

  try {
    const z = zod(language);

    const schema = z.object({
      ticket: z.string().uuid(),
      destination: z.string().uuid(),
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

    await prisma.$transaction(async (tx) => {
      const ticket = await tx.ticket.findUniqueOrThrow({
        where: { id: result.data.ticket },
      });

      if (!ability.can("transfer", subject("Ticket", ticket)))
        throw new Error(errors.FORBIDDEN_ERROR);

      await tx.ticket.update({
        where: { id: result.data.ticket },
        data: {
          status: TicketStatus.ASSIGNED,
          assignedToId: result.data.destination,
          traces: {
            create: {
              type: TicketTraceType.TRANSFER,
              originId: ticket.assignedToId,
              destinationId: result.data.destination,
              madeById: String(session?.user?.id),
            },
          },
        },
      });
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
