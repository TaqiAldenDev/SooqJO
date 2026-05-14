import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  sale_price: z.number().positive().optional().nullable(),
  stock_quantity: z.number().int().nonnegative('Stock cannot be negative'),
  image_urls: z.array(z.string().url()).min(1, 'At least one image is required'),
  category_id: z.string().uuid('Invalid category ID'),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;
