import { productService } from '@/services/productService';
import { ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { notFound } from 'next/navigation';
import { AddToCartButton } from '@/components/customer/AddToCartButton';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await productService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
            <img 
              src={product.image_urls[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.image_urls.map((url, i) => (
              <div key={i} className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-8">
          <div>
            <div className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-2">
              {product.category?.name}
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center space-x-4">
              <span className="text-3xl font-black text-gray-900">
                JOD {product.price.toFixed(2)}
              </span>
              {product.sale_price && (
                <span className="text-xl text-gray-400 line-through">
                  JOD {product.sale_price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="pt-6 space-y-4">
            <div className="flex items-center space-x-4">
              <AddToCartButton product={product} />
              <button className="p-4 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-colors">
                <Heart size={24} />
              </button>
            </div>
            <p className="text-sm text-gray-500 flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${product.stock_quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              <span>{product.stock_quantity > 0 ? 'In Stock (Ready to Ship)' : 'Out of Stock'}</span>
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <ShieldCheck className="text-blue-500" size={24} />
              <span>1 Year Warranty</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Truck className="text-blue-500" size={24} />
              <span>Free Local Delivery</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <RefreshCw className="text-blue-500" size={24} />
              <span>14-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
