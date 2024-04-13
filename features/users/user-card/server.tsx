import { UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/users";

import { ClientUserCard } from "./client";
import { NECESSARY_USER_FIELDS } from "./constants";

export interface ServerUserCardProps {
  variant: UserRole;
  userId: string;
}

export const ServerUserCard: React.FC<ServerUserCardProps> = async ({
  variant,
  userId,
}) => {
  const language = getAppLanguage();

  // TODO: Fetch data from the server
  const [user, dictionary] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: NECESSARY_USER_FIELDS,
    }),
    getDictionary(language),
  ]);

  return (
    <ClientUserCard
      variant={variant}
      user={user}
      language={language}
      dictionary={{
        model: dictionary.model,
        user_card: dictionary.user_card,
        not_found: dictionary.not_found,
      }}
    />
  );
};
