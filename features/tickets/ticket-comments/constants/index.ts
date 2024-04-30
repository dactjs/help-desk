export const NECESSARY_TICKET_COMMENT_FIELDS = {
  id: true,
  content: true,
  ticket: {
    select: {
      sentById: true,
    },
  },
  writtenBy: {
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
    },
  },
  writtenById: true,
  createdAt: true,
  updatedAt: true,
};
