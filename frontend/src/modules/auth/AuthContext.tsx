import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (username: any, password: any) => {
    const response = await axios.post("login", { username, password });

    const fetchedToken = response.data.token;
    localStorage.setItem("token", fetchedToken); // Token added to local Storage
    setToken(fetchedToken);
    setUser(username);
  };

  const availableToken = localStorage.getItem("token");
  if (availableToken) {
    setToken(availableToken);
  }

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
