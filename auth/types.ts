import "next-auth";
import "next-auth/jwt";
import { UserStatus, UserRole } from "@prisma/client";

export type SignInCredentials = {
  username: string;
  password: string;
};

export type AuthenticatedUser = {
  username: string;
  email: string;
  name: string;
  status: UserStatus;
  role: UserRole;
};

declare module "next-auth" {
  export interface User extends AuthenticatedUser {}
}

declare module "next-auth/jwt" {
  export interface JWT extends AuthenticatedUser {}
}
