import { accessibleBy } from "@casl/prisma";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { prisma } from "@/lib/prisma";

import { ClientTicketComments } from "./client";
import { NECESSARY_TICKET_COMMENT_FIELDS } from "./constants";

export interface ServerTicketCommentsProps {
  ticketId: string;
}

export async function ServerTicketComments({
  ticketId,
}: ServerTicketCommentsProps) {
  const language = getAppLanguage();

  const session = await auth();

  const ability = createAbilityFor(session);

  const [comments, dictionary] = await Promise.all([
    prisma.ticketComment.findMany({
      where: { AND: [accessibleBy(ability).TicketComment, { ticketId }] },
      select: NECESSARY_TICKET_COMMENT_FIELDS,
    }),
    getDictionary(language),
  ]);

  return (
    <ClientTicketComments
      comments={comments}
      language={language}
      dictionary={{ ticket_comments: dictionary.ticket_comments }}
    />
  );
}
