import { subject } from "@casl/ability";
import { UserRole } from "@prisma/client";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/users";
import { prisma } from "@/lib/prisma";

import { ClientUserCard } from "./client";
import { NECESSARY_USER_FIELDS } from "./constants";

export interface ServerUserCardProps {
  variant: UserRole;
  userId: string;
}

export async function ServerUserCard({ variant, userId }: ServerUserCardProps) {
  const language = getAppLanguage();

  const [session, user, dictionary] = await Promise.all([
    auth(),
    prisma.user.findUnique({
      where: { id: userId },
      select: NECESSARY_USER_FIELDS,
    }),
    getDictionary(language),
  ]);

  const ability = createAbilityFor(session);

  const data = user && ability.can("read", subject("User", user)) ? user : null;

  const CONTEXT: Record<UserRole, string | null> = {
    [UserRole.ADMIN]: `/${language}/admin/users/${userId}`,
    [UserRole.TECHNICIAN]: `/${language}/technicians/users/${userId}`,
    [UserRole.USER]: null,
  };

  const href = session?.user && data ? CONTEXT[session.user.role] : null;

  return (
    <ClientUserCard
      variant={variant}
      user={data}
      href={href}
      language={language}
      dictionary={{
        user_model: dictionary.user_model,
        user_card: dictionary.user_card,
        not_found: dictionary.not_found,
      }}
    />
  );
}
