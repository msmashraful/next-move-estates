"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import {
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Loader2,
  MapPin,
  MessageSquareText,
  Phone,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export default function MyEnquiriesPage() {
  const router =
    useRouter();

  const [enquiries, setEnquiries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ========================================
  // LOAD MY ENQUIRIES
  // ========================================

  useEffect(() => {
    const loadEnquiries =
      async () => {
        const token =
          localStorage.getItem(
            "customer_token"
          );

        if (!token) {
          router.replace(
            "/sign-in?redirect=/account/enquiries"
          );
          return;
        }

        try {
          setLoading(true);
          setError("");

          const response =
            await fetch(
              `${API_URL}/api/enquiries/my`,
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

          if (
            response.status === 401 ||
            response.status === 403
          ) {
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
              "/sign-in?redirect=/account/enquiries"
            );

            return;
          }

          if (!response.ok) {
            throw new Error(
              data.message ||
                "Unable to load enquiries."
            );
          }

          setEnquiries(
            data.enquiries || []
          );

        } catch (error) {
          console.error(
            "Load enquiries error:",
            error
          );

          setError(
            error.message ||
              "Unable to load enquiries."
          );

        } finally {
          setLoading(false);
        }
      };

    loadEnquiries();

  }, [router]);


  return (
    <main className="min-h-screen bg-[#F6F8FA]">

      {/* HEADER */}

      <section className="bg-[#082D52] px-5 py-10 text-white sm:px-8">

        <div className="mx-auto max-w-7xl">

          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
          >
            <ArrowLeft size={17} />

            Back to My Account
          </Link>

          <div className="mt-7 flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#D3A72F]">

              <MessageSquareText
                size={24}
              />

            </div>

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D3A72F]">
                My Account
              </p>

              <h1 className="mt-1 text-3xl font-semibold">
                My Enquiries
              </h1>

            </div>

          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">
            View the property enquiries and
            viewing requests you have submitted.
          </p>

        </div>

      </section>


      {/* CONTENT */}

      <section className="px-5 py-10 sm:px-8 lg:py-14">

        <div className="mx-auto max-w-7xl">


          {/* LOADING */}

          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">

              <div className="text-center">

                <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#082D52]" />

                <p className="mt-4 text-sm text-slate-500">
                  Loading your enquiries...
                </p>

              </div>

            </div>
          )}


          {/* ERROR */}

          {!loading && error && (
            <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">

              <p className="font-medium text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="mt-5 rounded-xl bg-[#082D52] px-5 py-3 text-sm font-semibold text-white"
              >
                Try Again
              </button>

            </div>
          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            enquiries.length === 0 && (

              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF5FA] text-[#082D52]">

                  <MessageSquareText
                    size={30}
                  />

                </div>

                <h2 className="mt-6 text-2xl font-semibold text-[#082D52]">
                  No enquiries yet
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                  When you submit a property
                  enquiry or viewing request,
                  it will appear here.
                </p>

                <Link
                  href="/buy"
                  className="mt-7 inline-flex rounded-xl bg-[#082D52] px-5 py-3 text-sm font-semibold text-white"
                >
                  Browse Properties
                </Link>

              </div>

            )}


          {/* LIST */}

          {!loading &&
            !error &&
            enquiries.length > 0 && (

              <div className="space-y-5">

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-sm font-medium text-[#D3A72F]">
                      Your activity
                    </p>

                    <h2 className="mt-1 text-2xl font-semibold text-[#082D52]">
                      Submitted Enquiries
                    </h2>

                  </div>

                  <p className="text-sm text-slate-500">
                    {enquiries.length}{" "}
                    {enquiries.length === 1
                      ? "enquiry"
                      : "enquiries"}
                  </p>

                </div>


                {enquiries.map(
                  (enquiry) => (
                    <EnquiryCard
                      key={
                        enquiry.id
                      }
                      enquiry={
                        enquiry
                      }
                    />
                  )
                )}

              </div>

            )}

        </div>

      </section>

    </main>
  );
}


// ========================================
// ENQUIRY CARD
// ========================================

function EnquiryCard({
  enquiry,
}) {
  const submittedDate =
    enquiry.created_at
      ? new Date(
          enquiry.created_at
        ).toLocaleDateString(
          "en-GB",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )
      : "Not available";

  const preferredDate =
    enquiry.preferred_date
      ? new Date(
          `${enquiry.preferred_date}T00:00:00`
        ).toLocaleDateString(
          "en-GB",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )
      : null;

  const status =
    enquiry.status ||
    "new";

  const statusClass =
    status === "new"
      ? "bg-blue-50 text-blue-700"
      : status === "contacted"
      ? "bg-amber-50 text-amber-700"
      : status === "closed"
      ? "bg-green-50 text-green-700"
      : "bg-slate-100 text-slate-600";

  return (
    <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">

      <div className="grid md:grid-cols-[220px_1fr]">

        {/* IMAGE */}

        <div className="bg-slate-100">

          <img
            src={
              enquiry.property_image ||
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
            }
            alt={
              enquiry.property_title ||
              "Property"
            }
            className="h-full min-h-[190px] w-full object-cover"
          />

        </div>


        {/* CONTENT */}

        <div className="p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D3A72F]">
                Property Enquiry
              </p>

              <h3 className="mt-2 text-xl font-semibold text-[#082D52]">
                {enquiry.property_title ||
                  "Property"}
              </h3>

              {enquiry.property_address && (
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                  <MapPin
                    size={15}
                  />

                  {enquiry.property_address}

                </p>
              )}

            </div>


            <span
              className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-bold capitalize ${statusClass}`}
            >
              {status}
            </span>

          </div>


          <div className="mt-5 grid gap-3 sm:grid-cols-2">

            <InfoItem
              icon={
                CalendarDays
              }
              label="Submitted"
              value={
                submittedDate
              }
            />

            <InfoItem
              icon={Clock3}
              label="Preferred Viewing"
              value={
                preferredDate ||
                "Not specified"
              }
            />

            <InfoItem
              icon={Phone}
              label="Phone"
              value={
                enquiry.phone ||
                "Not provided"
              }
            />

          </div>


          {enquiry.message && (

            <div className="mt-5 rounded-xl bg-slate-50 p-4">

              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Message
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {enquiry.message}
              </p>

            </div>

          )}


          {enquiry.property_slug && (

            <Link
              href={`/properties/${enquiry.property_slug}`}
              className="mt-5 inline-flex text-sm font-bold text-[#D3A72F] transition hover:text-[#082D52]"
            >
              View property →
            </Link>

          )}

        </div>

      </div>

    </article>
  );
}


// ========================================
// INFO ITEM
// ========================================

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-100 p-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#082D52]/5 text-[#082D52]">

        <Icon
          size={17}
        />

      </div>

      <div>

        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-slate-700">
          {value}
        </p>

      </div>

    </div>
  );
}