export interface Client {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  budget: number;
  clientId: Client;
}

export interface ClientPayload {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface ProjectPayload {
  name: string;
  description: string;
  budget: number;
  clientId: {
    id: number;
  };
}
