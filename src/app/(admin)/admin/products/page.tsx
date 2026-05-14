import Link from 'next/link';
import { Plus, Search, Edit, Trash2, ExternalLink, Package } from 'lucide-react';
import { productService } from '@/services/productService';

export default async function AdminProductsPage() {
  const products = await productService.adminGetProducts();

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Products</h1>
          <p className="text-gray-500 mt-2 font-medium">Manage your product inventory and stock levels.</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl flex items-center space-x-2 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 font-bold"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-xl hover:shadow-blue-500/5">
        <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products by name or SKU..." 
              className="pl-12 pr-4 py-4 w-full rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-gray-400 uppercase text-xs font-black tracking-widest">
              <tr>
                <th className="px-8 py-6">Product Info</th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6">Pricing</th>
                <th className="px-8 py-6">Inventory</th>
                <th className="px-8 py-6">Visibility</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex-shrink-0 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                        {product.image_urls?.[0] ? (
                          <img src={product.image_urls[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-full h-full p-3 text-gray-300" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</div>
                        <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">SKU: {product.slug.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                      {product.category?.name || 'General'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-black text-gray-900">JOD {product.price.toFixed(2)}</div>
                    {product.sale_price && (
                      <div className="text-[10px] text-red-500 line-through font-bold">JOD {product.sale_price.toFixed(2)}</div>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${product.stock_quantity > 10 ? 'bg-green-500' : product.stock_quantity > 0 ? 'bg-orange-500' : 'bg-red-500'}`} />
                      <span className="text-sm font-bold text-gray-700">{product.stock_quantity} in stock</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      product.is_active ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      {product.is_active ? 'Public' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-md" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className="p-3 text-gray-400 hover:text-red-600 hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-md" title="Delete">
                        <Trash2 size={18} />
                      </button>
                      <Link href={`/products/${product.slug}`} className="p-3 text-gray-400 hover:text-gray-900 hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-md" title="View Storefront">
                        <ExternalLink size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center">
                      <Package size={48} className="text-gray-200 mb-4" />
                      <h3 className="text-xl font-bold text-gray-900">Your catalog is empty</h3>
                      <p className="text-gray-500 mt-2">Start adding products to see them here.</p>
                      <Link href="/admin/products/new" className="mt-6 text-blue-600 font-bold hover:underline flex items-center space-x-2">
                        <Plus size={18} />
                        <span>Add first product</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
