import { PrismaClient } from "@prisma/client";

import { auth } from "@/auth";
import { ENV } from "@/config/env";

declare global {
  export var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

function prismaClientSingleton() {
  return new PrismaClient().$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          if (model === "Log") return query(args);

          const session = await auth();

          if (!session?.user) return query(args);

          await fetch(new URL("/api/logs", ENV.AUTH_URL), {
            method: "POST",
            body: JSON.stringify({
              model,
              operation,
              metadata: args,
              user: session.user.id,
            }),
          });

          return query(args);
        },
      },
    },
  });
}
