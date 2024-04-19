import { ResourceStatus } from "@prisma/client";

export interface Resource {
  id: string;
  brand: string;
  model: string;
  serial: string;
  status: ResourceStatus;
  createdAt: Date;
  updatedAt: Date;
}
