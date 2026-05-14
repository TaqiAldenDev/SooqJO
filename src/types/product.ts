export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price?: number;
  stock_quantity: number;
  image_urls: string[];
  category_id: string;
  category?: Category;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type CreateProductInput = Omit<Product, 'id' | 'created_at' | 'updated_at' | 'category'>;
export type UpdateProductInput = Partial<CreateProductInput>;
