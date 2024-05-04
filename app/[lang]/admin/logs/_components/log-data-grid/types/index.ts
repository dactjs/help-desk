type User = {
  id: string;
  username: string;
  email: string;
  name: string;
};

export interface Log {
  id: string;
  timestamp: Date;
  model: string;
  operation: string;
  metadata: object;
  user: User;
}
