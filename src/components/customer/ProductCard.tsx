'use client';

import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/lib/store/useCart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img
          src={product.image_urls[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
          <Link 
            href={`/products/${product.slug}`}
            className="p-3 bg-white text-gray-900 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
          >
            <Eye size={20} />
          </Link>
          <button 
            onClick={() => addItem(product)}
            className="p-3 bg-white text-gray-900 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
          >
            <ShoppingCart size={20} />
          </button>
        </div>

        {/* Featured Tag */}
        {product.is_featured && (
          <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="text-xs text-gray-400 mb-1">{product.category?.name}</div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            JOD {product.price.toFixed(2)}
          </span>
          {product.sale_price && (
            <span className="text-sm text-gray-400 line-through">
              JOD {product.sale_price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
