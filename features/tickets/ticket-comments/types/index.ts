type Ticket = {
  sentById: string;
};

type User = {
  id: string;
  username: string;
  email: string;
  name: string;
};

export interface TicketComment {
  id: string;
  content: string;
  ticket: Ticket;
  writtenBy: User;
  writtenById: string;
  createdAt: Date;
  updatedAt: Date;
}
