// src/pages/Produk.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiGet, apiPost, apiPut, apiDelete } from "../lib/Api";

export default function Produk() {
  const [produk, setProduk] = useState([]);
  const [form, setForm] = useState({
    id: null,
    kode: "",
    nama: "",
    harga: "",
    stok: "",
    kategori_id: "",
  });
  const [loading, setLoading] = useState(false);

  async function loadProduk() {
    setLoading(true);
    try {
      const data = await apiGet("/products");
      setProduk(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProduk();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (form.id) {
        await apiPut(`/products/${form.id}`, {
          kode: form.kode,
          nama: form.nama,
          harga: Number(form.harga),
          stok: Number(form.stok),
          kategori_id: form.kategori_id ? Number(form.kategori_id) : null,
        });
      } else {
        await apiPost("/products", {
          kode: form.kode,
          nama: form.nama,
          harga: Number(form.harga),
          stok: Number(form.stok),
          kategori_id: form.kategori_id ? Number(form.kategori_id) : null,
        });
      }
      setForm({ id: null, kode: "", nama: "", harga: "", stok: "", kategori_id: "" });
      loadProduk();
    } catch (err) {
      alert(err.message);
    }
  }

  function handleEdit(p) {
    setForm({
      id: p.id,
      kode: p.kode,
      nama: p.nama,
      harga: p.harga,
      stok: p.stok,
      kategori_id: p.kategori_id || "",
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Hapus produk ini?")) return;
    try {
      await apiDelete(`/products/${id}`);
      loadProduk();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <Layout title="Master Produk">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-4 mb-4 grid grid-cols-1 md:grid-cols-6 gap-3"
      >
        <input
          name="kode"
          placeholder="Kode"
          className="border rounded-xl px-3 py-2 text-sm"
          value={form.kode}
          onChange={handleChange}
          required
        />
        <input
          name="nama"
          placeholder="Nama"
          className="border rounded-xl px-3 py-2 text-sm"
          value={form.nama}
          onChange={handleChange}
          required
        />
        <input
          name="harga"
          placeholder="Harga"
          type="number"
          className="border rounded-xl px-3 py-2 text-sm"
          value={form.harga}
          onChange={handleChange}
          required
        />
        <input
          name="stok"
          placeholder="Stok"
          type="number"
          className="border rounded-xl px-3 py-2 text-sm"
          value={form.stok}
          onChange={handleChange}
          required
        />
        <input
          name="kategori_id"
          placeholder="ID Kategori"
          className="border rounded-xl px-3 py-2 text-sm"
          value={form.kategori_id}
          onChange={handleChange}
        />
        <button className="bg-purple-600 text-white rounded-xl text-sm px-3 py-2">
          {form.id ? "Update" : "Tambah"}
        </button>
      </form>

      {/* Tabel */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex justify-between mb-2">
          <h2 className="font-semibold">Daftar Produk</h2>
          {loading && <span className="text-sm text-gray-500">Loading...</span>}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="p-2">Kode</th>
                <th className="p-2">Nama</th>
                <th className="p-2">Harga</th>
                <th className="p-2">Stok</th>
                <th className="p-2">Kategori</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {produk.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{p.kode}</td>
                  <td className="p-2">{p.nama}</td>
                  <td className="p-2">{p.harga}</td>
                  <td className="p-2">{p.stok}</td>
                  <td className="p-2">{p.kategori_nama || "-"}</td>
                  <td className="p-2 space-x-2">
                    <button
                      className="text-xs px-2 py-1 rounded bg-blue-500 text-white"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xs px-2 py-1 rounded bg-red-500 text-white"
                      onClick={() => handleDelete(p.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {produk.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-3 text-gray-500">
                    Belum ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
