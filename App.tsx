
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './screens/Dashboard';
import { BacklogManager } from './screens/BacklogManager';
import { FocusMode } from './screens/FocusMode';
import { DeveloperGuide } from './screens/DeveloperGuide';
import { BarChart3 } from 'lucide-react';

const StatisticsScreen = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-50">
    <BarChart3 size={64} className="text-indigo-400" />
    <h2 className="text-xl font-bold">Insights coming soon</h2>
    <p className="text-sm text-center">We're building detailed progress analytics for your JEE preparation.</p>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'backlog': return <BacklogManager />;
      case 'focus': return <FocusMode />;
      case 'stats': return <StatisticsScreen />;
      case 'dev': return <DeveloperGuide />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
