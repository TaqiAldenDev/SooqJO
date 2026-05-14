import { ProductForm } from '@/components/admin/ProductForm';
import { productService } from '@/services/productService';

export default async function NewProductPage() {
  const categories = await productService.getCategories();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-500">Create a new product listing in your store.</p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
