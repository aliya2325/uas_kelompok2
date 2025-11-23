// src/App.jsx
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";

import Login from "./pages/Login";
import Produk from "./pages/Produk";
import Kategori from "./pages/Kategori";
import Users from "./pages/Users";
import Transaksi from "./pages/Transaksi";
import LaporanHarian from "./pages/LaporanHarian";
import LaporanBulanan from "./pages/LaporanBulanan";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/produk", element: <Produk /> },
  { path: "/kategori", element: <Kategori /> },
  { path: "/users", element: <Users /> },
  { path: "/transaksi", element: <Transaksi /> },
  { path: "/laporan-harian", element: <LaporanHarian /> },
  { path: "/laporan-bulanan", element: <LaporanBulanan /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
