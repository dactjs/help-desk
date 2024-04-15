"use server";

import { UserStatus, UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { NECESSARY_USER_FIELDS } from "../constants";
import { User } from "../types";

export type QueryFilters = {
  status?: UserStatus[];
  roles?: UserRole[];
};

// TODO: add authorization
export async function query(
  input: string,
  filters?: QueryFilters
): Promise<User[]> {
  const users = await prisma.user.findMany({
    where: {
      status: { in: filters?.status },
      role: { in: filters?.roles },
      OR: [
        { username: { mode: "insensitive", contains: input } },
        { email: { mode: "insensitive", contains: input } },
        { name: { mode: "insensitive", contains: input } },
      ],
    },
    orderBy: { name: "desc" },
    select: NECESSARY_USER_FIELDS,
  });

  return users;
}
