import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { ClientsPage } from './pages/ClientsPage';
import { ProjectsPage } from './pages/ProjectsPage';

function App() {
  const [activeTab, setActiveTab] = useState<'clients' | 'projects'>('clients');

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {activeTab === 'clients' ? <ClientsPage /> : <ProjectsPage />}
      </main>
    </div>
  );
}

export default App;
