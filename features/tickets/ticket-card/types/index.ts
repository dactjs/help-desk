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

export interface Ticket {
  id: string;
  issue: string;
  solution: string | null;
  status: TicketStatus;
  service: Service;
  createdAt: Date;
  updatedAt: Date;
}
