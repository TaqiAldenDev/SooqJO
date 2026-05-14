'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { useCart } from '@/lib/store/useCart';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const totalItems = useCart((state) => state.totalItems());

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter">
              SOOQ<span className="text-gray-900">JO</span>
            </Link>
          </div>

          {/* Search Bar - Hidden on Mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent rounded-full focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
              <User size={24} />
            </Link>
            
            <Link href="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors">
              <ShoppingBag size={24} />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <button className="md:hidden text-gray-600">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
