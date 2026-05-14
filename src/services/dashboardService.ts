import { createAdminClient } from '@/lib/supabase/admin';

export const dashboardService = {
  async getStats() {
    const supabase = createAdminClient();

    // 1. Total Revenue
    const { data: revenueData } = await supabase
      .from('orders')
      .select('total_amount')
      .neq('status', 'CANCELLED');
    
    const totalRevenue = revenueData?.reduce((acc, order) => acc + order.total_amount, 0) || 0;

    // 2. Active Orders (Pending + Processing)
    const { count: activeOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .in('status', ['PENDING', 'PROCESSING']);

    // 3. Total Products
    const { count: totalProducts } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    // 4. Total Customers
    const { count: totalCustomers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'CUSTOMER');

    return {
      totalRevenue,
      activeOrders: activeOrders || 0,
      totalProducts: totalProducts || 0,
      totalCustomers: totalCustomers || 0
    };
  }
};
