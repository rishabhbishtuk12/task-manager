const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export async function apiRequest(path, options = {}) {
  const { token, body, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

export const authApi = {
  login: credentials =>
    apiRequest("/auth/login", {
      method: "POST",
      body: credentials,
    }),
  register: payload =>
    apiRequest("/auth/register", {
      method: "POST",
      body: payload,
    }),
};

export const taskApi = {
  list: token => apiRequest("/tasks", { token }),
  create: (token, payload) =>
    apiRequest("/tasks", {
      method: "POST",
      token,
      body: payload,
    }),

  update: (token, taskId, payload) =>
    apiRequest(`/tasks/${taskId}`, {
      method: "PUT",
      token,
      body: payload,
    }),

  updateStatus: (token, taskId, status) =>
    apiRequest(`/tasks/${taskId}/status`, {
      method: "PUT",
      token,
      body: { status },
    }),

  remove: (token, taskId) =>
    apiRequest(`/tasks/${taskId}`, {
      method: "DELETE",
      token,
    }),
};

export const userApi = {
  list: token => apiRequest("/users", { token }),
};
