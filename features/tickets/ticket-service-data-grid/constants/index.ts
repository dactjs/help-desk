export const NECESSARY_TICKET_SERVICE_CATEGORY_FIELDS = {
  id: true,
  name: true,
};

export const NECESSARY_TICKET_SERVICE_FIELDS = {
  id: true,
  name: true,
  category: {
    select: {
      id: true,
      name: true,
    },
  },
  createdAt: true,
  updatedAt: true,
};
