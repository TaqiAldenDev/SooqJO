import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  TrendingUp 
} from 'lucide-react';

const stats = [
  { name: 'Total Revenue', value: 'JOD 12,345', icon: DollarSign, change: '+12%', color: 'text-green-600' },
  { name: 'Active Orders', value: '45', icon: ShoppingCart, change: '+5%', color: 'text-blue-600' },
  { name: 'Total Products', value: '128', icon: Package, change: '+2', color: 'text-purple-600' },
  { name: 'Sales Growth', value: '23%', icon: TrendingUp, change: '+3%', color: 'text-orange-600' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back to the sooqJO admin panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80 flex items-center justify-center text-gray-400">
          Recent Sales Chart Placeholder
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80 flex items-center justify-center text-gray-400">
          Top Products Placeholder
        </div>
      </div>
    </div>
  );
}
