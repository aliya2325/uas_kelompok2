// src/pages/Transaksi.jsx
import React, { useEffect, useState, useMemo } from "react";
import Layout from "../components/Layout";
import { apiGet, apiPost } from "../lib/Api";

export default function Transaksi() {
  const [produk, setProduk] = useState([]);
  const [cari, setCari] = useState("");
  const [keranjang, setKeranjang] = useState([]);
  const [tunai, setTunai] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await apiGet("/products");
        setProduk(data);
      } catch (err) {
        alert(err.message);
      }
    }
    load();
  }, []);

  const produkFilter = useMemo(
    () =>
      produk.filter(
        (p) =>
          p.nama.toLowerCase().includes(cari.toLowerCase()) ||
          p.kode.toLowerCase().includes(cari.toLowerCase())
      ),
    [produk, cari]
  );

  function tambahKeKeranjang(p) {
    setKeranjang((prev) => {
      const idx = prev.findIndex((item) => item.id === p.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].qty += 1;
        return copy;
      }
      return [...prev, { ...p, qty: 1 }];
    });
  }

  function ubahQty(id, qty) {
    setKeranjang((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Number(qty) || 1 } : item
      )
    );
  }

  function hapusItem(id) {
    setKeranjang((prev) => prev.filter((i) => i.id !== id));
  }

  const total = useMemo(
    () => keranjang.reduce((sum, item) => sum + item.qty * item.harga, 0),
    [keranjang]
  );

  const kembalian = useMemo(() => (tunai ? tunai - total : 0), [tunai, total]);

  async function simpanTransaksi() {
    if (keranjang.length === 0) {
      alert("Keranjang kosong");
      return;
    }
    if (tunai < total) {
      alert("Tunai kurang dari total");
      return;
    }

    const items = keranjang.map((k) => ({
      produk_id: k.id,
      qty: k.qty,
      harga_satuan: k.harga,
    }));

    setLoading(true);
    try {
      const data = await apiPost("/transaksi", {
        items,
        total,
        tunai: Number(tunai),
        kembalian,
      });
      alert(`Transaksi berhasil. Kode: ${data.kode_transaksi}`);
      setKeranjang([]);
      setTunai("");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title="Transaksi Kasir">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* List produk */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="font-semibold mb-2">Pilih Produk</h2>
          <input
            className="border rounded-xl px-3 py-2 text-sm w-full mb-3"
            placeholder="Cari nama / kode produk..."
            value={cari}
            onChange={(e) => setCari(e.target.value)}
          />
          <div className="max-h-72 overflow-y-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left">
                  <th className="p-2">Kode</th>
                  <th className="p-2">Nama</th>
                  <th className="p-2">Harga</th>
                  <th className="p-2 w-16">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {produkFilter.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{p.kode}</td>
                    <td className="p-2">{p.nama}</td>
                    <td className="p-2">{p.harga}</td>
                    <td className="p-2">
                      <button
                        className="text-xs px-2 py-1 rounded bg-purple-600 text-white"
                        onClick={() => tambahKeKeranjang(p)}
                      >
                        + Keranjang
                      </button>
                    </td>
                  </tr>
                ))}
                {produkFilter.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center p-3 text-gray-500">
                      Produk tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Keranjang */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="font-semibold mb-2">Keranjang</h2>
          <div className="max-h-72 overflow-y-auto mb-3">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left">
                  <th className="p-2">Produk</th>
                  <th className="p-2 w-16">Qty</th>
                  <th className="p-2">Harga</th>
                  <th className="p-2">Subtotal</th>
                  <th className="p-2 w-12"></th>
                </tr>
              </thead>
              <tbody>
                {keranjang.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.nama}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="border rounded px-2 py-1 w-16 text-xs"
                        value={item.qty}
                        min={1}
                        onChange={(e) => ubahQty(item.id, e.target.value)}
                      />
                    </td>
                    <td className="p-2">{item.harga}</td>
                    <td className="p-2">{item.harga * item.qty}</td>
                    <td className="p-2">
                      <button
                        className="text-xs text-red-500"
                        onClick={() => hapusItem(item.id)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
                {keranjang.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center p-3 text-gray-500">
                      Keranjang kosong.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Total & pembayaran */}
          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-bold">Rp {total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Tunai</span>
              <input
                type="number"
                className="border rounded-xl px-3 py-1 w-40 text-sm"
                value={tunai}
                onChange={(e) => setTunai(Number(e.target.value) || 0)}
              />
            </div>
            <div className="flex justify-between">
              <span>Kembalian</span>
              <span className="font-bold">Rp {kembalian < 0 ? 0 : kembalian}</span>
            </div>

            <button
              onClick={simpanTransaksi}
              disabled={loading}
              className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white rounded-xl py-2 text-sm font-semibold disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Simpan & Cetak (digital)"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
