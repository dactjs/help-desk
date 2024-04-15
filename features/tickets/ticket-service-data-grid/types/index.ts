export type TicketServiceCategory = {
  id: string;
  name: string;
};

export interface TicketService {
  id: string;
  name: string;
  category: TicketServiceCategory;
  createdAt: Date;
  updatedAt: Date;
}
