import { createAdminClient } from '@/lib/supabase/admin';
import { StatusSelector } from '@/components/admin/StatusSelector';
import { Package, Calendar, User, Phone, MapPin, ReceiptText } from 'lucide-react';

export default async function AdminOrdersPage() {
  const supabase = createAdminClient();
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*, product:products(*)), user:profiles(full_name, email)')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-8 text-red-600 font-bold tracking-tight">Error loading orders: {error.message}</div>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Orders</h1>
        <p className="text-gray-500 mt-2 font-medium">Track, manage, and process customer orders in real-time.</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-xl hover:shadow-blue-500/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-gray-400 uppercase text-xs font-black tracking-widest">
              <tr>
                <th className="px-8 py-6">Order Details</th>
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6">Items</th>
                <th className="px-8 py-6">Total Amount</th>
                <th className="px-8 py-6">Status Control</th>
                <th className="px-8 py-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                        <ReceiptText size={20} />
                      </div>
                      <span className="font-black text-sm text-gray-900 uppercase tracking-tighter">
                        #{order.id.slice(-8)}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{order.user?.full_name || 'Anonymous'}</span>
                      <div className="flex items-center space-x-1 text-[10px] text-gray-400 font-bold mt-1">
                        <Phone size={10} />
                        <span>{order.contact_number}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex -space-x-3">
                      {order.items?.slice(0, 3).map((item: any, i: number) => (
                        <div key={i} className="w-10 h-10 rounded-xl border-2 border-white bg-gray-50 shadow-sm overflow-hidden" title={item.product?.name}>
                          <img src={item.product?.image_urls[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {order.items?.length > 3 && (
                        <div className="w-10 h-10 rounded-xl border-2 border-white bg-gray-900 flex items-center justify-center text-[10px] font-black text-white">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-lg font-black text-blue-600">JOD {order.total_amount.toFixed(2)}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{order.items?.length} Items</div>
                  </td>
                  <td className="px-8 py-6">
                    <StatusSelector status={order.status} orderId={order.id} />
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-500 font-medium">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-gray-300" />
                      <span>{new Date(order.created_at).toLocaleDateString('en-JO', { dateStyle: 'medium' })}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center">
                      <Package size={48} className="text-gray-200 mb-4" />
                      <h3 className="text-xl font-bold text-gray-900">No orders yet</h3>
                      <p className="text-gray-500 mt-2">When customers place orders, they will appear here.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
