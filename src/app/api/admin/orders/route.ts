import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Order } from '@/types';

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*, items:order_items(*, product:products(*)), user:profiles(full_name, email)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
