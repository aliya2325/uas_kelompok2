// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost, setToken } from "../lib/Api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await apiPost("/login", { username, password });
      setToken(data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 to-pink-200">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">Ayaapp Kasir</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Silakan login untuk mengakses dashboard kasir
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Username</label>
            <input
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl py-2 mt-2 transition disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
