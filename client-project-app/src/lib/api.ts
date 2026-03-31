import type {
  Client,
  ClientPayload,
  Project,
  ProjectPayload,
} from './database.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const api = {
  getClients: () => request<Client[]>('/clients'),
  createClient: (payload: ClientPayload) =>
    request<Client>('/clients', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateClient: (id: number, payload: ClientPayload) =>
    request<Client>(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  deleteClient: (id: number) =>
    request<void>(`/clients/${id}`, {
      method: 'DELETE',
    }),

  getProjects: () => request<Project[]>('/projects'),
  createProject: (payload: ProjectPayload) =>
    request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateProject: (id: number, payload: ProjectPayload) =>
    request<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  deleteProject: (id: number) =>
    request<void>(`/projects/${id}`, {
      method: 'DELETE',
    }),
};
