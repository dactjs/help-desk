import { subject } from "@casl/ability";
import { UserRole } from "@prisma/client";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/resources";
import { prisma } from "@/lib/prisma";

import { ClientResourceCard } from "./client";
import { NECESSARY_RESOURCE_FIELDS } from "./constants";

export interface ServerResourceCardProps {
  resourceId: string;
}

export async function ServerResourceCard({
  resourceId,
}: ServerResourceCardProps) {
  const language = getAppLanguage();

  const [session, resource, dictionary] = await Promise.all([
    auth(),
    prisma.resource.findUnique({
      where: { id: resourceId },
      select: NECESSARY_RESOURCE_FIELDS,
    }),
    getDictionary(language),
  ]);

  const ability = createAbilityFor(session);

  const data =
    resource && ability.can("read", subject("Resource", resource))
      ? resource
      : null;

  const CONTEXT: Record<UserRole, string | null> = {
    [UserRole.ADMIN]: `/${language}/admin/resources/${data?.id}`,
    [UserRole.TECHNICIAN]: `/${language}/technicians/resources/${data?.id}`,
    [UserRole.USER]: null,
  };

  const href = session?.user && data ? CONTEXT[session.user.role] : null;

  return (
    <ClientResourceCard
      resource={data}
      href={href}
      language={language}
      dictionary={{
        resource_model: dictionary.resource_model,
        resource_card: dictionary.resource_card,
        not_found: dictionary.not_found,
      }}
    />
  );
}
