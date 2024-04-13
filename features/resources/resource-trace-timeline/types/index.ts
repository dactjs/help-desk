import { ResourceTraceType } from "@prisma/client";

type User = {
  id: string;
  username: string;
  email: string;
  name: string;
};

export interface ResourceTrace {
  id: string;
  type: ResourceTraceType;
  origin: User | null;
  destination: User | null;
  madeBy: User;
  createdAt: Date;
  updatedAt: Date;
}
