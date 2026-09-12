"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  LoaderCircle,
} from "lucide-react";

export default function AdminGuard({
  children,
}) {
  const router = useRouter();

  const [checking, setChecking] =
    useState(true);

  useEffect(() => {
    async function verifyAdmin() {
      const token =
        localStorage.getItem("admin_token");

      // No token
      if (!token) {
        router.replace("/admin/login");
        return;
      }

      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:5000";

        const response = await fetch(
          `${API_URL}/api/auth/verify`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          localStorage.removeItem(
            "admin_token"
          );

          localStorage.removeItem(
            "admin_email"
          );

          router.replace(
            "/admin/login"
          );

          return;
        }

        setChecking(false);

      } catch (error) {
        console.error(
          "Admin verification error:",
          error
        );

        localStorage.removeItem(
          "admin_token"
        );

        localStorage.removeItem(
          "admin_email"
        );

        router.replace("/admin/login");
      }
    }

    verifyAdmin();

  }, [router]);


  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7FAFC]">

        <div className="text-center">

          <LoaderCircle
            size={34}
            className="mx-auto animate-spin text-[#082D52]"
          />

          <p className="mt-4 text-sm text-gray-500">
            Checking admin access...
          </p>

        </div>

      </div>
    );
  }


  return children;
}