type User = {
  id: string;
  username: string;
  email: string;
  name: string;
};

export interface ResourceComment {
  id: string;
  content: string;
  writtenBy: User;
  writtenById: string;
  createdAt: Date;
  updatedAt: Date;
}
