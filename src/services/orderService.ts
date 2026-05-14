import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { CreateOrderInput, Order } from '@/types';

export const orderService = {
  async createOrder(userId: string, input: CreateOrderInput) {
    const supabase = createAdminClient();

    // Prepare data for RPC
    // The RPC should handle:
    // 1. Creating the order record
    // 2. Creating order_items records
    // 3. Decrementing stock_quantity in products table
    const { data, error } = await supabase.rpc('create_order_transaction', {
      p_user_id: userId,
      p_shipping_address: input.shipping_address,
      p_contact_number: input.contact_number,
      p_items: input.items, // Array of { product_id, quantity }
    });

    if (error) {
      console.error('Order transaction error:', error);
      throw new Error(error.message || 'Failed to place order');
    }

    return data as Order;
  },

  async getUserOrders(userId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*, items:order_items(*, product:products(*))')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Order[];
  },

  async getOrderById(orderId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*, items:order_items(*, product:products(*))')
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data as Order;
  }
};
