import { auth } from "@/auth";
import { AuthenticatedUser } from "@/auth/types";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  const user: AuthenticatedUser | null = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      status: true,
      role: true,
    },
  });

  return Response.json(user);
}
