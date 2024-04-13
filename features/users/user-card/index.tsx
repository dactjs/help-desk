import { Suspense } from "react";
import { UserRole } from "@prisma/client";

import { CardSkeleton } from "@/components/templates/card-skeleton";

import { ServerUserCard } from "./server";

export interface UserCardProps {
  variant?: UserRole;
  userId: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  variant = UserRole.USER,
  userId,
}) => (
  <Suspense fallback={<CardSkeleton items={7} />}>
    <ServerUserCard variant={variant} userId={userId} />
  </Suspense>
);
