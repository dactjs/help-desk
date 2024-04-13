export const NECESSARY_TICKET_TRACE_FIELDS = {
  id: true,
  type: true,
  origin: {
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
    },
  },
  destination: {
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
    },
  },
  madeBy: {
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
