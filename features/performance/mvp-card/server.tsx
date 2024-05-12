import { subject } from "@casl/ability";
import { accessibleBy } from "@casl/prisma";
import { UserRole } from "@prisma/client";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary as getPerformanceDictionary } from "@/internationalization/dictionaries/performance";
import { getDictionary as getUsersDictionary } from "@/internationalization/dictionaries/users";
import { prisma } from "@/lib/prisma";

import { ClientMVPCard } from "./client";
import { NECESSARY_USER_FIELDS } from "./constants";

export interface ServerMVPCardProps {
  start?: Date;
  end?: Date;
}

export async function ServerMVPCard({ start, end }: ServerMVPCardProps) {
  const language = getAppLanguage();

  const [session, { mvp_card }, { not_found }] = await Promise.all([
    auth(),
    getPerformanceDictionary(language),
    getUsersDictionary(language),
  ]);

  const ability = createAbilityFor(session);

  const technician = await prisma.$transaction(async (tx) => {
    type Draft = (typeof draft)[number];

    const draft = await tx.ticket.groupBy({
      by: "assignedToId",
      _count: { _all: true },
      where: {
        AND: [
          accessibleBy(ability).Ticket,
          { createdAt: { gte: start, lte: end } },
        ],
      },
    });

    const mvp = draft.reduce<Draft | null>(
      (prev, current) =>
        prev && current._count > prev._count ? current : prev,
      null
    );

    if (!mvp?.assignedToId || !mvp._count._all) return null;

    const user = await tx.user.findUnique({
      where: { id: mvp.assignedToId },
      select: NECESSARY_USER_FIELDS,
    });

    return user;
  });

  const data =
    technician && ability.can("read", subject("User", technician))
      ? technician
      : null;

  const CONTEXT: Record<UserRole, string | null> = {
    [UserRole.ADMIN]: `/${language}/admin/users/${data?.id}`,
    [UserRole.TECHNICIAN]: `/${language}/technicians/users/${data?.id}`,
    [UserRole.USER]: null,
  };

  const href = session?.user && data ? CONTEXT[session.user.role] : null;

  return (
    <ClientMVPCard
      technician={data}
      href={href}
      dictionary={{ mvp_card, not_found }}
    />
  );
}
