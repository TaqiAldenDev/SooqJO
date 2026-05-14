import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { Product, Category, CreateProductInput, UpdateProductInput } from '@/types';

export const productService = {
  async getProducts() {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Product[];
  },

  async getProductBySlug(slug: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as Product;
  },

  async searchProducts(query: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .ilike('name', `%${query}%`)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Product[];
  },

  async getCategories() {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data as Category[];
  },

  // Admin methods
  async adminGetProducts() {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Product[];
  },

  async createProduct(input: CreateProductInput) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('products')
      .insert(input)
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  },

  async updateProduct(id: string, input: UpdateProductInput) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('products')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  },

  async deleteProduct(id: string) {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
