// src/pages/Kategori.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiGet, apiPost, apiPut, apiDelete } from "../lib/Api";

export default function Kategori() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ id: null, nama: "" });

  async function load() {
    try {
      const res = await apiGet("/categories");
      setData(res);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleChange(e) {
    setForm({ ...form, nama: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (form.id) {
        await apiPut(`/categories/${form.id}`, { nama: form.nama });
      } else {
        await apiPost("/categories", { nama: form.nama });
      }
      setForm({ id: null, nama: "" });
      load();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Hapus kategori?")) return;
    try {
      await apiDelete(`/categories/${id}`);
      load();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <Layout title="Master Kategori">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-4 mb-4 flex gap-2"
      >
        <input
          className="border rounded-xl px-3 py-2 text-sm flex-1"
          placeholder="Nama kategori"
          value={form.nama}
          onChange={handleChange}
          required
        />
        <button className="bg-purple-600 text-white rounded-xl px-4 py-2 text-sm">
          {form.id ? "Update" : "Tambah"}
        </button>
      </form>

      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="font-semibold mb-2">Daftar Kategori</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="p-2 w-16">ID</th>
              <th className="p-2">Nama</th>
              <th className="p-2 w-32">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((k) => (
              <tr key={k.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{k.id}</td>
                <td className="p-2">{k.nama}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="text-xs px-2 py-1 rounded bg-blue-500 text-white"
                    onClick={() => setForm({ id: k.id, nama: k.nama })}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs px-2 py-1 rounded bg-red-500 text-white"
                    onClick={() => handleDelete(k.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-3 text-gray-500">
                  Belum ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
