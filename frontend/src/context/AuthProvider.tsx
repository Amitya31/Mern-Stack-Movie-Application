import { useState } from "react";
import api from "../api/axios";
import { AuthContext, type User } from "./AuthContext";

const getInitialAuthState = () => {
  try {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    return {
      token: token ?? null,
      user: userStr ? JSON.parse(userStr) : null,
    };
  } catch {
    return { token: null, user: null };
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initial = getInitialAuthState();

  const [token, setToken] = useState<string | null>(initial.token);
  const [user, setUser] = useState<User | null>(initial.user);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });

    setToken(res.data.token);
    setUser(res.data.user);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    role: "user" | "admin"
  ) => {
    const res = await api.post("/auth/register", {
      username,
      email,
      password,
      role,
    });

    setToken(res.data.token);
    setUser(res.data.user);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
