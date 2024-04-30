import { accessibleBy } from "@casl/prisma";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/resources";
import { prisma } from "@/lib/prisma";

import { ClientResourceComments } from "./client";
import { NECESSARY_RESOURCE_COMMENT_FIELDS } from "./constants";

export interface ServerResourceCommentsProps {
  resourceId: string;
}

export async function ServerResourceComments({
  resourceId,
}: ServerResourceCommentsProps) {
  const language = getAppLanguage();

  const session = await auth();

  const ability = createAbilityFor(session);

  const [comments, dictionary] = await Promise.all([
    prisma.resourceComment.findMany({
      where: { AND: [accessibleBy(ability).ResourceComment, { resourceId }] },
      select: NECESSARY_RESOURCE_COMMENT_FIELDS,
    }),
    getDictionary(language),
  ]);

  return (
    <ClientResourceComments
      resourceId={resourceId}
      comments={comments}
      language={language}
      dictionary={{
        resource_comments: dictionary.resource_comments,
        add_resource_comment_dialog: dictionary.add_resource_comment_dialog,
        edit_resource_comment_dialog: dictionary.edit_resource_comment_dialog,
      }}
    />
  );
}
