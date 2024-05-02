import { TicketStatus } from "@prisma/client";

type Category = {
  id: string;
  name: string;
};

type Service = {
  id: string;
  name: string;
  category: Category;
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
  issue: string;
  service: Service;
  sentBy: User;
  assignedTo: User | null;
  assignedToId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
