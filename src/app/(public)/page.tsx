import { ProductCard } from '@/components/customer/ProductCard';
import { productService } from '@/services/productService';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  const products = await productService.getProducts();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-900 overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-2xl text-white space-y-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              Premium Tech for <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">Your Lifestyle</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover the latest in high-performance electronics, gadgets, and home tech. Selected for quality, delivered with care across Jordan.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link 
                href="/shop"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center space-x-2 transition-all hover:translate-x-1"
              >
                <span>Shop Collection</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-white rounded-3xl border border-gray-100 shadow-sm shadow-blue-500/5">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Fast Delivery</h3>
              <p className="text-gray-500 text-sm">Within 24-48 hours in Amman</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Safe Payments</h3>
              <p className="text-gray-500 text-sm">Secure transactions & Cash on Delivery</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-green-50 text-green-600 rounded-2xl">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Easy Returns</h3>
              <p className="text-gray-500 text-sm">14-day hassle-free return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">New Arrivals</h2>
            <p className="text-gray-500 mt-2">The freshest gear just dropped in our store.</p>
          </div>
          <Link href="/shop" className="text-blue-600 font-bold hover:underline underline-offset-4 flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              No products found. Stay tuned for new arrivals!
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Get Exclusive <span className="text-blue-200">Deals</span> in Your Inbox
            </h2>
            <p className="text-blue-100 text-lg">
              Join our community of 5,000+ tech enthusiasts in Jordan and never miss a drop.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-8 py-5 rounded-2xl bg-white border-none outline-none text-gray-900 font-medium focus:ring-4 focus:ring-blue-400/50 transition-all"
              />
              <button className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-black transition-all hover:scale-105 active:scale-95">
                Subscribe Now
              </button>
            </form>
            <p className="text-blue-200/60 text-sm">
              No spam, ever. Unsubscribe with one click.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
