import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AnomalyDetection } from './components/AnomalyDetection';
import { PredictiveAlerts } from './components/PredictiveAlerts';
import { AdaptiveScheduling } from './components/AdaptiveScheduling';
import { CoverageAdvisor } from './components/CoverageAdvisor';
import { BusinessImpact } from './components/BusinessImpact';

export type ViewType = 'analytics' | 'anomalies' | 'predictions' | 'scheduling' | 'coverage' | 'business';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('analytics');

  const renderView = () => {
    switch (currentView) {
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'anomalies':
        return <AnomalyDetection />;
      case 'predictions':
        return <PredictiveAlerts />;
      case 'scheduling':
        return <AdaptiveScheduling />;
      case 'coverage':
        return <CoverageAdvisor />;
      case 'business':
        return <BusinessImpact />;
      default:
        return <AnalyticsDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
