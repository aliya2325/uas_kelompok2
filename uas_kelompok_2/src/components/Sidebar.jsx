// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tag,
  Users,
  ShoppingCart,
  CalendarDays,
  CalendarRange,
} from "lucide-react";

const linkClasses = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-xl mb-2 transition ${
    isActive
      ? "bg-white text-purple-600 shadow"
      : "text-white/80 hover:bg-white/10"
  }`;

export default function Sidebar() {
  return (
    <aside className="w-56 bg-gradient-to-b from-purple-700 to-purple-900 text-white p-4 flex flex-col">
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-wide">AYAAPP</h1>
        <p className="text-xs text-white/70">Kasir Dashboard</p>
      </div>

      <nav className="flex-1">
        <NavLink to="/dashboard" className={linkClasses}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/produk" className={linkClasses}>
          <Package size={18} />
          <span>Produk</span>
        </NavLink>

        <NavLink to="/kategori" className={linkClasses}>
          <Tag size={18} />
          <span>Kategori</span>
        </NavLink>

        <NavLink to="/users" className={linkClasses}>
          <Users size={18} />
          <span>Users</span>
        </NavLink>

        <NavLink to="/transaksi" className={linkClasses}>
          <ShoppingCart size={18} />
          <span>Transaksi</span>
        </NavLink>

        <NavLink to="/laporan-harian" className={linkClasses}>
          <CalendarDays size={18} />
          <span>Laporan Harian</span>
        </NavLink>

        <NavLink to="/laporan-bulanan" className={linkClasses}>
          <CalendarRange size={18} />
          <span>Laporan Bulanan</span>
        </NavLink>
      </nav>

      <p className="text-[10px] text-white/50 mt-4">© UAS Kelompok 2</p>
    </aside>
  );
}
