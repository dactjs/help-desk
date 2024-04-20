export const NECESSARY_TICKET_COMMENT_FIELDS = {
  id: true,
  content: true,
  writtenBy: {
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
