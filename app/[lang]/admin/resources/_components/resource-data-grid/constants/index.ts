export const NECESSARY_RESOURCE_FIELDS = {
  id: true,
  brand: true,
  model: true,
  serial: true,
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
