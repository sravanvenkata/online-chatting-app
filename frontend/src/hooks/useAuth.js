import { useState, useEffect } from "react";
import { getCurrentUser } from "../utils/auth";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, logout };
}
