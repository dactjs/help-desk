export const NECESSARY_TICKET_FIELDS = {
  id: true,
  issue: true,
  solution: true,
  status: true,
  service: {
    select: {
      id: true,
      name: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  createdAt: true,
  updatedAt: true,
};
