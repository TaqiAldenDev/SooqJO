import { Navbar } from '@/components/customer/Navbar';
import { getAuthUser } from '@/lib/auth-utils';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-50 border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">© 2026 sooqJO. Built for Jordan.</p>
        </div>
      </footer>
    </div>
  );
}
