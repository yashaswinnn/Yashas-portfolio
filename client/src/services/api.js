// =============================================
// API Base Configuration
// =============================================
const BASE_URL = 'https://yashas-backend.vercel.app';

// Helper: make authenticated headers
const authHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper: unified fetch wrapper
const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: authHeaders(),
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
};

// =============================================
// PROJECTS API
// =============================================
export const projectsApi = {
  getAll: () => apiFetch('/api/projects'),

  getById: (id) => apiFetch(`/api/projects/${id}`),

  create: (projectData) =>
    apiFetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    }),

  update: (id, projectData) =>
    apiFetch(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    }),

  delete: (id) =>
    apiFetch(`/api/projects/${id}`, { method: 'DELETE' }),
};

// =============================================
// CONTACT API
// =============================================
export const contactApi = {
  send: (formData) =>
    apiFetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),

  getAll: () => apiFetch('/api/messages'),

  markRead: (id) =>
    apiFetch(`/api/messages/${id}/read`, { method: 'PATCH' }),
};

// =============================================
// ABOUT API
// =============================================
export const aboutApi = {
  get: () => apiFetch('/api/about'),

  save: (aboutData) =>
    apiFetch('/api/about', {
      method: 'POST',
      body: JSON.stringify(aboutData),
    }),
};

// =============================================
// ADMIN AUTH API
// =============================================
export const adminApi = {
  login: (password) =>
    apiFetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    }),

  changePassword: (currentPassword, newPassword) =>
    apiFetch('/api/admin/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
};

// RESUME API
export const resumeApi = {
  get: () => apiFetch('/api/resume'),
  save: (url) => apiFetch('/api/resume', {
    method: 'POST',
    body: JSON.stringify({ url }),
  }),
};

// =============================================
// HEALTH CHECK
// =============================================
export const healthCheck = () => apiFetch('/api/health');
