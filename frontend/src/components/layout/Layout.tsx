import React from 'react';
import Header from './Header';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  
  // Don't show header on login and register pages
  const isAuthPage = pathname?.startsWith('/auth/');

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthPage && <Header />}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;