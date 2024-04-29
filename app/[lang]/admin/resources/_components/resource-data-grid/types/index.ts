import { ResourceStatus } from "@prisma/client";

type User = {
  id: string;
  username: string;
  email: string;
  name: string;
};

export interface Resource {
  id: string;
  brand: string;
  model: string;
  serial: string;
  status: ResourceStatus;
  assignedTo: User | null;
  createdAt: Date;
  updatedAt: Date;
}
