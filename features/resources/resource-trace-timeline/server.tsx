import { accessibleBy } from "@casl/prisma";
import { UserRole } from "@prisma/client";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/resources";
import { prisma } from "@/lib/prisma";

import { ClientResourceTraceTimeline } from "./client";
import { NECESSARY_RESOURCE_TRACE_FIELDS } from "./constants";

export interface ServerResourceTraceTimelineProps {
  resourceId: string;
}

export async function ServerResourceTraceTimeline({
  resourceId,
}: ServerResourceTraceTimelineProps) {
  const language = getAppLanguage();

  const session = await auth();

  const ability = createAbilityFor(session);

  const [traces, dictionary] = await Promise.all([
    prisma.resourceTrace.findMany({
      where: { AND: [accessibleBy(ability).ResourceTrace, { resourceId }] },
      select: NECESSARY_RESOURCE_TRACE_FIELDS,
    }),
    getDictionary(language),
  ]);

  const CONTEXT: Record<UserRole, string | null> = {
    [UserRole.ADMIN]: `/${language}/admin`,
    [UserRole.TECHNICIAN]: `/${language}/technicians`,
    [UserRole.USER]: null,
  };

  return (
    <ClientResourceTraceTimeline
      traces={traces}
      context={session?.user ? CONTEXT[session.user.role] : null}
      language={language}
      dictionary={{
        resource_trace_model: dictionary.resource_trace_model,
        resource_trace_timeline: dictionary.resource_trace_timeline,
        resource_trace_details_dialog: dictionary.resource_trace_details_dialog,
      }}
    />
  );
}
