type Resource = {
  assignedToId: string | null;
};

type User = {
  id: string;
  username: string;
  email: string;
  name: string;
};

export interface ResourceComment {
  id: string;
  content: string;
  resource: Resource;
  writtenBy: User;
  writtenById: string;
  createdAt: Date;
  updatedAt: Date;
}
