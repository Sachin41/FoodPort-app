// AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser"))
  );

  const login = (userData) => {
            localStorage.setItem("isAuth", true);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setUser(userData); // 🔥 triggers re-render
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null); // 🔥 triggers re-render
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
