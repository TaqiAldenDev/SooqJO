# AGENT.md — E-Commerce MVP Instructions

## 1. Project Overview
You are an expert Senior Full-Stack Developer working on an E-Commerce MVP. The application has two main interfaces:
1. **Customer Storefront:** Browse products, manage cart, authenticate, and checkout.
2. **Admin Dashboard:** Manage products (CRUD, images, stock), manage orders (status tracking), and view financial dashboards (income/outcomes).

## 2. Tech Stack
- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS (utility-first, NO custom CSS files unless strictly necessary)
- **Database/Auth/Storage:** Supabase (PostgreSQL, Row Level Security)
- **State Management:** Zustand (for client-side cart and UI state)
- **Validation:** Zod (all API inputs and forms MUST be validated)
- **Authentication:** Custom JWT (stored in HTTP-only cookies, NOT localStorage)
- **API Layer:** Next.js Route Handlers (acting as the Express/Node.js API layer)

## 3. Architecture & File Structure Rules
- **Route Groups:** Use `(public)`, `(authenticated)`, and `(admin)` for layout segregation.
- **Components:** Group by domain (`components/ui/`, `components/customer/`, `components/admin/`, `components/shared/`).
- **Services:** All database queries and business logic MUST be in `src/services/`, NOT inside React components or API routes directly.
- **Types:** All TypeScript interfaces/types go in `src/types/`.

## 4. Component Rules (React/Next.js)
- **Server Components by Default:** Unless a component needs `useState`, `useEffect`, event listeners (`onClick`), or browser APIs, it MUST be a Server Component. Do NOT add `"use client"` unnecessarily.
- **Client Components:** Only add `"use client"` to leaf components that require interactivity.
- **Data Fetching:** Fetch data in Server Components using `src/lib/supabase/server.ts`. Do NOT fetch data in `useEffect` if it can be fetched on the server.
- **Naming:** Use `PascalCase` for components (e.g., `ProductCard.tsx`), `kebab-case` for files and folders.

## 5. Supabase & Database Rules
- **Client Instantiation:** 
  - Server/Route Handlers: Use `createServerClient` from `@supabase/ssr`.
  - Client Components: Use `createBrowserClient` from `@supabase/ssr`.
  - Admin Operations: Use `createServiceRoleClient` (bypasses RLS) ONLY in secure Route Handlers, NEVER expose to the client.
- **RLS (Row Level Security):** Always assume RLS is enabled. Write queries knowing that the database enforces security.
- **Data Integrity:** Use Supabase RPC (Remote Procedure Calls) for complex operations involving multiple tables (e.g., `create_order_transaction` for checkout) to ensure atomicity.

## 6. API & Backend Rules (Route Handlers)
- **Validation:** ALWAYS validate request bodies using Zod at the very beginning of the route handler. Reject invalid requests with `400 Bad Request`.
- **Authentication Check:** Extract JWT from HTTP-only cookies. Verify using `jsonwebtoken`. If invalid/expired, return `401 Unauthorized`.
- **Authorization Check:** After verifying the JWT, check the `role` payload. If a user tries to access an `/api/admin/*` route without the `ADMIN` role, return `403 Forbidden`.
- **Error Handling:** NEVER throw raw database errors to the client. Catch errors and return a standardized JSON response: `{ error: "User-friendly message" }`.
- **Rate Limiting:** Apply the `rate-limiter-flexible` logic to sensitive routes (auth, order creation).

## 7. Security Directives (CRITICAL)
- **NO `localStorage` for Tokens:** JWT access and refresh tokens MUST be stored in HTTP-only cookies. Do not write code that puts tokens in localStorage or sessionStorage.
- **NO Secret Leakage:** Never hardcode `JWT_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, or database URLs. Use `process.env.VARIABLE_NAME`.
- **SQL Injection:** Rely on Supabase's parameterized queries. NEVER interpolate user input directly into raw SQL strings.
- **XSS Protection:** When rendering user-generated content (like product names or reviews), ensure React's default escaping is not bypassed (e.g., no `dangerouslySetInnerHTML`).

## 8. Styling Directives
- Use Tailwind utility classes.
- Use standard spacing scales (p-4, m-2, gap-6).
- Ensure mobile-first responsiveness (use `md:`, `lg:` breakpoints).
- Use semantic HTML tags (`<article>`, `<section>`, `<nav>`, `<main>`).

## 9. Anti-Patterns to Avoid
- ❌ Calling Supabase directly from a `<form>` onSubmit without going through an API route for sensitive mutations (like order creation or admin updates).
- ❌ Creating massive "god components" (e.g., a 500-line `CheckoutPage.tsx`). Break them down into `<AddressForm />`, `<CartSummary />`, etc.
- ❌ Using `any` in TypeScript. If you don't know the type, define it in `src/types/` or use `unknown`.
- ❌ Importing `bcryptjs` or `jsonwebtoken` into Client Components. They are Node.js modules and must only run in API routes/Server components.

## 10. Workflow Directives
When asked to implement a feature:
1. Define the TypeScript types in `src/types/`.
2. Create the Zod validation schema in `src/lib/validators/`.
3. Create the service function in `src/services/`.
4. Create the API Route in `src/app/api/`.
5. Create the UI components in `src/components/`.
6. Assemble in the page `src/app/.../page.tsx`.