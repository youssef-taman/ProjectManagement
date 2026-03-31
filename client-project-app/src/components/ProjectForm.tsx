import { useState, useEffect } from 'react';
import { Button } from './Button';
import type { Project, Client } from '../lib/database.types';

interface ProjectFormProps {
  project?: Project;
  clients: Client[];
  onSubmit: (data: {
    name: string;
    description: string;
    budget: number;
    clientId: number;
  }) => Promise<void>;
  onCancel: () => void;
}

export function ProjectForm({
  project,
  clients,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budget: 0,
    clientId: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description ?? '',
        budget: project.budget,
        clientId: project.clientId?.id ?? 0,
      });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Project Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Project Description *
        </label>
        <input
          type="text"
          id="description"
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
          Budget
        </label>
        <input
          type="number"
          id="budget"
          min="0"
          step="0.01"
          value={formData.budget}
          onChange={(e) =>
            setFormData({ ...formData, budget: parseFloat(e.target.value) || 0 })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
          Client *
        </label>
        <select
          id="clientId"
          required
          value={formData.clientId || ''}
          onChange={(e) =>
            setFormData({ ...formData, clientId: Number(e.target.value) || 0 })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
