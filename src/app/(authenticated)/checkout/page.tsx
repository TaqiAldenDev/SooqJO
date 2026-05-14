'use client';

import { useCart } from '@/lib/store/useCart';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, CheckoutInput } from '@/lib/validators/order';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      items: items.map(item => ({ product_id: item.id, quantity: item.quantity })),
    }
  });

  if (!mounted) return null;

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const onSubmit = async (data: CheckoutInput) => {
    setLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to place order');
      }

      const order = await response.json();
      clearCart();
      router.push(`/checkout/success?id=${order.id}`);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link href="/cart" className="text-gray-500 hover:text-gray-900 flex items-center space-x-2 text-sm font-medium">
          <ArrowLeft size={16} />
          <span>Back to Cart</span>
        </Link>
      </div>

      <h1 className="text-4xl font-black text-gray-900 mb-12 tracking-tight">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Checkout Form */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              <span>Delivery Information</span>
            </h2>
            
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                <textarea
                  {...register('shipping_address')}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g. Amman, 7th Circle, Princess Rahma St, Building 12, Apt 4"
                />
                {errors.shipping_address && <p className="text-red-500 text-xs mt-1">{errors.shipping_address.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number (Jordan)</label>
                <input
                  type="text"
                  {...register('contact_number')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="079xxxxxxx"
                />
                {errors.contact_number && <p className="text-red-500 text-xs mt-1">{errors.contact_number.message}</p>}
              </div>
            </form>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              <span>Payment Method</span>
            </h2>
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex items-center space-x-4">
              <div className="bg-white p-3 rounded-xl text-blue-600 shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Cash on Delivery (COD)</h3>
                <p className="text-gray-500 text-sm">Pay with cash when your order arrives.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="bg-gray-900 text-white p-10 rounded-[2.5rem] sticky top-32">
            <h2 className="text-2xl font-bold mb-8">Summary</h2>
            
            <div className="space-y-6 max-h-[300px] overflow-y-auto mb-8 pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image_urls[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate w-32">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold">JOD {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-gray-800">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>JOD {totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>
              <div className="pt-4 flex justify-between text-2xl font-black">
                <span>Total</span>
                <span className="text-blue-500">JOD {totalPrice().toFixed(2)}</span>
              </div>
            </div>

            <button
              form="checkout-form"
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-bold text-xl mt-12 transition-all flex items-center justify-center space-x-3 disabled:bg-blue-800"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <span>Place Order</span>}
            </button>
            
            <p className="text-center text-gray-500 text-xs mt-6">
              By placing your order, you agree to our Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
