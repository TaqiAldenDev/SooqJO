'use client';

import { useCart } from '@/lib/store/useCart';
import { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`flex-1 flex items-center justify-center space-x-3 px-8 py-4 rounded-2xl font-bold transition-all ${
        added ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      <ShoppingCart size={20} />
      <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
    </button>
  );
}
