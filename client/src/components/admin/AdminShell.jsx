"use client";

import { usePathname } from "next/navigation";

import AdminSidebar from "./AdminSidebar";
import AdminGuard from "./AdminGuard";

export default function AdminShell({
  children,
}) {
  const pathname = usePathname();


  // ========================================
  // LOGIN PAGE
  // No sidebar + no AdminGuard
  // ========================================

  if (pathname === "/admin/login") {
    return children;
  }


  // ========================================
  // PROTECTED ADMIN AREA
  // ========================================

  return (
    <AdminGuard>

      <div className="min-h-screen bg-[#F7FAFC]">

        <div className="flex">

          <AdminSidebar />

          <main className="min-w-0 flex-1">
            {children}
          </main>

        </div>

      </div>

    </AdminGuard>
  );
}