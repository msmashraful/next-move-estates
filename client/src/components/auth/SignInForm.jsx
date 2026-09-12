"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Link from "next/link";
import Script from "next/script";

import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
} from "lucide-react";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";


const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;


export default function SignInForm() {
  const router = useRouter();

  const googleButtonRef =
    useRef(null);


  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });


  const [
    showPassword,
    setShowPassword,
  ] = useState(false);


  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    googleReady,
    setGoogleReady,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


  const [
    success,
    setSuccess,
  ] = useState("");


  // ========================================
  // ALREADY LOGGED IN?
  // ========================================

  useEffect(() => {
    const token =
      localStorage.getItem(
        "customer_token"
      );


    if (token) {
      router.replace(
        "/account"
      );
    }

  }, [router]);


  // ========================================
  // FORM CHANGE
  // ========================================

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );


    setError("");
    setSuccess("");
  };


  // ========================================
  // SAVE LOGIN
  // ========================================

  const saveCustomerLogin = (
    token,
    user
  ) => {

    localStorage.setItem(
      "customer_token",
      token
    );


    localStorage.setItem(
      "customer_user",
      JSON.stringify(user)
    );


    window.dispatchEvent(
      new Event(
        "customer-auth-change"
      )
    );
  };


  // ========================================
  // EMAIL / PASSWORD LOGIN
  // ========================================

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError("");
      setSuccess("");


      const email =
        formData.email.trim();


      const password =
        formData.password;


      if (
        !email ||
        !password
      ) {

        setError(
          "Please enter your email and password."
        );

        return;
      }


      try {

        setLoading(true);


        const response =
          await fetch(
            `${API_URL}/api/customer-auth/login`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  email,
                  password,
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

          console.error(
            "Unexpected login response:",
            await response.text()
          );


          setError(
            "Unexpected server response."
          );

          return;
        }


        if (!response.ok) {

          setError(
            data.message ||
              "Unable to sign in."
          );

          return;
        }


        saveCustomerLogin(
          data.token,
          data.user
        );


        setSuccess(
          "Signed in successfully."
        );


        router.push(
          "/account"
        );


        router.refresh();


      } catch (error) {

        console.error(
          "Sign in request error:",
          error
        );


        setError(
          "Unable to connect to the server. Please try again."
        );


      } finally {

        setLoading(false);
      }
    };


  // ========================================
  // GOOGLE LOGIN
  // ========================================

  const handleGoogleCredential =
    async (response) => {

      if (
        !response?.credential
      ) {

        setError(
          "Google Sign-In failed."
        );

        return;
      }


      try {

        setError("");
        setSuccess("");
        setLoading(true);


        const apiResponse =
          await fetch(
            `${API_URL}/api/customer-auth/google`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
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

          console.error(
            "Unexpected Google response:",
            await apiResponse.text()
          );


          setError(
            "Unexpected server response."
          );

          return;
        }


        if (
          !apiResponse.ok
        ) {

          setError(
            data.message ||
              "Google Sign-In failed."
          );

          return;
        }


        saveCustomerLogin(
          data.token,
          data.user
        );


        setSuccess(
          "Signed in successfully."
        );


        router.push(
          "/account"
        );


        router.refresh();


      } catch (error) {

        console.error(
          "Google login request error:",
          error
        );


        setError(
          "Unable to connect to Google Sign-In. Please try again."
        );


      } finally {

        setLoading(false);
      }
    };


  // ========================================
  // INITIALISE GOOGLE BUTTON
  // ========================================

  useEffect(() => {

    if (
      !googleReady ||
      !GOOGLE_CLIENT_ID ||
      !window.google ||
      !googleButtonRef.current
    ) {
      return;
    }


    window.google.accounts.id.initialize({
      client_id:
        GOOGLE_CLIENT_ID,

      callback:
        handleGoogleCredential,

      auto_select:
        false,

      cancel_on_tap_outside:
        true,
    });


    googleButtonRef.current.innerHTML =
      "";


    window.google.accounts.id.renderButton(
      googleButtonRef.current,
      {
        theme:
          "outline",

        size:
          "large",

        type:
          "standard",

        shape:
          "rectangular",

        text:
          "continue_with",

        width:
          400,
      }
    );

  }, [googleReady]);


  return (
    <>

      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() =>
          setGoogleReady(true)
        }
      />


      <div className="w-full">


        {/* GOOGLE */}

        <div className="flex w-full justify-center overflow-hidden">

          <div
            ref={googleButtonRef}
            className="w-full"
          />

        </div>


        {/* DIVIDER */}

        <div className="my-6 flex items-center gap-4">

          <div className="h-px flex-1 bg-slate-200" />


          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Or
          </span>


          <div className="h-px flex-1 bg-slate-200" />

        </div>


        {/* ERROR */}

        {error && (

          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

            {error}

          </div>

        )}


        {/* SUCCESS */}

        {success && (

          <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">

            {success}

          </div>

        )}


        {/* FORM */}

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >


          {/* EMAIL */}

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
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />


              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#D3A72F] focus:ring-2 focus:ring-[#D3A72F]/10"
              />

            </div>

          </div>


          {/* PASSWORD */}

          <div>

            <div className="mb-2 flex items-center justify-between">

              <label
                htmlFor="password"
                className="text-sm font-semibold text-[#082D52]"
              >
                Password
              </label>


              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-[#D3A72F] transition hover:text-[#082D52]"
              >
                Forgot password?
              </Link>

            </div>


            <div className="relative">

              <LockKeyhole
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />


              <input
                id="password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                autoComplete="current-password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#D3A72F] focus:ring-2 focus:ring-[#D3A72F]/10"
              />


              <button
                type="button"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                onClick={() =>
                  setShowPassword(
                    (previous) =>
                      !previous
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#082D52]"
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


          {/* SUBMIT */}

          <button
            type="submit"
            disabled={
              loading
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D3A72F] px-5 py-3.5 text-sm font-bold text-[#082D52] transition hover:bg-[#c69a26] disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading ? (
              <>

                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Signing in...

              </>
            ) : (

              "Sign In"

            )}

          </button>

        </form>


        {/* SIGN UP */}

        <p className="mt-7 text-center text-sm text-slate-500">

          Don&apos;t have an account?{" "}

          <Link
            href="/sign-up"
            className="font-bold text-[#082D52] transition hover:text-[#D3A72F]"
          >
            Create an account
          </Link>

        </p>

      </div>

    </>
  );
}