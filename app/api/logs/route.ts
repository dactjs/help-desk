import { z as zod } from "zod";

import { prisma } from "@/lib/prisma";

const schema = zod.object({
  model: zod.string(),
  operation: zod.string(),
  metadata: zod.any(),
  user: zod.string().uuid(),
});

export async function POST(request: Request) {
  const body = await request.json();

  const result = schema.safeParse(body);

  if (!result.success) return new Response("Invalid payload", { status: 400 });

  await prisma.log.create({
    data: {
      model: result.data.model,
      operation: result.data.operation,
      metadata: result.data.metadata,
      userId: result.data.user,
    },
  });

  return new Response("Ok", { status: 200 });
}
