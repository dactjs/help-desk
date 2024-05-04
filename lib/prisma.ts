import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

import { auth } from "@/auth";

declare global {
  export var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

function prismaClientSingleton() {
  const dir = "./logs";

  return new PrismaClient().$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          const session = await auth();

          if (!session?.user) return query(args);

          try {
            await fs.access(dir);
          } catch {
            await fs.mkdir(dir);
          }

          const now = new Date();

          const year = now.getFullYear();
          const month = String(now.getMonth()).padStart(2, "0");
          const day = String(now.getDate()).padStart(2, "0");

          const file = `${dir}/${year}_${month}_${day}.txt`;

          const timestamp = now.getTime();

          const metadata = JSON.stringify(args);

          const user = JSON.stringify({
            id: session.user.id,
            username: session.user.username,
            email: session.user.email,
            name: session.user.name,
          });

          const content = `${timestamp};${model};${operation};${metadata};${user}\n`;

          await fs.appendFile(file, content);

          return query(args);
        },
      },
    },
  });
}
