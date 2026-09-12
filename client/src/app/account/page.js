"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Heart,
  Loader2,
  LogOut,
  Mail,
  MessageSquareText,
  Phone,
  User,
  Eye,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export default function AccountPage() {
  const router = useRouter();

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ========================================
  // LOAD CURRENT CUSTOMER
  // ========================================

  useEffect(() => {
    const loadCustomer =
      async () => {

        const token =
          localStorage.getItem(
            "customer_token"
          );

        if (!token) {
          router.replace(
            "/sign-in"
          );

          return;
        }

        try {
          const response =
            await fetch(
              `${API_URL}/api/customer-auth/me`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },

                cache: "no-store",
              }
            );

          const data =
            await response.json();

          if (!response.ok) {
            localStorage.removeItem(
              "customer_token"
            );

            localStorage.removeItem(
              "customer_user"
            );

            window.dispatchEvent(
              new Event(
                "customer-auth-change"
              )
            );

            router.replace(
              "/sign-in"
            );

            return;
          }

          setUser(
            data.user
          );

          localStorage.setItem(
            "customer_user",
            JSON.stringify(
              data.user
            )
          );

        } catch (error) {

          console.error(
            "Account load error:",
            error
          );

          setError(
            "We could not load your account. Please try again."
          );

        } finally {

          setLoading(false);

        }
      };

    loadCustomer();

  }, [router]);


  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {

    localStorage.removeItem(
      "customer_token"
    );

    localStorage.removeItem(
      "customer_user"
    );

    window.dispatchEvent(
      new Event(
        "customer-auth-change"
      )
    );

    router.replace(
      "/sign-in"
    );

    router.refresh();
  };


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F6F8FA]">

        <div className="text-center">

          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#D3A72F]" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading your account...
          </p>

        </div>

      </main>
    );
  }


  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F6F8FA] px-5">

        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">

          <h1 className="text-xl font-semibold text-[#082D52]">
            Unable to load account
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-6 rounded-xl bg-[#D3A72F] px-6 py-3 text-sm font-bold text-[#082D52]"
          >
            Try Again
          </button>

        </div>

      </main>
    );
  }


  if (!user) {
    return null;
  }


  // ========================================
  // MEMBER SINCE
  // ========================================

  const memberSince =
    user.created_at
      ? new Date(
          user.created_at
        ).toLocaleDateString(
          "en-GB",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )
      : "Not available";


  // ========================================
  // INITIAL
  // ========================================

  const initial =
    user.name
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() ||
    "U";


  return (

    <main className="min-h-screen bg-[#F6F8FA]">


      {/* =====================================
          TOP BAR
      ===================================== */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">


          {/* LOGO */}

          <Link href="/">

            <Image
              src="/logo.png"
              alt="Next Move Estates London"
              width={300}
              height={90}
              priority
              className="h-auto w-[180px] sm:w-[220px]"
            />

          </Link>


          {/* TOP ACTIONS */}

          <div className="flex items-center gap-3">


            <Link
              href="/"
              className="hidden items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#082D52] transition hover:border-[#D3A72F] sm:inline-flex"
            >

              <ArrowLeft
                size={17}
              />

              Website

            </Link>


            <button
              type="button"
              onClick={
                handleLogout
              }
              className="inline-flex items-center gap-2 rounded-xl bg-[#082D52] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b3b6a]"
            >

              <LogOut
                size={17}
              />

              Logout

            </button>


          </div>

        </div>

      </header>


      {/* =====================================
          ACCOUNT CONTENT
      ===================================== */}

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">


        {/* =====================================
            WELCOME
        ===================================== */}

        <div>

          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D3A72F]">
            My Account
          </p>


          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#082D52] sm:text-4xl">
            Welcome, {user.name}
          </h1>


          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Manage your property journey,
            account information and enquiries
            with Next Move Estates London.
          </p>

        </div>


        <div className="mt-9 grid gap-7 lg:grid-cols-[360px_1fr]">


          {/* =====================================
              PROFILE CARD
          ===================================== */}

          <section className="h-fit rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">


            {/* PROFILE HEADER */}

            <div className="flex items-center gap-4">


              {user.profile_image ? (

                <img
                  src={
                    user.profile_image
                  }
                  alt={
                    user.name
                  }
                  className="h-16 w-16 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />

              ) : (

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#082D52] text-2xl font-bold text-[#D3A72F]">

                  {initial}

                </div>

              )}


              <div className="min-w-0">

                <h2 className="truncate text-lg font-semibold text-[#082D52]">
                  {user.name}
                </h2>

                <p className="mt-1 truncate text-sm text-slate-500">
                  {user.email}
                </p>

              </div>

            </div>


            <div className="my-6 h-px bg-slate-100" />


            {/* PROFILE INFORMATION */}

            <div className="space-y-5">


              <ProfileRow
                icon={User}
                label="Full Name"
                value={
                  user.name
                }
              />


              <ProfileRow
                icon={Mail}
                label="Email"
                value={
                  user.email
                }
              />


              <ProfileRow
                icon={Phone}
                label="Phone"
                value={
                  user.phone ||
                  "Not provided"
                }
              />


              <ProfileRow
                icon={
                  CalendarDays
                }
                label="Member Since"
                value={
                  memberSince
                }
              />


            </div>

          </section>


          {/* =====================================
              ACCOUNT OPTIONS
          ===================================== */}

          <section>


            <div className="grid gap-5 sm:grid-cols-2">


              {/* SAVED PROPERTIES */}

              <AccountCard
                icon={
                  Heart
                }
                title="Saved Properties"
                description="Keep your favourite properties together so you can easily return to them."
                href="/account/saved-properties"
                linkLabel="View saved properties"
              />


              {/* MY ENQUIRIES */}

              <AccountCard
                icon={
                  MessageSquareText
                }
                title="My Enquiries"
                description="View and keep track of the property enquiries and viewing requests you have submitted."
                href="/account/enquiries"
                linkLabel="View enquiries"
              />


              {/* VIEWING REQUESTS */}

                <AccountCard
                icon={Eye}
                title="Viewing Requests"
                description="Keep track of property viewing requests and upcoming appointments."
                href="/account/viewings"
                linkLabel="View requests"
                />


              {/* BROWSE PROPERTIES */}

              <AccountCard
                icon={
                  Building2
                }
                title="Browse Properties"
                description="Explore available properties for sale, rent and room lets."
                href="/buy"
                linkLabel="Browse now"
              />


            </div>


            {/* =====================================
                QUICK LINKS
            ===================================== */}

            <div className="mt-7 rounded-[24px] bg-[#082D52] p-7 text-white sm:p-8">


              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D3A72F]">
                Your next move
              </p>


              <h2 className="mt-3 text-2xl font-semibold">
                Looking for a property?
              </h2>


              <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
                Browse our latest properties
                for sale, rent or find a room
                that suits your requirements.
              </p>


              <div className="mt-6 flex flex-wrap gap-3">


                <QuickLink
                  href="/buy"
                  label="Buy"
                />


                <QuickLink
                  href="/rent"
                  label="Rent"
                />


                <QuickLink
                  href="/rooms"
                  label="Rooms"
                />


              </div>

            </div>


          </section>


        </div>

      </div>

    </main>
  );
}


// ========================================
// PROFILE ROW
// ========================================

function ProfileRow({
  icon: Icon,
  label,
  value,
}) {

  return (

    <div className="flex items-start gap-3">


      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#082D52]/5 text-[#082D52]">

        <Icon
          size={17}
          strokeWidth={1.8}
        />

      </div>


      <div className="min-w-0">

        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-slate-700">
          {value}
        </p>

      </div>


    </div>

  );
}


// ========================================
// ACCOUNT CARD
// ========================================

function AccountCard({
  icon: Icon,
  title,
  description,
  href,
  status,
  linkLabel = "Browse now",
}) {

  const content = (

    <div className="group h-full rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#D3A72F]/60 hover:shadow-md">


      {/* ICON */}

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#082D52] text-[#D3A72F]">

        <Icon
          size={22}
          strokeWidth={1.8}
        />

      </div>


      {/* TITLE */}

      <h3 className="mt-5 text-lg font-semibold text-[#082D52]">
        {title}
      </h3>


      {/* DESCRIPTION */}

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>


      {/* STATUS */}

      {status && (

        <span className="mt-5 inline-flex rounded-full bg-[#D3A72F]/10 px-3 py-1.5 text-xs font-bold text-[#9b7413]">

          {status}

        </span>

      )}


      {/* LINK TEXT */}

      {href && (

        <span className="mt-5 inline-flex text-sm font-bold text-[#D3A72F] transition group-hover:text-[#082D52]">

          {linkLabel} →

        </span>

      )}


    </div>

  );


  // যদি href থাকে পুরো card clickable হবে

  if (href) {

    return (

      <Link
        href={href}
        className="block h-full"
      >

        {content}

      </Link>

    );

  }


  return content;
}


// ========================================
// QUICK LINK
// ========================================

function QuickLink({
  href,
  label,
}) {

  return (

    <Link
      href={href}
      className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#082D52] transition hover:bg-[#D3A72F]"
    >

      {label}

    </Link>

  );
}