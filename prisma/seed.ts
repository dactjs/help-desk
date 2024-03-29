import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";

import { ENV } from "@/config/env";

const prisma = new PrismaClient();

async function main() {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(ENV.ROOT_USER_PASSWORD, salt);

  await prisma.user.create({
    data: {
      username: ENV.ROOT_USER_USERNAME,
      email: ENV.ROOT_USER_EMAIL,
      password: hash,
      name: ENV.ROOT_USER_NAME,
      role: UserRole.ADMIN,
    },
  });
}

main().finally(async () => await prisma.$disconnect());
