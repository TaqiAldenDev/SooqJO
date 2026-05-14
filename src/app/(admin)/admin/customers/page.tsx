import { createAdminClient } from '@/lib/supabase/admin';
import { User, Mail, Calendar, Shield, MoreHorizontal } from 'lucide-react';

export default async function AdminCustomersPage() {
  const supabase = createAdminClient();
  const { data: customers, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'CUSTOMER')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-8 text-red-600 font-bold">Error loading customers: {error.message}</div>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Customers</h1>
        <p className="text-gray-500 mt-2 font-medium">Manage and view your registered user base.</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-xl hover:shadow-blue-500/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-gray-400 uppercase text-xs font-black tracking-widest">
              <tr>
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6">Email</th>
                <th className="px-8 py-6">Joined Date</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold group-hover:scale-110 transition-transform">
                        {customer.full_name?.charAt(0).toUpperCase() || <User size={20} />}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{customer.full_name || 'Anonymous'}</div>
                        <div className="text-xs text-gray-400 font-medium uppercase tracking-tighter">ID: {customer.id.slice(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail size={16} className="text-gray-300" />
                      <span>{customer.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar size={16} className="text-gray-300" />
                      <span>{new Date(customer.created_at).toLocaleDateString('en-JO', { dateStyle: 'medium' })}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                      Active
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-gray-300 hover:text-gray-900 hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-md">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center">
                      <User size={48} className="text-gray-200 mb-4" />
                      <h3 className="text-lg font-bold text-gray-900">No customers found</h3>
                      <p className="text-gray-500">New customers will appear here once they register.</p>
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
