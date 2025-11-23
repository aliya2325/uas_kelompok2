// src/components/Topbar.jsx
import React from "react";
import { Bell, Sun, Moon, Search } from "lucide-react";

export default function Topbar({ title, onLogout }) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-sm font-semibold text-gray-500">Dashboard Overview</h1>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center bg-white rounded-full px-3 py-1 shadow">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            className="border-none outline-none text-sm w-56"
            placeholder="Search modules or pages..."
          />
        </div>

        <button className="p-2 bg-white rounded-full shadow">
          <Bell size={18} />
        </button>
        <button className="p-2 bg-white rounded-full shadow hidden md:inline-flex">
          <Sun size={18} />
        </button>

        <button
          onClick={onLogout}
          className="px-3 py-1 rounded-full bg-purple-600 text-white text-sm shadow"
        >
          Logout
        </button>

        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-9 h-9 rounded-full border-2 border-white shadow"
        />
      </div>
    </header>
  );
}
