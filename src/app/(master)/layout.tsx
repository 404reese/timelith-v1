// src/app/(protected)/layout.tsx
"use client";

import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';
import { useState } from 'react';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} toggleCollapse={() => setIsCollapsed(!isCollapsed)} />

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? 'ml-16' : 'ml-64'
        } p-4`}
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}


