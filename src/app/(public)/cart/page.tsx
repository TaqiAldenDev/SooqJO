'use client';

import { useCart } from '@/lib/store/useCart';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8 text-gray-400">
          <ShoppingBag size={48} />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto text-lg">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link 
          href="/"
          className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold transition-all hover:bg-blue-700 inline-block"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-black text-gray-900 mb-12 tracking-tight">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm shadow-blue-500/5 transition-all hover:shadow-md">
              <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={item.image_urls[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg truncate mb-1">{item.name}</h3>
                <p className="text-blue-600 font-black mb-4">JOD {item.price.toFixed(2)}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 bg-gray-50 rounded-full px-4 py-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 text-white p-8 rounded-3xl sticky top-32">
            <h2 className="text-xl font-bold mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal ({totalItems()} items)</span>
                <span>JOD {totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>
              <div className="pt-4 border-t border-gray-800 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-blue-500">JOD {totalPrice().toFixed(2)}</span>
              </div>
            </div>

            <Link 
              href="/checkout"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
            >
              <span>Secure Checkout</span>
              <ArrowRight size={20} />
            </Link>

            <div className="mt-8 pt-8 border-t border-gray-800 grid grid-cols-3 gap-4 grayscale opacity-50">
              {/* Payment Icons Placeholder */}
              <div className="h-8 bg-gray-800 rounded animate-pulse" />
              <div className="h-8 bg-gray-800 rounded animate-pulse" />
              <div className="h-8 bg-gray-800 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
