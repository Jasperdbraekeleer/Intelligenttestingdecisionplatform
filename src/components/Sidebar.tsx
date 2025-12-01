import { BarChart3, AlertTriangle, TrendingUp, Calendar, Target, Briefcase, Zap } from 'lucide-react';
import type { ViewType } from '../App';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const navItems = [
    { id: 'analytics' as ViewType, label: 'Analytics', icon: BarChart3 },
    { id: 'anomalies' as ViewType, label: 'Anomaly Detection', icon: AlertTriangle },
    { id: 'predictions' as ViewType, label: 'Predictive Alerts', icon: TrendingUp },
    { id: 'scheduling' as ViewType, label: 'Adaptive Scheduling', icon: Calendar },
    { id: 'coverage' as ViewType, label: 'Coverage Advisor', icon: Target },
    { id: 'business' as ViewType, label: 'Business Impact', icon: Briefcase },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-gray-900">ForgeIQ</h1>
            <p className="text-xs text-gray-500">Intelligent Testing Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">Extension to ForgeView</p>
      </div>
    </aside>
  );
}
