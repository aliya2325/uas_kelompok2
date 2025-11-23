// src/hooks/useAuth.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, clearToken } from "../lib/Api";

export function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  function logout() {
    clearToken();
    navigate("/");
  }

  return { logout };
}
