import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MetricCard } from './MetricCard';
import { CheckCircle, XCircle, Clock, Activity } from 'lucide-react';

const trendData = [
  { date: 'Nov 1', success: 245, failures: 12, avgLatency: 180 },
  { date: 'Nov 8', success: 268, failures: 8, avgLatency: 165 },
  { date: 'Nov 15', success: 256, failures: 15, avgLatency: 195 },
  { date: 'Nov 22', success: 289, failures: 6, avgLatency: 155 },
  { date: 'Nov 29', success: 302, failures: 9, avgLatency: 170 },
];

const heatmapData = [
  { endpoint: '/api/users', Mon: 2, Tue: 0, Wed: 1, Thu: 0, Fri: 3, Sat: 0, Sun: 0 },
  { endpoint: '/api/orders', Mon: 5, Tue: 3, Wed: 4, Thu: 2, Fri: 1, Sat: 0, Sun: 0 },
  { endpoint: '/api/payments', Mon: 1, Tue: 0, Wed: 0, Thu: 1, Fri: 0, Sat: 0, Sun: 0 },
  { endpoint: '/api/inventory', Mon: 0, Tue: 2, Wed: 1, Thu: 0, Fri: 2, Sat: 1, Sun: 0 },
];

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<'7' | '30' | '90'>('30');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1">Comprehensive testing insights and trends</p>
        </div>
        <div className="flex gap-2">
          {(['7', '30', '90'] as const).map((days) => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                timeRange === days
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {days} days
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Tests"
          value="1,347"
          change="+12% from last period"
          trend="up"
          icon={Activity}
          iconColor="bg-blue-100 text-blue-600"
        />
        <MetricCard
          title="Success Rate"
          value="96.8%"
          change="+2.3% improvement"
          trend="up"
          icon={CheckCircle}
          iconColor="bg-green-100 text-green-600"
        />
        <MetricCard
          title="Failures"
          value="43"
          change="-8 from last period"
          trend="up"
          icon={XCircle}
          iconColor="bg-red-100 text-red-600"
        />
        <MetricCard
          title="Avg Latency"
          value="173ms"
          change="-12ms faster"
          trend="up"
          icon={Clock}
          iconColor="bg-purple-100 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Success vs Failure Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} name="Success" />
              <Line type="monotone" dataKey="failures" stroke="#ef4444" strokeWidth={2} name="Failures" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">API Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgLatency" fill="#8b5cf6" name="Avg Latency (ms)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Failure Heatmap by Endpoint</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Endpoint</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Mon</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Tue</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Wed</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Thu</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Fri</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Sat</th>
                <th className="text-center py-3 px-4 text-sm text-gray-600">Sun</th>
              </tr>
            </thead>
            <tbody>
              {heatmapData.map((row) => (
                <tr key={row.endpoint} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">{row.endpoint}</td>
                  {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const).map((day) => {
                    const value = row[day];
                    const bgColor = value === 0 ? 'bg-green-50' : value <= 2 ? 'bg-yellow-50' : 'bg-red-50';
                    const textColor = value === 0 ? 'text-green-700' : value <= 2 ? 'text-yellow-700' : 'text-red-700';
                    return (
                      <td key={day} className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded ${bgColor} ${textColor} text-sm`}>
                          {value}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
