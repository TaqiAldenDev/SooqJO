import { Product } from './product';

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  total_amount: number;
  shipping_address: string;
  contact_number: string;
  items?: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface CreateOrderInput {
  shipping_address: string;
  contact_number: string;
  items: {
    product_id: string;
    quantity: number;
  }[];
}
