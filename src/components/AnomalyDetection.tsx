import { AlertTriangle, TrendingUp, Zap, Clock } from 'lucide-react';

const anomalies = [
  {
    id: 1,
    type: 'Latency Spike',
    endpoint: '/api/orders/checkout',
    severity: 'high',
    description: 'Response time increased by 340% in the last hour',
    timestamp: '2 minutes ago',
    baseline: '145ms',
    current: '638ms',
    icon: Clock,
  },
  {
    id: 2,
    type: 'Failure Rate Increase',
    endpoint: '/api/payments/process',
    severity: 'critical',
    description: 'Failure rate jumped from 2% to 18% in 30 minutes',
    timestamp: '8 minutes ago',
    baseline: '2%',
    current: '18%',
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: 'Response Size Anomaly',
    endpoint: '/api/inventory/search',
    severity: 'medium',
    description: 'Response payload 3x larger than typical',
    timestamp: '23 minutes ago',
    baseline: '12KB',
    current: '36KB',
    icon: TrendingUp,
  },
  {
    id: 4,
    type: 'Traffic Spike',
    endpoint: '/api/users/login',
    severity: 'low',
    description: 'Request volume 2.5x higher than usual for this time',
    timestamp: '1 hour ago',
    baseline: '120 req/min',
    current: '305 req/min',
    icon: Zap,
  },
];

export function AnomalyDetection() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIconBgColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-600';
      case 'high':
        return 'bg-orange-100 text-orange-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      case 'low':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Anomaly Detection</h2>
        <p className="text-gray-600 mt-1">Real-time detection of unusual patterns and behaviors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Active Anomalies</p>
          <p className="text-gray-900">4</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Critical</p>
          <p className="text-red-600">1</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">High Priority</p>
          <p className="text-orange-600">1</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Resolved Today</p>
          <p className="text-green-600">12</p>
        </div>
      </div>

      <div className="space-y-4">
        {anomalies.map((anomaly) => {
          const Icon = anomaly.icon;
          return (
            <div key={anomaly.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg ${getIconBgColor(anomaly.severity)} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900">{anomaly.type}</h3>
                      <p className="text-sm text-gray-600 mt-1">{anomaly.endpoint}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getSeverityColor(anomaly.severity)}`}>
                        {anomaly.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">{anomaly.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{anomaly.description}</p>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-gray-600">Baseline</p>
                      <p className="text-sm text-gray-900">{anomaly.baseline}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Current</p>
                      <p className="text-sm text-red-600">{anomaly.current}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Investigate
                    </button>
                    <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      Mark as Known
                    </button>
                    <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      Create Alert Rule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
