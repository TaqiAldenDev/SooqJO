import { Settings, Store, Bell, Shield, CreditCard, Globe } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Settings</h1>
        <p className="text-gray-500 mt-2 font-medium">Manage your platform preferences and store configuration.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Store Profile */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Store size={24} />
            </div>
            <h2 className="text-xl font-black text-gray-900">Store Profile</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Store Name</label>
              <input 
                type="text" 
                defaultValue="sooqJO"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Support Email</label>
              <input 
                type="email" 
                defaultValue="support@sooqjo.com"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-700">Store Description</label>
              <textarea 
                rows={3}
                defaultValue="Jordan's premium e-commerce destination for tech and gadgets."
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              />
            </div>
          </div>
        </section>

        {/* Localization */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
              <Globe size={24} />
            </div>
            <h2 className="text-xl font-black text-gray-900">Localization</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Currency</label>
              <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                <option>Jordanian Dinar (JOD)</option>
                <option>US Dollar (USD)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Timezone</label>
              <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                <option>(GMT+03:00) Amman</option>
              </select>
            </div>
          </div>
        </section>

        {/* Security & Access */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
              <Shield size={24} />
            </div>
            <h2 className="text-xl font-black text-gray-900">Security</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p className="font-bold text-gray-900">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500">Add an extra layer of security to your account.</p>
              </div>
              <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p className="font-bold text-gray-900">IP Whitelisting</p>
                <p className="text-xs text-gray-500">Restrict admin access to specific IP addresses.</p>
              </div>
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest cursor-pointer">Configure</span>
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button className="bg-gray-900 text-white px-12 py-4 rounded-2xl font-black hover:bg-black transition-all shadow-lg hover:scale-105 active:scale-95">
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}
