// src/lib/api.js
const API_BASE = "http://localhost/kasir-pro/backend/public/api";

export function getToken() {
  return localStorage.getItem("token") || "";
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

async function apiRequest(path, method = "GET", body = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Terjadi kesalahan");
  }

  return json.data;
}

export function apiGet(path) {
  return apiRequest(path, "GET");
}

export function apiPost(path, data) {
  return apiRequest(path, "POST", data);
}

export function apiPut(path, data) {
  return apiRequest(path, "PUT", data);
}

export function apiDelete(path) {
  return apiRequest(path, "DELETE");
}
