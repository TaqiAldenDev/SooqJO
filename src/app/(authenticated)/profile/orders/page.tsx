import { getAuthUser } from '@/lib/auth-utils';
import { orderService } from '@/services/orderService';
import { Package, Truck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const statusIcons: Record<string, any> = {
  PENDING: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  PROCESSING: { icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
  SHIPPED: { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50' },
  DELIVERED: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
  CANCELLED: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
};

export default async function UserOrdersPage() {
  const user = await getAuthUser();
  if (!user) return null;

  const orders = await orderService.getUserOrders(user.userId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => {
          const StatusIcon = statusIcons[order.status].icon;
          return (
            <div key={order.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="p-6 border-b border-gray-50 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-2xl ${statusIcons[order.status].bg} ${statusIcons[order.status].color}`}>
                    <StatusIcon size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Order #{order.id.slice(-8).toUpperCase()}</p>
                    <p className="font-bold text-gray-900">{order.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-xl font-black text-blue-600">JOD {order.total_amount.toFixed(2)}</p>
                </div>
              </div>

              <div className="p-6 bg-gray-50/50">
                <div className="space-y-4">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white rounded-xl border border-gray-100 overflow-hidden flex-shrink-0">
                        <img src={item.product?.image_urls[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">{item.product?.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity} × JOD {item.unit_price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center text-sm">
                  <span className="text-gray-500">Placed on {new Date(order.created_at).toLocaleDateString()}</span>
                  <Link href={`/checkout/success?id=${order.id}`} className="text-blue-600 font-bold hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {orders.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium text-lg">You haven't placed any orders yet.</p>
            <Link href="/" className="text-blue-600 font-bold mt-2 inline-block">Start Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
}
