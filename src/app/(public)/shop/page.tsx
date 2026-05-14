import { ProductCard } from '@/components/customer/ProductCard';
import { productService } from '@/services/productService';
import { Filter, SlidersHorizontal } from 'lucide-react';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string };
}) {
  let products = [];
  const categories = await productService.getCategories();

  if (searchParams.search) {
    products = await productService.searchProducts(searchParams.search);
  } else {
    products = await productService.getProducts();
    if (searchParams.category) {
      products = products.filter(p => p.category?.slug === searchParams.category);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            {searchParams.search ? `Search results for "${searchParams.search}"` : 'Shop Collection'}
          </h1>
          <p className="text-gray-500 mt-2">{products.length} products found</p>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
            <SlidersHorizontal size={18} />
            <span>Sort By</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Filters */}
        <div className="hidden lg:block space-y-10">
          <div>
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center space-x-2">
              <Filter size={20} />
              <span>Categories</span>
            </h3>
            <div className="space-y-4">
              <a 
                href="/shop" 
                className={`block text-sm font-medium transition-colors ${!searchParams.category ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
              >
                All Products
              </a>
              {categories.map((cat) => (
                <a 
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  className={`block text-sm font-medium transition-colors ${searchParams.category === cat.slug ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-gray-900 mb-6">Price Range</h3>
            <div className="space-y-4">
              {/* Simple price range toggles for MVP */}
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors">Under JOD 50</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors">JOD 50 - JOD 200</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors">Above JOD 200</span>
              </label>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {products.length === 0 && (
            <div className="py-32 text-center">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <Package size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
