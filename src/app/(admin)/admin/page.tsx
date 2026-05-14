import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { dashboardService } from '@/services/dashboardService';

export default async function AdminDashboard() {
  const statsData = await dashboardService.getStats();

  const stats = [
    { 
      name: 'Total Revenue', 
      value: `JOD ${statsData.totalRevenue.toLocaleString()}`, 
      icon: DollarSign, 
      change: '+12%', 
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    { 
      name: 'Active Orders', 
      value: statsData.activeOrders.toString(), 
      icon: ShoppingCart, 
      change: '+5%', 
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    { 
      name: 'Total Products', 
      value: statsData.totalProducts.toString(), 
      icon: Package, 
      change: '+2', 
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    { 
      name: 'Total Customers', 
      value: statsData.totalCustomers.toString(), 
      icon: Users, 
      change: '+8%', 
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2 font-medium">Welcome back to the sooqJO admin panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
            <div className="flex items-center justify-between">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-colors group-hover:scale-110 duration-300`}>
                <stat.icon size={28} />
              </div>
              <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg text-xs font-bold">
                <ArrowUpRight size={14} />
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.name}</h3>
              <p className="text-3xl font-black text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-900">Revenue Performance</h3>
            <button className="text-sm font-bold text-blue-600 hover:underline">View Report</button>
          </div>
          <div className="h-64 flex flex-col items-center justify-center text-gray-300 border-2 border-dashed border-gray-50 rounded-3xl">
            <TrendingUp size={48} className="mb-4" />
            <p className="font-medium text-gray-400">Chart data will appear here as sales grow.</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-black text-gray-900 mb-8">Quick Actions</h3>
          <div className="space-y-4">
            <a href="/admin/products/new" className="block w-full text-center py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all">
              Add New Product
            </a>
            <a href="/admin/orders" className="block w-full text-center py-4 bg-white border border-gray-200 text-gray-900 rounded-2xl font-bold hover:bg-gray-50 transition-all">
              Manage Orders
            </a>
            <button className="block w-full text-center py-4 bg-blue-50 text-blue-600 rounded-2xl font-bold hover:bg-blue-100 transition-all">
              Generate Sales Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
