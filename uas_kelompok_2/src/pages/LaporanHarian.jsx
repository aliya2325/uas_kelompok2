// src/pages/LaporanHarian.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiGet } from "../lib/Api";

export default function LaporanHarian() {
  const [tanggal, setTanggal] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  async function load() {
    try {
      const res = await apiGet(`/laporan-harian?tanggal=${tanggal}`);
      setData(res.transaksi || []);
      setTotal(res.total_harian || 0);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout title="Laporan Harian">
      <div className="bg-white rounded-2xl shadow p-4 mb-4 flex items-center gap-3">
        <label className="text-sm font-medium">Tanggal</label>
        <input
          type="date"
          className="border rounded-xl px-3 py-2 text-sm"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
        />
        <button
          onClick={load}
          className="bg-purple-600 text-white rounded-xl px-4 py-2 text-sm"
        >
          Tampilkan
        </button>
        <div className="ml-auto text-sm">
          Total Omset:{" "}
          <span className="font-bold text-purple-700">Rp {total}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="font-semibold mb-2">Daftar Transaksi</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="p-2">Kode</th>
              <th className="p-2">Waktu</th>
              <th className="p-2">Kasir</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{t.kode_transaksi}</td>
                <td className="p-2">{t.tanggal}</td>
                <td className="p-2">{t.kasir}</td>
                <td className="p-2">{t.total}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-3 text-gray-500">
                  Tidak ada transaksi pada tanggal ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
