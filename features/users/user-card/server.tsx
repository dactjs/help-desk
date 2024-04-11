import { prisma } from "@/lib/prisma";

import { NECESSARY_USER_FIELDS } from "./constants";

import { ClientUserCard } from "./client";

export interface ServerUserCardProps {
  userId: string;
}

export async function ServerUserCard({
  userId,
}: ServerUserCardProps): Promise<React.ReactElement> {
  // TODO: Fetch data from the server
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: NECESSARY_USER_FIELDS,
  });

  return <ClientUserCard user={user} />;
}
