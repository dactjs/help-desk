import { prisma } from "@/lib/prisma";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/resources";

import { ClientResourceTraceTimeline } from "./client";
import { NECESSARY_RESOURCE_TRACE_FIELDS } from "./constants";

export interface ServerResourceTraceTimelineProps {
  resourceId: string;
}

export const ServerResourceTraceTimeline: React.FC<
  ServerResourceTraceTimelineProps
> = async ({ resourceId }) => {
  const language = getAppLanguage();

  // TODO: Fetch data from the server
  const [traces, dictionary] = await Promise.all([
    prisma.resourceTrace.findMany({
      where: { resourceId },
      select: NECESSARY_RESOURCE_TRACE_FIELDS,
    }),
    getDictionary(language),
  ]);

  return (
    <ClientResourceTraceTimeline
      traces={traces}
      language={language}
      dictionary={{
        resource_trace_model: dictionary.resource_trace_model,
        resource_trace_timeline: dictionary.resource_trace_timeline,
      }}
    />
  );
};
