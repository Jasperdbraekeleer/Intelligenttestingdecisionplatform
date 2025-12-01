import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Bell, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const predictionData = [
  { time: '00:00', actual: 95, predicted: 94, confidence: 85 },
  { time: '04:00', actual: 97, predicted: 96, confidence: 88 },
  { time: '08:00', actual: 93, predicted: 92, confidence: 90 },
  { time: '12:00', actual: 91, predicted: 89, confidence: 87 },
  { time: '16:00', actual: null, predicted: 86, confidence: 82 },
  { time: '20:00', actual: null, predicted: 83, confidence: 78 },
  { time: '24:00', actual: null, predicted: 81, confidence: 75 },
];

const alerts = [
  {
    id: 1,
    endpoint: '/api/database/connection',
    probability: 78,
    timeframe: '6-8 hours',
    reason: 'Degrading connection pool performance detected',
    impact: 'High',
    recommendation: 'Scale database connections or investigate slow queries',
  },
  {
    id: 2,
    endpoint: '/api/cache/redis',
    probability: 62,
    timeframe: '12-16 hours',
    reason: 'Memory usage trending towards limit',
    impact: 'Medium',
    recommendation: 'Review cache eviction policies or increase memory allocation',
  },
  {
    id: 3,
    endpoint: '/api/external/payment-gateway',
    probability: 45,
    timeframe: '24 hours',
    reason: 'Historical failure pattern matches current trend',
    impact: 'Critical',
    recommendation: 'Verify third-party service status and prepare fallback',
  },
];

export function PredictiveAlerts() {
  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-red-600 bg-red-100';
    if (probability >= 50) return 'text-orange-600 bg-orange-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Predictive Failure Alerts</h2>
        <p className="text-gray-600 mt-1">AI-powered forecasting of potential issues</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Predictions</p>
              <p className="text-gray-900">3</p>
            </div>
            <Bell className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Prevented Outages</p>
              <p className="text-green-600">18</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Confidence</p>
              <p className="text-gray-900">82%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">High Priority</p>
              <p className="text-red-600">1</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">24-Hour Reliability Forecast</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" stroke="#6b7280" />
            <YAxis stroke="#6b7280" domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="actual" stroke="#10b981" fill="#86efac" name="Actual Success Rate %" />
            <Area type="monotone" dataKey="predicted" stroke="#3b82f6" fill="#93c5fd" name="Predicted Success Rate %" />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-2">
          Prediction shows potential degradation starting at 16:00. Consider proactive measures.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-gray-900">Upcoming Failure Predictions</h3>
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">{alert.endpoint}</h4>
                <p className="text-sm text-gray-600">{alert.reason}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs border ${getImpactColor(alert.impact)}`}>
                  {alert.impact} Impact
                </span>
                <div className={`px-4 py-2 rounded-lg ${getProbabilityColor(alert.probability)}`}>
                  <p className="text-xs">Failure Probability</p>
                  <p className="text-xl">{alert.probability}%</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Expected Timeframe</p>
                <p className="text-sm text-gray-900">{alert.timeframe}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Recommendation</p>
                <p className="text-sm text-gray-900">{alert.recommendation}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Take Action
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Schedule Maintenance
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
