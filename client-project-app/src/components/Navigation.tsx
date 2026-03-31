import { Users, Briefcase } from 'lucide-react';

interface NavigationProps {
  activeTab: 'clients' | 'projects';
  onTabChange: (tab: 'clients' | 'projects') => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          <button
            onClick={() => onTabChange('clients')}
            className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'clients'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <Users size={20} />
            Clients
          </button>
          <button
            onClick={() => onTabChange('projects')}
            className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'projects'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <Briefcase size={20} />
            Projects
          </button>
        </div>
      </div>
    </nav>
  );
}
