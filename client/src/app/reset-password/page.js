"use client";

import {
  Suspense,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

import Link from "next/link";
import Image from "next/image";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
} from "lucide-react";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";


export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <ResetPasswordLoading />
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}


function ResetPasswordForm() {
  const searchParams =
    useSearchParams();

  const token =
    searchParams.get("token");


  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");


    if (!token) {
      setError(
        "This password reset link is invalid. Please request a new one."
      );

      return;
    }


    if (!password) {
      setError(
        "Please enter a new password."
      );

      return;
    }


    if (
      password.length < 8
    ) {
      setError(
        "Password must be at least 8 characters."
      );

      return;
    }


    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }


    try {
      setLoading(true);


      const response =
        await fetch(
          `${API_URL}/api/customer-auth/reset-password`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              token,
              password,
            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {
        setError(
          data.message ||
            "Unable to reset your password."
        );

        return;
      }


      setSuccess(true);


    } catch (error) {

      console.error(
        "Reset password error:",
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

            <Link href="/">
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


          <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">


            {success ? (

              /* SUCCESS */

              <div className="py-5 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">

                  <CheckCircle2
                    size={32}
                    className="text-green-600"
                  />

                </div>


                <h1 className="mt-5 text-2xl font-semibold text-[#082D52]">
                  Password updated
                </h1>


                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Your password has been reset successfully. You can now sign in using your new password.
                </p>


                <Link
                  href="/sign-in"
                  className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-[#082D52] px-7 text-sm font-bold text-white transition hover:bg-[#0b3b6a]"
                >
                  Sign in
                </Link>

              </div>

            ) : (

              <>

                <div className="text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#082D52]/5">

                    <KeyRound
                      size={25}
                      className="text-[#D3A72F]"
                    />

                  </div>


                  <h1 className="mt-5 text-2xl font-semibold text-[#082D52]">
                    Create new password
                  </h1>


                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Choose a strong password for your Next Move Estates account.
                  </p>

                </div>


                {!token && (

                  <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                    This reset link does not contain a valid token.

                    <Link
                      href="/forgot-password"
                      className="ml-1 font-bold underline"
                    >
                      Request a new link
                    </Link>
                  </div>

                )}


                {error && (

                  <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                    {error}
                  </div>

                )}


                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="mt-7 space-y-5"
                >


                  {/* NEW PASSWORD */}

                  <div>

                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-[#082D52]"
                    >
                      New password
                    </label>


                    <div className="relative mt-2">

                      <LockKeyhole
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />


                      <input
                        id="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) =>
                          setPassword(
                            e.target.value
                          )
                        }
                        placeholder="Minimum 8 characters"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-[#082D52] outline-none transition focus:border-[#D3A72F] focus:ring-2 focus:ring-[#D3A72F]/10"
                      />


                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (value) =>
                              !value
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#082D52]"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >

                        {showPassword ? (
                          <EyeOff
                            size={18}
                          />
                        ) : (
                          <Eye
                            size={18}
                          />
                        )}

                      </button>

                    </div>

                  </div>


                  {/* CONFIRM PASSWORD */}

                  <div>

                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-semibold text-[#082D52]"
                    >
                      Confirm new password
                    </label>


                    <div className="relative mt-2">

                      <LockKeyhole
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />


                      <input
                        id="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        autoComplete="new-password"
                        value={
                          confirmPassword
                        }
                        onChange={(e) =>
                          setConfirmPassword(
                            e.target.value
                          )
                        }
                        placeholder="Enter password again"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-[#082D52] outline-none transition focus:border-[#D3A72F] focus:ring-2 focus:ring-[#D3A72F]/10"
                      />


                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (value) =>
                              !value
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#082D52]"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >

                        {showConfirmPassword ? (
                          <EyeOff
                            size={18}
                          />
                        ) : (
                          <Eye
                            size={18}
                          />
                        )}

                      </button>

                    </div>

                  </div>


                  <button
                    type="submit"
                    disabled={
                      loading ||
                      !token
                    }
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-[#082D52] px-5 text-sm font-bold text-white transition hover:bg-[#0b3b6a] disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    {loading ? (
                      <>
                        <Loader2
                          size={18}
                          className="mr-2 animate-spin"
                        />
                        Updating...
                      </>
                    ) : (
                      "Reset password"
                    )}

                  </button>

                </form>


                <div className="mt-7 text-center">

                  <Link
                    href="/sign-in"
                    className="text-sm font-semibold text-[#082D52] transition hover:text-[#D3A72F]"
                  >
                    Back to sign in
                  </Link>

                </div>

              </>

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


function ResetPasswordLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F6F8FA]">

      <div className="text-center">

        <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#D3A72F]" />

        <p className="mt-3 text-sm text-slate-500">
          Loading...
        </p>

      </div>

    </main>
  );
}