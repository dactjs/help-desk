export const NECESSARY_TICKET_SERVICE_FIELDS = {
  id: true,
  name: true,
  category: {
    select: {
      id: true,
      name: true,
    },
  },
};
