import { prisma } from "@/lib/prisma";

import { ClientResourceTraceTimeline } from "./client";

export interface ServerResourceTraceTimelineProps {
  resourceId: string;
}

export async function ServerResourceTraceTimeline({
  resourceId,
}: ServerResourceTraceTimelineProps): Promise<React.ReactElement> {
  // TODO: Fetch data from the server
  const traces = await prisma.resourceTrace.findMany({
    where: { resourceId },
  });

  return <ClientResourceTraceTimeline traces={traces} />;
}
