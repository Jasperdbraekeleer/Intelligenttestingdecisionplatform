import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
}

export function MetricCard({ title, value, change, trend, icon: Icon, iconColor = 'bg-blue-100 text-blue-600' }: MetricCardProps) {
  const getTrendColor = () => {
    if (!trend) return 'text-gray-600';
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-gray-900 mb-1">{value}</p>
          {change && (
            <p className={`text-sm ${getTrendColor()}`}>{change}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${iconColor} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
