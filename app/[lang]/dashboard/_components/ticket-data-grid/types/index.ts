import { TicketStatus } from "@prisma/client";

type Service = {
  id: string;
  name: string;
};

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
};

export interface Ticket {
  id: string;
  status: TicketStatus;
  service: Service;
  sentById: string;
  assignedTo: User | null;
  createdAt: Date;
  updatedAt: Date;
}
