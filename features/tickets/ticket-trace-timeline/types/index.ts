import { TicketTraceType } from "@prisma/client";

type User = {
  id: string;
  username: string;
  email: string;
  name: string;
};

export interface TicketTrace {
  id: string;
  type: TicketTraceType;
  origin: User | null;
  destination: User | null;
  madeBy: User;
  createdAt: Date;
  updatedAt: Date;
}
