import { UserStatus, UserRole } from "@prisma/client";

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  status: UserStatus;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
