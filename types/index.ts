export type UserRole = "manager" | "store_keeper";

export type User = {
  id: string;
  email: string;
  role: UserRole;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

