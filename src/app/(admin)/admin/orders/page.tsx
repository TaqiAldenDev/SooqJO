import { createAdminClient } from '@/lib/supabase/admin';
import { StatusSelector } from '@/components/admin/StatusSelector';
import { Package, Calendar, User, Phone, MapPin } from 'lucide-react';

export default async function AdminOrdersPage() {
  const supabase = createAdminClient();
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*, product:products(*)), user:profiles(full_name, email)')
    .order('created_at', { ascending: false });

  if (error) {
    return <div>Error loading orders</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500">Track and manage customer orders.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-blue-600 font-bold">
                      #{order.id.slice(-8).toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{order.user?.full_name || 'Anonymous'}</span>
                      <span className="text-xs text-gray-500">{order.contact_number}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {order.items?.map((item: any, i: number) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden" title={item.product?.name}>
                          <img src={item.product?.image_urls[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {order.items?.length > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    JOD {order.total_amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusSelector status={order.status} orderId={order.id} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No orders found yet.
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
