// src/pages/LaporanBulanan.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiGet } from "../lib/Api";

export default function LaporanBulanan() {
  const [bulan, setBulan] = useState(() =>
    new Date().toISOString().slice(0, 7)
  );
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  async function load() {
    try {
      const res = await apiGet(`/laporan-bulanan?bulan=${bulan}`);
      setData(res.detail || []);
      setTotal(res.total_bulanan || 0);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout title="Laporan Bulanan">
      <div className="bg-white rounded-2xl shadow p-4 mb-4 flex items-center gap-3">
        <label className="text-sm font-medium">Bulan</label>
        <input
          type="month"
          className="border rounded-xl px-3 py-2 text-sm"
          value={bulan}
          onChange={(e) => setBulan(e.target.value)}
        />
        <button
          onClick={load}
          className="bg-purple-600 text-white rounded-xl px-4 py-2 text-sm"
        >
          Tampilkan
        </button>
        <div className="ml-auto text-sm">
          Total Omset Bulan Ini:{" "}
          <span className="font-bold text-purple-700">Rp {total}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="font-semibold mb-2">Ringkasan Harian</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="p-2">Tanggal</th>
              <th className="p-2">Total Harian</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-2">{d.tanggal}</td>
                <td className="p-2">{d.total_harian}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center p-3 text-gray-500">
                  Tidak ada data pada bulan ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
