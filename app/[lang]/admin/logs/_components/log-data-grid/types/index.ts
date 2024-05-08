import { Prisma } from "@prisma/client";

type User = {
  id: string;
  username: string;
  email: string;
  name: string;
};

export interface Log {
  id: string;
  model: string;
  operation: string;
  metadata: Prisma.JsonValue;
  user: User;
  timestamp: Date;
}
