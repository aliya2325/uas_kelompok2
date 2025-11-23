// src/components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../hooks/useAuth";

export default function Layout({ title, children }) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-100 to-purple-200">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Topbar title={title} onLogout={logout} />
        {children}
      </main>
    </div>
  );
}
