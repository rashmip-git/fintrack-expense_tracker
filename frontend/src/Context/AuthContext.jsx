import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("authUser", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };


  return (
    <AuthContext.Provider value={{ user, token, login,isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
