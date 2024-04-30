import { AuthenticatedUser } from "@/auth/types";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  const session = await request.json();

  const user: AuthenticatedUser | null = await prisma.user.findUnique({
    where: { id: String(session?.user?.id) },
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
