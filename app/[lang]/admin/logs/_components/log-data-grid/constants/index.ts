export const NECESSARY_LOG_FIELDS = {
  id: true,
  model: true,
  operation: true,
  metadata: true,
  user: {
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
    },
  },
  timestamp: true,
};
