"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);

  const accountRef = useRef(null);

  // ========================================
  // LOAD CUSTOMER
  // ========================================

  useEffect(() => {
    const loadCustomer = () => {
      const token = localStorage.getItem("customer_token");
      const storedUser = localStorage.getItem("customer_user");

      if (token && storedUser) {
        try {
          setCustomer(JSON.parse(storedUser));
        } catch (error) {
          console.error("Customer parse error:", error);

          localStorage.removeItem("customer_token");
          localStorage.removeItem("customer_user");

          setCustomer(null);
        }
      } else {
        setCustomer(null);
      }
    };

    loadCustomer();

    window.addEventListener(
      "customer-auth-change",
      loadCustomer
    );

    window.addEventListener(
      "storage",
      loadCustomer
    );

    return () => {
      window.removeEventListener(
        "customer-auth-change",
        loadCustomer
      );

      window.removeEventListener(
        "storage",
        loadCustomer
      );
    };
  }, []);

  // ========================================
  // CLOSE DROPDOWN OUTSIDE CLICK
  // ========================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setAccountOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer_user");

    setCustomer(null);
    setAccountOpen(false);
    setIsOpen(false);

    window.dispatchEvent(
      new Event("customer-auth-change")
    );

    window.location.href = "/";
  };

  // ========================================
  // CUSTOMER INITIAL
  // ========================================

  const customerInitial =
    customer?.name?.trim()?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[1750px] items-center justify-between px-6 py-4 lg:px-12">

        {/* =====================================
            LOGO
        ===================================== */}

        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Next Move Estates London"
            width={310}
            height={80}
            priority
            className="h-auto w-[260px] lg:w-[310px]"
          />
        </Link>


        {/* =====================================
            DESKTOP NAVIGATION
        ===================================== */}

        <nav className="hidden items-center gap-7 text-[17px] font-medium text-[#0B2E4F] lg:flex">

          <Link
            href="/buy"
            className="transition-colors hover:text-[#E8B321]"
          >
            Buy
          </Link>

          <Link
            href="/rent"
            className="transition-colors hover:text-[#E8B321]"
          >
            Rent
          </Link>

          <Link
            href="/rooms"
            className="transition-colors hover:text-[#E8B321]"
          >
            Rooms
          </Link>

          <Link
            href="/sell"
            className="transition-colors hover:text-[#E8B321]"
          >
            Sell
          </Link>

          <Link
            href="/landlords"
            className="transition-colors hover:text-[#E8B321]"
          >
            Landlords
          </Link>

          <Link
            href="/property-management"
            className="whitespace-nowrap transition-colors hover:text-[#E8B321]"
          >
            Property Management
          </Link>

          <Link
            href="/about"
            className="transition-colors hover:text-[#E8B321]"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="transition-colors hover:text-[#E8B321]"
          >
            Contact
          </Link>

        </nav>


        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <div className="hidden items-center gap-6 lg:flex">

          {/* =====================================
              NOT LOGGED IN
          ===================================== */}

          {!customer && (
            <Link
              href="/sign-in"
              className="flex items-center gap-2 text-[17px] font-medium text-[#0B2E4F] transition-colors hover:text-[#E8B321]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>

              Sign In
            </Link>
          )}


          {/* =====================================
              LOGGED IN CUSTOMER
          ===================================== */}

          {customer && (
            <div
              ref={accountRef}
              className="relative"
            >
              <button
                type="button"
                onClick={() =>
                  setAccountOpen(
                    (previous) => !previous
                  )
                }
                className="flex items-center gap-2 text-[17px] font-medium text-[#0B2E4F] transition-colors hover:text-[#E8B321]"
              >

                {/* PROFILE IMAGE */}

                {customer.profile_image ? (
                  <img
                    src={customer.profile_image}
                    alt={customer.name || "Customer"}
                    referrerPolicy="no-referrer"
                    className="h-9 w-9 rounded-full border border-gray-200 object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B2E4F] text-sm font-bold text-[#E8B321]">
                    {customerInitial}
                  </div>
                )}

                <span className="max-w-[120px] truncate">
                  {customer.name || "My Account"}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${
                    accountOpen
                      ? "rotate-180"
                      : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>

              </button>


              {/* =====================================
                  ACCOUNT DROPDOWN
              ===================================== */}

              {accountOpen && (
                <div className="absolute right-0 top-[calc(100%+14px)] w-[260px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

                  {/* CUSTOMER INFO */}

                  <div className="border-b border-gray-100 px-5 py-4">

                    <p className="truncate text-[15px] font-semibold text-[#0B2E4F]">
                      {customer.name}
                    </p>

                    <p className="mt-1 truncate text-[13px] text-gray-500">
                      {customer.email}
                    </p>

                  </div>


                  {/* MY ACCOUNT */}

                  <Link
                    href="/account"
                    onClick={() =>
                      setAccountOpen(false)
                    }
                    className="flex items-center gap-3 px-5 py-4 text-[15px] font-medium text-[#0B2E4F] transition hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21a8 8 0 0 0-16 0" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>

                    My Account
                  </Link>


                  {/* LOGOUT */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 border-t border-gray-100 px-5 py-4 text-left text-[15px] font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line
                        x1="21"
                        x2="9"
                        y1="12"
                        y2="12"
                      />
                    </svg>

                    Logout
                  </button>

                </div>
              )}
            </div>
          )}


          {/* =====================================
              FREE VALUATION
          ===================================== */}

          <Link
            href="/valuation"
            className="whitespace-nowrap rounded-xl bg-[#E8B321] px-7 py-4 text-[17px] font-semibold text-[#0B2E4F] transition hover:bg-[#d9a619]"
          >
            Free Valuation
          </Link>

        </div>


        {/* =====================================
            MOBILE MENU BUTTON
        ===================================== */}

        <button
          type="button"
          onClick={() => {
            setIsOpen(
              (previous) => !previous
            );

            setAccountOpen(false);
          }}
          className="text-[#0B2E4F] lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <span className="text-3xl">×</span>
          ) : (
            <span className="text-3xl">☰</span>
          )}
        </button>

      </div>


      {/* =====================================
          MOBILE NAVIGATION
      ===================================== */}

      {isOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-5 lg:hidden">

          <nav className="flex flex-col gap-5 text-[17px] font-medium text-[#0B2E4F]">

            <Link
              href="/buy"
              onClick={() =>
                setIsOpen(false)
              }
            >
              Buy
            </Link>

            <Link
              href="/rent"
              onClick={() =>
                setIsOpen(false)
              }
            >
              Rent
            </Link>

            <Link
              href="/rooms"
              onClick={() =>
                setIsOpen(false)
              }
            >
              Rooms
            </Link>

            <Link
              href="/sell"
              onClick={() =>
                setIsOpen(false)
              }
            >
              Sell
            </Link>

            <Link
              href="/landlords"
              onClick={() =>
                setIsOpen(false)
              }
            >
              Landlords
            </Link>

            <Link
              href="/property-management"
              onClick={() =>
                setIsOpen(false)
              }
            >
              Property Management
            </Link>

            <Link
              href="/about"
              onClick={() =>
                setIsOpen(false)
              }
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() =>
                setIsOpen(false)
              }
            >
              Contact
            </Link>


            {/* =====================================
                MOBILE ACCOUNT SECTION
            ===================================== */}

            <div className="border-t border-gray-200 pt-5">

              {/* NOT LOGGED IN */}

              {!customer && (
                <Link
                  href="/sign-in"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21a8 8 0 0 0-16 0" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>

                  Sign In
                </Link>
              )}


              {/* LOGGED IN */}

              {customer && (
                <div>

                  <div className="flex items-center gap-3">

                    {customer.profile_image ? (
                      <img
                        src={
                          customer.profile_image
                        }
                        alt={
                          customer.name ||
                          "Customer"
                        }
                        referrerPolicy="no-referrer"
                        className="h-11 w-11 rounded-full border border-gray-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B2E4F] font-bold text-[#E8B321]">
                        {customerInitial}
                      </div>
                    )}


                    <div className="min-w-0">

                      <p className="truncate font-semibold text-[#0B2E4F]">
                        {customer.name}
                      </p>

                      <p className="mt-0.5 truncate text-[13px] font-normal text-gray-500">
                        {customer.email}
                      </p>

                    </div>

                  </div>


                  <div className="mt-4 grid grid-cols-2 gap-3">

                    {/* MY ACCOUNT */}

                    <Link
                      href="/account"
                      onClick={() =>
                        setIsOpen(false)
                      }
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#0B2E4F] px-4 py-3 text-[15px] font-semibold text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21a8 8 0 0 0-16 0" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>

                      Account
                    </Link>


                    {/* LOGOUT */}

                    <button
                      type="button"
                      onClick={
                        handleLogout
                      }
                      className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-[15px] font-semibold text-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line
                          x1="21"
                          x2="9"
                          y1="12"
                          y2="12"
                        />
                      </svg>

                      Logout
                    </button>

                  </div>

                </div>
              )}

            </div>


            {/* =====================================
                MOBILE VALUATION
            ===================================== */}

            <Link
              href="/valuation"
              onClick={() =>
                setIsOpen(false)
              }
              className="rounded-xl bg-[#E8B321] px-5 py-3 text-center font-semibold text-[#0B2E4F]"
            >
              Free Valuation
            </Link>

          </nav>

        </div>
      )}
    </header>
  );
}