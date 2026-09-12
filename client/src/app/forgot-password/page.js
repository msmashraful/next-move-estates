"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export default function ForgotPasswordPage() {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);


    if (!email.trim()) {
      setError(
        "Please enter your email address."
      );

      return;
    }


    try {
      setLoading(true);

      const response =
        await fetch(
          `${API_URL}/api/customer-auth/forgot-password`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email:
                email.trim(),
            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {
        setError(
          data.message ||
            "Unable to send password reset email."
        );

        return;
      }


      setSuccess(true);


    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      );

      setError(
        "Unable to connect to the server. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen bg-[#F6F8FA]">

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 py-12 sm:px-8">

        <div className="w-full max-w-md">


          {/* LOGO */}

          <div className="mb-8 text-center">

            <Link
              href="/"
              className="inline-block"
            >
              <Image
                src="/logo.png"
                alt="Next Move Estates London"
                width={300}
                height={90}
                priority
                className="mx-auto h-auto w-[220px]"
              />
            </Link>

          </div>


          {/* CARD */}

          <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            {!success ? (
              <>

                <div className="text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#082D52]/5">

                    <Mail
                      size={25}
                      className="text-[#D3A72F]"
                    />

                  </div>


                  <h1 className="mt-5 text-2xl font-semibold text-[#082D52]">
                    Forgot your password?
                  </h1>


                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Enter the email address associated with your account and we&apos;ll send you a password reset link.
                  </p>

                </div>


                {/* ERROR */}

                {error && (
                  <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}


                {/* FORM */}

                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="mt-7"
                >

                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-[#082D52]"
                  >
                    Email address
                  </label>


                  <div className="relative mt-2">

                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      placeholder="Enter your email"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-[#082D52] outline-none transition focus:border-[#D3A72F] focus:ring-2 focus:ring-[#D3A72F]/10"
                    />

                  </div>


                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-[#082D52] px-5 text-sm font-bold text-white transition hover:bg-[#0b3b6a] disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {loading ? (
                      <>
                        <Loader2
                          size={18}
                          className="mr-2 animate-spin"
                        />
                        Sending...
                      </>
                    ) : (
                      "Send reset link"
                    )}

                  </button>

                </form>


                <div className="mt-7 text-center">

                  <Link
                    href="/sign-in"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#082D52] transition hover:text-[#D3A72F]"
                  >
                    <ArrowLeft
                      size={16}
                    />
                    Back to sign in
                  </Link>

                </div>

              </>
            ) : (

              /* SUCCESS */

              <div className="py-4 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">

                  <CheckCircle2
                    size={31}
                    className="text-green-600"
                  />

                </div>


                <h1 className="mt-5 text-2xl font-semibold text-[#082D52]">
                  Check your email
                </h1>


                <p className="mt-3 text-sm leading-6 text-slate-500">
                  If an account exists for
                  {" "}
                  <span className="font-semibold text-[#082D52]">
                    {email}
                  </span>
                  , we&apos;ve sent password reset instructions.
                </p>


                <p className="mt-3 text-xs leading-5 text-slate-400">
                  The reset link will expire in 30 minutes.
                </p>


                <Link
                  href="/sign-in"
                  className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-[#082D52] px-6 text-sm font-bold text-white transition hover:bg-[#0b3b6a]"
                >
                  Back to sign in
                </Link>

              </div>
            )}

          </div>


          <p className="mt-6 text-center text-xs text-slate-400">
            Next Move Estates London Limited
          </p>

        </div>

      </div>

    </main>
  );
}