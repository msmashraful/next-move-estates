"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Link from "next/link";

import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Phone,
  User,
  LockKeyhole,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function SignUpForm() {
  const router = useRouter();

  const googleButtonRef = useRef(null);

  const [googleReady, setGoogleReady] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });


  // ========================================
  // HANDLE FORM CHANGE
  // ========================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };


  // ========================================
  // SAVE CUSTOMER SESSION
  // ========================================

  const saveSession = (data) => {
    localStorage.setItem(
      "customer_token",
      data.token
    );

    localStorage.setItem(
      "customer_user",
      JSON.stringify(data.user)
    );

    window.dispatchEvent(
      new Event("customer-auth-change")
    );
  };


  // ========================================
  // EMAIL REGISTRATION
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const cleanName =
      formData.name.trim();

    const cleanEmail =
      formData.email.trim();

    const cleanPhone =
      formData.phone.trim();


    if (!cleanName) {
      setError(
        "Please enter your full name."
      );

      return;
    }


    if (!cleanEmail) {
      setError(
        "Please enter your email address."
      );

      return;
    }


    if (
      formData.password.length < 8
    ) {
      setError(
        "Password must be at least 8 characters."
      );

      return;
    }


    if (
      formData.password !==
      formData.confirmPassword
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
          `${API_URL}/api/customer-auth/register`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name: cleanName,
              email: cleanEmail,
              phone:
                cleanPhone || null,
              password:
                formData.password,
            }),
          }
        );


      const contentType =
        response.headers.get(
          "content-type"
        );


      let data;


      if (
        contentType?.includes(
          "application/json"
        )
      ) {
        data =
          await response.json();

      } else {
        const text =
          await response.text();

        console.error(
          "Unexpected register response:",
          text
        );

        throw new Error(
          "Unexpected server response."
        );
      }


        if (!response.ok) {
        setError(
            data.message ||
            "Unable to create your account."
        );

        return;
        }


      saveSession(data);

      router.push("/account");
      router.refresh();

    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      setError(
        error.message ||
          "Unable to create your account."
      );

    } finally {
      setLoading(false);
    }
  };


  // ========================================
  // GOOGLE AUTH
  // ========================================

  const handleGoogleCredential =
    async (response) => {

      if (!response?.credential) {
        setError(
          "Google sign in could not be completed."
        );

        return;
      }


      try {
        setGoogleLoading(true);
        setError("");


        const apiResponse =
          await fetch(
            `${API_URL}/api/customer-auth/google`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                credential:
                  response.credential,
              }),
            }
          );


        const contentType =
          apiResponse.headers.get(
            "content-type"
          );


        let data;


        if (
          contentType?.includes(
            "application/json"
          )
        ) {
          data =
            await apiResponse.json();

        } else {
          const text =
            await apiResponse.text();

          console.error(
            "Unexpected Google response:",
            text
          );

          throw new Error(
            "Unexpected server response."
          );
        }


        if (!apiResponse.ok) {
          throw new Error(
            data.message ||
              "Google authentication failed."
          );
        }


        saveSession(data);

        router.push("/account");
        router.refresh();

      } catch (error) {

        console.error(
          "Google signup error:",
          error
        );

        setError(
          error.message ||
            "Google authentication failed."
        );

      } finally {
        setGoogleLoading(false);
      }
    };


  // ========================================
  // INITIALISE GOOGLE BUTTON
  // ========================================

  const initialiseGoogleButton = () => {

    if (
      typeof window === "undefined" ||
      !window.google ||
      !GOOGLE_CLIENT_ID ||
      !googleButtonRef.current
    ) {
      return false;
    }


    googleButtonRef.current.innerHTML =
      "";


    window.google.accounts.id.initialize({
      client_id:
        GOOGLE_CLIENT_ID,

      callback:
        handleGoogleCredential,

      auto_select: false,

      cancel_on_tap_outside:
        true,
    });


    window.google.accounts.id.renderButton(
      googleButtonRef.current,
      {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
        width: 400,
      }
    );


    setGoogleReady(true);

    return true;
  };


  // ========================================
  // HANDLE DIRECT URL + CLIENT NAVIGATION
  // ========================================

  useEffect(() => {

    // If Google script is already loaded
    // from another page, render immediately.

    if (window.google) {
      initialiseGoogleButton();

      return;
    }


    // Otherwise wait until Google script loads.

    const interval =
      setInterval(() => {

        if (window.google) {
          initialiseGoogleButton();

          clearInterval(interval);
        }

      }, 100);


    // Stop checking after 10 seconds.

    const timeout =
      setTimeout(() => {
        clearInterval(interval);
      }, 10000);


    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };

  }, []);


  return (
    <>

      {/* ========================================
          GOOGLE SCRIPT
      ======================================== */}

      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => {
          initialiseGoogleButton();
        }}
      />


      <div className="w-full max-w-[520px]">

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 sm:p-9">


          {/* =====================================
              HEADER
          ===================================== */}

          <div className="text-center">

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D3A72F]">
              Next Move Estates London
            </p>


            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#082D52] sm:text-4xl">
              Create your account
            </h1>


            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Create an account to make
              managing your property
              journey easier.
            </p>

          </div>


          {/* =====================================
              GOOGLE
          ===================================== */}

          <div className="mt-8">

            {!GOOGLE_CLIENT_ID ? (

              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                Google Sign-In has not
                been configured.
              </div>

            ) : (

              <div className="relative flex min-h-[44px] items-center justify-center">

                <div
                  ref={googleButtonRef}
                  className={
                    googleLoading
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />


                {!googleReady &&
                  !googleLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin text-[#082D52]" />
                    </div>
                  )}


                {googleLoading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-md bg-white/80">

                    <Loader2 className="h-5 w-5 animate-spin text-[#082D52]" />

                  </div>
                )}

              </div>

            )}

          </div>


          {/* =====================================
              DIVIDER
          ===================================== */}

          <div className="my-7 flex items-center gap-4">

            <div className="h-px flex-1 bg-slate-200" />


            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Or
            </span>


            <div className="h-px flex-1 bg-slate-200" />

          </div>


          {/* =====================================
              ERROR
          ===================================== */}

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
              {error}
            </div>
          )}


          {/* =====================================
              FORM
          ===================================== */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >


            {/* =====================================
                NAME
            ===================================== */}

            <div>

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#082D52]"
              >
                Full Name
              </label>


              <div className="relative">

                <User
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />


                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#D3A72F] focus:ring-4 focus:ring-[#D3A72F]/10"
                  required
                />

              </div>

            </div>


            {/* =====================================
                EMAIL
            ===================================== */}

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#082D52]"
              >
                Email Address
              </label>


              <div className="relative">

                <Mail
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />


                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#D3A72F] focus:ring-4 focus:ring-[#D3A72F]/10"
                  required
                />

              </div>

            </div>


            {/* =====================================
                PHONE
            ===================================== */}

            <div>

              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-[#082D52]"
              >
                Phone Number

                <span className="ml-1 font-normal text-slate-400">
                  (Optional)
                </span>

              </label>


              <div className="relative">

                <Phone
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />


                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  placeholder="07500 123456"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#D3A72F] focus:ring-4 focus:ring-[#D3A72F]/10"
                />

              </div>

            </div>


            {/* =====================================
                PASSWORD
            ===================================== */}

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#082D52]"
              >
                Password
              </label>


              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />


                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    formData.password
                  }
                  onChange={handleChange}
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  minLength={8}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#D3A72F] focus:ring-4 focus:ring-[#D3A72F]/10"
                  required
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (current) =>
                        !current
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
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}

                </button>

              </div>

            </div>


            {/* =====================================
                CONFIRM PASSWORD
            ===================================== */}

            <div>

              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-[#082D52]"
              >
                Confirm Password
              </label>


              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />


                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  autoComplete="new-password"
                  placeholder="Enter password again"
                  minLength={8}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#D3A72F] focus:ring-4 focus:ring-[#D3A72F]/10"
                  required
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (current) =>
                        !current
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
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}

                </button>

              </div>

            </div>


            {/* =====================================
                TERMS
            ===================================== */}

            <p className="text-xs leading-5 text-slate-500">

              By creating an account,
              you agree to our{" "}

              <Link
                href="/terms"
                className="font-semibold text-[#082D52] hover:text-[#D3A72F]"
              >
                Terms & Conditions
              </Link>

              {" "}and acknowledge our{" "}

              <Link
                href="/privacy"
                className="font-semibold text-[#082D52] hover:text-[#D3A72F]"
              >
                Privacy Policy
              </Link>

              .

            </p>


            {/* =====================================
                SUBMIT
            ===================================== */}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D3A72F] px-5 text-sm font-bold text-[#082D52] transition hover:bg-[#c69a24] disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Creating account...
                </>
              ) : (
                "Create Account"
              )}

            </button>

          </form>


          {/* =====================================
              SIGN IN
          ===================================== */}

          <div className="mt-7 border-t border-slate-100 pt-6 text-center">

            <p className="text-sm text-slate-500">

              Already have an account?{" "}

              <Link
                href="/sign-in"
                className="font-bold text-[#082D52] transition hover:text-[#D3A72F]"
              >
                Sign In
              </Link>

            </p>

          </div>

        </div>

      </div>

    </>
  );
}