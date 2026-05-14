import { z } from 'zod';

export const checkoutSchema = z.object({
  shipping_address: z.string().min(10, 'Please provide a detailed address (City, Street, Building)'),
  contact_number: z.string().regex(/^(07[789]\d{7})$/, 'Invalid Jordanian mobile number (e.g. 079xxxxxxx)'),
  items: z.array(z.object({
    product_id: z.string().uuid(),
    quantity: z.number().int().positive(),
  })).min(1, 'Cart cannot be empty'),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
