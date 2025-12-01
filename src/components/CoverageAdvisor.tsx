import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Target, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

const coverageData = [
  { name: 'Covered', value: 68, color: '#10b981' },
  { name: 'Partial', value: 18, color: '#f59e0b' },
  { name: 'No Coverage', value: 14, color: '#ef4444' },
];

const apiCoverage = [
  { service: 'User Service', coverage: 85, tests: 42, endpoints: 49 },
  { service: 'Order Service', coverage: 72, tests: 38, endpoints: 53 },
  { service: 'Payment Service', coverage: 91, tests: 29, endpoints: 32 },
  { service: 'Inventory Service', coverage: 58, tests: 24, endpoints: 41 },
  { service: 'Notification Service', coverage: 45, tests: 15, endpoints: 33 },
];

const recommendations = [
  {
    id: 1,
    endpoint: '/api/orders/cancel',
    priority: 'Critical',
    reason: 'High traffic endpoint with no test coverage',
    traffic: '2.3K req/day',
    failureHistory: '3 incidents in 30 days',
    suggestedTests: ['Happy path cancellation', 'Invalid order ID', 'Already shipped order'],
  },
  {
    id: 2,
    endpoint: '/api/users/password-reset',
    priority: 'High',
    reason: 'Security-critical flow with partial coverage',
    traffic: '450 req/day',
    failureHistory: '1 incident in 90 days',
    suggestedTests: ['Invalid token', 'Expired token', 'Rate limiting'],
  },
  {
    id: 3,
    endpoint: '/api/inventory/bulk-update',
    priority: 'Medium',
    reason: 'Complex operation lacking edge case tests',
    traffic: '180 req/day',
    failureHistory: 'No recent failures',
    suggestedTests: ['Large batch size', 'Duplicate SKUs', 'Concurrent updates'],
  },
];

export function CoverageAdvisor() {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
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

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 80) return 'text-green-600';
    if (coverage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Test Coverage Advisor</h2>
        <p className="text-gray-600 mt-1">AI-powered recommendations to improve test coverage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Overall Coverage</p>
              <p className="text-gray-900">68%</p>
            </div>
            <Target className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Coverage Gaps</p>
              <p className="text-red-600">34</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Well Covered</p>
              <p className="text-green-600">148</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Improvement</p>
              <p className="text-purple-600">+12%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Coverage Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={coverageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {coverageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Coverage by Service</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={apiCoverage} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" domain={[0, 100]} stroke="#6b7280" />
              <YAxis type="category" dataKey="service" stroke="#6b7280" width={120} />
              <Tooltip />
              <Bar dataKey="coverage" fill="#3b82f6" name="Coverage %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Service Coverage Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Service</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Coverage</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Tests</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Endpoints</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {apiCoverage.map((service) => (
                <tr key={service.service} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">{service.service}</td>
                  <td className={`py-3 px-4 text-sm ${getCoverageColor(service.coverage)}`}>
                    {service.coverage}%
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{service.tests}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{service.endpoints}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      service.coverage >= 80 ? 'bg-green-100 text-green-700' : 
                      service.coverage >= 60 ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {service.coverage >= 80 ? 'Good' : service.coverage >= 60 ? 'Needs Attention' : 'Poor'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-gray-900 mb-4">Recommended Tests to Add</h3>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">{rec.endpoint}</h4>
                  <p className="text-sm text-gray-600">{rec.reason}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs border ${getPriorityColor(rec.priority)}`}>
                  {rec.priority} Priority
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Traffic Volume</p>
                  <p className="text-sm text-gray-900">{rec.traffic}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Failure History</p>
                  <p className="text-sm text-gray-900">{rec.failureHistory}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">Suggested Test Scenarios:</p>
                <div className="flex flex-wrap gap-2">
                  {rec.suggestedTests.map((test, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                      {test}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                  Create Tests
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
