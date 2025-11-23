// src/pages/Users.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiGet, apiPost, apiPut, apiDelete } from "../lib/Api";

export default function Users() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nama: "",
    username: "",
    password: "",
    role: "kasir",
  });

  async function load() {
    try {
      const res = await apiGet("/users");
      setData(res);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (form.id) {
        await apiPut(`/users/${form.id}`, {
          nama: form.nama,
          username: form.username,
          role: form.role,
          // password optional; backend bisa diatur
        });
      } else {
        await apiPost("/users", {
          nama: form.nama,
          username: form.username,
          password: form.password,
          role: form.role,
        });
      }

      setForm({
        id: null,
        nama: "",
        username: "",
        password: "",
        role: "kasir",
      });
      load();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Hapus user?")) return;
    try {
      await apiDelete(`/users/${id}`);
      load();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <Layout title="Manajemen User">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-4 mb-4 grid grid-cols-1 md:grid-cols-5 gap-3"
      >
        <input
          name="nama"
          placeholder="Nama"
          className="border rounded-xl px-3 py-2 text-sm"
          value={form.nama}
          onChange={handleChange}
          required
        />
        <input
          name="username"
          placeholder="Username"
          className="border rounded-xl px-3 py-2 text-sm"
          value={form.username}
          onChange={handleChange}
          required
        />
        {!form.id && (
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border rounded-xl px-3 py-2 text-sm"
            value={form.password}
            onChange={handleChange}
            required
          />
        )}
        <select
          name="role"
          className="border rounded-xl px-3 py-2 text-sm"
          value={form.role}
          onChange={handleChange}
        >
          <option value="admin">Admin</option>
          <option value="kasir">Kasir</option>
        </select>
        <button className="bg-purple-600 text-white rounded-xl text-sm px-3 py-2">
          {form.id ? "Update" : "Tambah"}
        </button>
      </form>

      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="font-semibold mb-2">Daftar User</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="p-2">Nama</th>
              <th className="p-2">Username</th>
              <th className="p-2">Role</th>
              <th className="p-2 w-32">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{u.nama}</td>
                <td className="p-2">{u.username}</td>
                <td className="p-2 capitalize">{u.role}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="text-xs px-2 py-1 rounded bg-blue-500 text-white"
                    onClick={() =>
                      setForm({
                        id: u.id,
                        nama: u.nama,
                        username: u.username,
                        password: "",
                        role: u.role,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs px-2 py-1 rounded bg-red-500 text-white"
                    onClick={() => handleDelete(u.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-3 text-gray-500">
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
