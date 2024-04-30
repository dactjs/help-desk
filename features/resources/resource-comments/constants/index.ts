export const NECESSARY_RESOURCE_COMMENT_FIELDS = {
  id: true,
  content: true,
  resource: {
    select: {
      assignedToId: true,
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
