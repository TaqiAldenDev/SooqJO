'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductInput } from '@/lib/validators/product';
import { Category } from '@/types';
import { X, Upload, Loader2 } from 'lucide-react';

interface ProductFormProps {
  initialData?: any;
  categories: Category[];
}

export function ProductForm({ initialData, categories }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageInput, setImageInput] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      image_urls: [],
      is_active: true,
      is_featured: false,
    },
  });

  const imageUrls = watch('image_urls');

  const onSubmit = async (data: ProductInput) => {
    setLoading(true);
    try {
      const url = initialData 
        ? `/api/admin/products/${initialData.id}` 
        : '/api/admin/products';
      
      const response = await fetch(url, {
        method: initialData ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save product');

      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving the product');
    } finally {
      setLoading(false);
    }
  };

  const addImageUrl = () => {
    if (imageInput && imageInput.startsWith('http')) {
      setValue('image_urls', [...imageUrls, imageInput]);
      setImageInput('');
    }
  };

  const removeImageUrl = (index: number) => {
    setValue('image_urls', imageUrls.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              {...register('name')}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. iPhone 15 Pro"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input
              {...register('slug')}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. iphone-15-pro"
            />
            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              {...register('category_id')}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (JOD)</label>
              <input
                type="number"
                step="0.01"
                {...register('price', { valueAsNumber: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                {...register('stock_quantity', { valueAsNumber: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.stock_quantity && <p className="text-red-500 text-xs mt-1">{errors.stock_quantity.message}</p>}
            </div>
          </div>
        </div>

        {/* Media & Options */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Images (URLs)</label>
            <div className="flex space-x-2">
              <input
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="https://example.com/image.jpg"
              />
              <button
                type="button"
                onClick={addImageUrl}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group aspect-square rounded-lg border border-gray-100 overflow-hidden">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImageUrl(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            {errors.image_urls && <p className="text-red-500 text-xs mt-1">{errors.image_urls.message}</p>}
          </div>

          <div className="flex space-x-6 pt-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" {...register('is_active')} className="rounded text-blue-600 focus:ring-blue-500" />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" {...register('is_featured')} className="rounded text-blue-600 focus:ring-blue-500" />
              <span className="text-sm font-medium text-gray-700">Featured</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Detailed product description..."
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:bg-blue-400"
        >
          {loading && <Loader2 className="animate-spin" size={20} />}
          <span>{initialData ? 'Update Product' : 'Create Product'}</span>
        </button>
      </div>
    </form>
  );
}
