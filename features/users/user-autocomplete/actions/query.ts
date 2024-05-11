"use server";

import { accessibleBy } from "@casl/prisma";
import { UserStatus, UserRole } from "@prisma/client";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { prisma } from "@/lib/prisma";

import { NECESSARY_USER_FIELDS } from "../constants";
import { User } from "../types";

export type QueryFilters = {
  status?: UserStatus[];
  roles?: UserRole[];
};

export async function query(
  input: string,
  filters?: QueryFilters
): Promise<User[]> {
  const session = await auth();

  const ability = createAbilityFor(session);

  // TODO: add pagination
  const users = await prisma.user.findMany({
    where: {
      AND: [
        accessibleBy(ability).User,
        { status: { in: filters?.status } },
        { role: { in: filters?.roles } },
        {
          OR: [
            { username: { mode: "insensitive", contains: input } },
            { email: { mode: "insensitive", contains: input } },
            { name: { mode: "insensitive", contains: input } },
          ],
        },
      ],
    },
    orderBy: { name: "desc" },
    select: NECESSARY_USER_FIELDS,
  });

  return users;
}
