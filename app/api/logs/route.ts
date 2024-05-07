import fs from "fs/promises";
import { z as zod } from "zod";

const schema = zod.object({
  timestamp: zod.number(),
  model: zod.string(),
  operation: zod.string(),
  metadata: zod.any(),
  user: zod.object({
    id: zod.string().uuid(),
    username: zod.string(),
    email: zod.string().email(),
    name: zod.string(),
  }),
});

export async function POST(request: Request) {
  const body = await request.json();

  const result = schema.safeParse(body);

  if (!result.success) return new Response("Invalid payload", { status: 400 });

  const dir = "./tmp";

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

  const model = result.data.model;

  const operation = result.data.operation;

  const metadata = JSON.stringify(result.data.metadata);

  const user = JSON.stringify(result.data.user);

  const content = `${timestamp};${model};${operation};${metadata};${user}\n`;

  await fs.appendFile(file, content);

  return new Response("Ok", { status: 200 });
}
