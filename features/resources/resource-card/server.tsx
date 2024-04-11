import { prisma } from "@/lib/prisma";

import { NECESSARY_RESOURCE_FIELDS } from "./constants";

import { ClientResourceCard } from "./client";

export interface ServerResourceCardProps {
  resourceId: string;
}

export async function ServerResourceCard({
  resourceId,
}: ServerResourceCardProps): Promise<React.ReactElement> {
  // TODO: Fetch data from the server
  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
    select: NECESSARY_RESOURCE_FIELDS,
  });

  return <ClientResourceCard resource={resource} />;
}
