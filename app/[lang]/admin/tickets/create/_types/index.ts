export type CreateTicketData = {
  issue: string;
  service: string;
  user: string;
  technician?: string | null;
};
