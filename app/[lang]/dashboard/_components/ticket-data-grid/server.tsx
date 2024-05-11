import { accessibleBy } from "@casl/prisma";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { prisma } from "@/lib/prisma";

import { ClientTicketDataGrid } from "./client";
import { NECESSARY_TICKET_FIELDS } from "./constants";

export async function ServerTicketDataGrid() {
  const language = getAppLanguage();

  const session = await auth();

  const ability = createAbilityFor(session);

  // TODO: add pagination
  const [tickets, dictionary] = await Promise.all([
    prisma.ticket.findMany({
      where: accessibleBy(ability).Ticket,
      orderBy: { createdAt: "desc" },
      select: NECESSARY_TICKET_FIELDS,
    }),
    getDictionary(language),
  ]);

  return (
    <ClientTicketDataGrid
      tickets={tickets}
      language={language}
      dictionary={{
        ticket_model: dictionary.ticket_model,
        ticket_data_grid: dictionary.ticket_data_grid,
        ticket_action_dialog: dictionary.ticket_action_dialog,
      }}
    />
  );
}
