import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, TrendingUp, Zap, Settings } from 'lucide-react';

const scheduleData = [
  { hour: '00:00', currentTests: 12, recommendedTests: 8 },
  { hour: '04:00', currentTests: 12, recommendedTests: 6 },
  { hour: '08:00', currentTests: 12, recommendedTests: 20 },
  { hour: '12:00', currentTests: 12, recommendedTests: 24 },
  { hour: '16:00', currentTests: 12, recommendedTests: 18 },
  { hour: '20:00', currentTests: 12, recommendedTests: 10 },
];

const testSchedules = [
  {
    id: 1,
    endpoint: '/api/orders/create',
    currentFreq: 'Every 15 minutes',
    recommendedFreq: 'Every 5 minutes',
    reason: 'High business impact + recent instability',
    riskScore: 87,
    autoAdjust: false,
  },
  {
    id: 2,
    endpoint: '/api/inventory/sync',
    currentFreq: 'Every 30 minutes',
    recommendedFreq: 'Every 60 minutes',
    reason: 'Stable performance, low failure rate',
    riskScore: 12,
    autoAdjust: true,
  },
  {
    id: 3,
    endpoint: '/api/payments/webhook',
    currentFreq: 'Every 10 minutes',
    recommendedFreq: 'Every 3 minutes',
    reason: 'Critical path + peak traffic window approaching',
    riskScore: 92,
    autoAdjust: false,
  },
  {
    id: 4,
    endpoint: '/api/reports/generate',
    currentFreq: 'Every 60 minutes',
    recommendedFreq: 'Every 120 minutes',
    reason: 'Low priority, consistent success rate',
    riskScore: 8,
    autoAdjust: true,
  },
];

export function AdaptiveScheduling() {
  const getRiskColor = (risk: number) => {
    if (risk >= 80) return 'bg-red-100 text-red-700';
    if (risk >= 50) return 'bg-orange-100 text-orange-700';
    if (risk >= 30) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Adaptive Scheduling Engine</h2>
        <p className="text-gray-600 mt-1">Smart test frequency optimization based on risk and patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Schedules</p>
              <p className="text-gray-900">47</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Auto-Adjusted</p>
              <p className="text-green-600">28</p>
            </div>
            <Zap className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Review</p>
              <p className="text-orange-600">4</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Efficiency Gain</p>
              <p className="text-purple-600">23%</p>
            </div>
            <Settings className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Recommended vs Current Test Frequency</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={scheduleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="hour" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Bar dataKey="currentTests" fill="#94a3b8" name="Current Tests/Hour" />
            <Bar dataKey="recommendedTests" fill="#3b82f6" name="Recommended Tests/Hour" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-2">
          Adaptive scheduling suggests increasing frequency during business hours and reducing during low-traffic periods.
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Schedule Recommendations</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
            Apply All Recommendations
          </button>
        </div>
        <div className="space-y-4">
          {testSchedules.map((schedule) => (
            <div key={schedule.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">{schedule.endpoint}</h4>
                  <p className="text-sm text-gray-600">{schedule.reason}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${getRiskColor(schedule.riskScore)}`}>
                  Risk: {schedule.riskScore}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Current Frequency</p>
                  <p className="text-sm text-gray-900">{schedule.currentFreq}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Recommended</p>
                  <p className="text-sm text-blue-600">{schedule.recommendedFreq}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Auto-Adjust</p>
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={schedule.autoAdjust} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                  Apply Recommendation
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Simulate Impact
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Customize
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
