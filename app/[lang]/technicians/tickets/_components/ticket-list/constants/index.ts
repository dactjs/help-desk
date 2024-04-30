export const NECESSARY_TICKET_FIELDS = {
  id: true,
  status: true,
  issue: true,
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
  sentBy: {
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
    },
  },
  assignedTo: {
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
    },
  },
  createdAt: true,
  updatedAt: true,
};
