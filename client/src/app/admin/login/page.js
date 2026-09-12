"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5000";

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Login failed"
        );
      }

      localStorage.setItem(
        "admin_token",
        data.token
      );

      localStorage.setItem(
        "admin_email",
        data.admin.email
      );

      router.push("/admin");

    } catch (error) {

      setError(
        error.message ||
          "Unable to login"
      );

    } finally {

      setLoading(false);

    }
  }


  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7FAFC] px-4">

      <div className="w-full max-w-md">

        <div className="rounded-3xl border border-[#DCE8F0] bg-white p-7 shadow-xl md:p-9">

          {/* ICON */}

          <div className="flex justify-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#082D52] text-[#D3A72F]">

              <LockKeyhole size={26} />

            </div>

          </div>


          {/* HEADER */}

          <div className="mt-6 text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D3A72F]">
              Next Move Estates
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-[#082D52]">
              Admin Login
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to manage properties
              and enquiries.
            </p>

          </div>


          {/* ERROR */}

          {error && (

            <div className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">

              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <span>
                {error}
              </span>

            </div>

          )}


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#082D52]"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="admin@example.com"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    py-3
                    pl-11
                    pr-4
                    text-sm
                    text-[#082D52]
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#082D52]
                    focus:ring-2
                    focus:ring-[#082D52]/10
                  "
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#082D52]"
              >
                Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter your password"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    py-3
                    pl-11
                    pr-12
                    text-sm
                    text-[#082D52]
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#082D52]
                    focus:ring-2
                    focus:ring-[#082D52]/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#082D52]"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>


            {/* LOGIN */}

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#D3A72F]
                px-5
                py-3.5
                font-semibold
                text-[#082D52]
                transition
                hover:bg-[#E1B93E]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {loading
                ? "Signing in..."
                : "Sign In"}

              {!loading && (
                <LogIn size={18} />
              )}

            </button>

          </form>


          <div className="mt-6 border-t border-gray-100 pt-5 text-center">

            <Link
              href="/"
              className="text-sm font-medium text-gray-500 transition hover:text-[#082D52]"
            >
              ← Back to website
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}