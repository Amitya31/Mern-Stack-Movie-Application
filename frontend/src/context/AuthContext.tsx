import { createContext } from "react";

export interface User {
  id: string;
  email: string;
  username: string;
  role: "user" | "admin";
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    role: "user" | "admin"
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
