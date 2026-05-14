'use client';

import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
        <CheckCircle size={48} />
      </div>
      
      <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Order Placed Successfully!</h1>
      <p className="text-gray-500 text-lg mb-8">
        Thank you for shopping with sooqJO. Your order <span className="font-bold text-gray-900">#{orderId?.slice(-6)}</span> has been received and is being processed.
      </p>

      <div className="bg-gray-50 rounded-3xl p-8 mb-12 border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600">
            <Package size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Track Order</h3>
            <p className="text-gray-500 text-sm">You'll receive an SMS with tracking details once shipped.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white rounded-xl shadow-sm text-green-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Support</h3>
            <p className="text-gray-500 text-sm">Our team will call you shortly to confirm the details.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link 
          href="/"
          className="w-full sm:w-auto bg-gray-900 text-white px-10 py-4 rounded-full font-bold transition-all hover:bg-black"
        >
          Continue Shopping
        </Link>
        <Link 
          href="/profile/orders"
          className="w-full sm:w-auto bg-white border border-gray-200 text-gray-900 px-10 py-4 rounded-full font-bold transition-all hover:bg-gray-50 flex items-center justify-center space-x-2"
        >
          <span>View Orders</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
