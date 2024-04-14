type User = {
  id: string;
  username: string;
  email: string;
  name: string;
};

export interface Resource {
  id: string;
  brand: string;
  model: string;
  serial: string;
  assignedTo: User | null;
  createdAt: Date;
  updatedAt: Date;
}
