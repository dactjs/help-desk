import { UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

import { AuthErrorCode } from "@/auth/errors";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !bcrypt.compareSync(password, user.password))
    return new Response(AuthErrorCode.INVALID_CREDENTIALS, { status: 403 });

  if (user.status !== UserStatus.ENABLED)
    return new Response(AuthErrorCode.DISABLED_USER, { status: 403 });

  return Response.json(user);
}
