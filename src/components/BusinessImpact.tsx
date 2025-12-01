import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { DollarSign, Users, Clock, TrendingDown } from 'lucide-react';

const reliabilityTrend = [
  { month: 'Jul', score: 92 },
  { month: 'Aug', score: 89 },
  { month: 'Sep', score: 94 },
  { month: 'Oct', score: 96 },
  { month: 'Nov', score: 93 },
  { month: 'Dec', score: 95 },
];

const apiReliability = [
  {
    id: 1,
    api: 'Payment Processing',
    score: 98,
    sla: 99.9,
    currentUptime: 99.2,
    revenueImpact: 'Critical',
    estimatedLoss: '$125K/hour',
    customerImpact: 'High',
    affectedUsers: '~50K',
  },
  {
    id: 2,
    api: 'Order Management',
    score: 94,
    sla: 99.5,
    currentUptime: 98.8,
    revenueImpact: 'High',
    estimatedLoss: '$75K/hour',
    customerImpact: 'High',
    affectedUsers: '~35K',
  },
  {
    id: 3,
    api: 'User Authentication',
    score: 96,
    sla: 99.9,
    currentUptime: 99.6,
    revenueImpact: 'Critical',
    estimatedLoss: '$200K/hour',
    customerImpact: 'Severe',
    affectedUsers: '~100K',
  },
  {
    id: 4,
    api: 'Product Catalog',
    score: 88,
    sla: 99.0,
    currentUptime: 97.5,
    revenueImpact: 'Medium',
    estimatedLoss: '$30K/hour',
    customerImpact: 'Medium',
    affectedUsers: '~20K',
  },
  {
    id: 5,
    api: 'Notifications',
    score: 82,
    sla: 95.0,
    currentUptime: 94.2,
    revenueImpact: 'Low',
    estimatedLoss: '$5K/hour',
    customerImpact: 'Low',
    affectedUsers: '~10K',
  },
];

export function BusinessImpact() {
  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600 bg-green-100';
    if (score >= 85) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'critical':
      case 'severe':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getSLAStatus = (current: number, target: number) => {
    const diff = current - target;
    if (diff >= 0) return { status: 'Meeting SLA', color: 'text-green-600' };
    if (diff >= -0.5) return { status: 'At Risk', color: 'text-yellow-600' };
    return { status: 'Below SLA', color: 'text-red-600' };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Business Impact Dashboard</h2>
        <p className="text-gray-600 mt-1">Translate technical reliability into business metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Potential Revenue at Risk</p>
            <DollarSign className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-gray-900">$435K</p>
          <p className="text-xs text-gray-500 mt-1">Per hour of downtime</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Affected Users</p>
            <Users className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-gray-900">215K</p>
          <p className="text-xs text-gray-500 mt-1">In case of major outage</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avg Resolution Time</p>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-gray-900">23 min</p>
          <p className="text-xs text-green-600 mt-1">-35% vs last month</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">SLA Violations</p>
            <TrendingDown className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-gray-900">2</p>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Overall Reliability Score Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={reliabilityTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis domain={[80, 100]} stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} name="Reliability Score" />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Current Overall Score</p>
            <p className="text-2xl text-gray-900">95</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Target</p>
            <p className="text-2xl text-gray-900">98</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-gray-900 mb-4">API Reliability & Business Impact</h3>
        <div className="space-y-4">
          {apiReliability.map((api) => {
            const slaStatus = getSLAStatus(api.currentUptime, api.sla);
            return (
              <div key={api.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-2">{api.api}</h4>
                    <div className="flex items-center gap-4">
                      <div className={`px-3 py-1 rounded-lg ${getScoreColor(api.score)}`}>
                        <p className="text-xs">Reliability Score</p>
                        <p className="text-xl">{api.score}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">SLA Target</p>
                        <p className="text-sm text-gray-900">{api.sla}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Current Uptime</p>
                        <p className={`text-sm ${slaStatus.color}`}>{api.currentUptime}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Status</p>
                        <p className={`text-sm ${slaStatus.color}`}>{slaStatus.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="border-l-4 border-red-500 pl-3">
                    <p className="text-xs text-gray-600 mb-1">Revenue Impact</p>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getImpactColor(api.revenueImpact)}`}>
                      {api.revenueImpact}
                    </span>
                    <p className="text-sm text-gray-900 mt-1">{api.estimatedLoss}</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-3">
                    <p className="text-xs text-gray-600 mb-1">Customer Impact</p>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getImpactColor(api.customerImpact)}`}>
                      {api.customerImpact}
                    </span>
                    <p className="text-sm text-gray-900 mt-1">{api.affectedUsers} users</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-3">
                    <p className="text-xs text-gray-600 mb-1">Priority Recommendation</p>
                    <p className="text-sm text-gray-900">
                      {api.score >= 95 ? 'Maintain' : api.score >= 85 ? 'Improve' : 'Urgent Action'}
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-3">
                    <p className="text-xs text-gray-600 mb-1">Action Items</p>
                    <p className="text-sm text-gray-900">
                      {api.score >= 95 ? '0' : api.score >= 85 ? '2' : '5'} pending
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-gray-900 mb-2">Executive Summary</h3>
        <p className="text-gray-700 mb-4">
          Current system reliability is at 95/100, with 2 APIs requiring immediate attention. 
          Total potential revenue exposure is $435K/hour across all critical systems.
          Priority focus should be on Product Catalog API (score: 88) and Notifications API (score: 82) 
          to reduce business risk and improve customer satisfaction.
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            Schedule Review
          </button>
        </div>
      </div>
    </div>
  );
}
