"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Loader2,
  MapPin,
  MessageSquareText,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export default function ViewingRequestsPage() {
  const router = useRouter();

  const [viewings, setViewings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ========================================
  // LOAD VIEWING REQUESTS
  // ========================================

  useEffect(() => {
    const loadViewings = async () => {
      const token =
        localStorage.getItem(
          "customer_token"
        );

      if (!token) {
        router.replace(
          "/sign-in?redirect=/account/viewings"
        );

        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/api/enquiries/my-viewings`,
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
            "/sign-in?redirect=/account/viewings"
          );

          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message ||
            "Failed to load viewing requests."
          );
        }

        setViewings(
          data.viewings || []
        );

      } catch (error) {
        console.error(
          "Viewing requests load error:",
          error
        );

        setError(
          error.message ||
          "We could not load your viewing requests."
        );

      } finally {
        setLoading(false);
      }
    };

    loadViewings();

  }, [router]);


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F6F8FA]">

        <div className="text-center">

          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#D3A72F]" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading your viewing requests...
          </p>

        </div>

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-[#F6F8FA]">

      {/* ========================================
          HEADER
      ======================================== */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">

          <div>

            <Link
              href="/account"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#082D52]"
            >
              <ArrowLeft size={17} />
              Back to account
            </Link>

            <h1 className="mt-3 text-2xl font-semibold text-[#082D52] sm:text-3xl">
              Viewing Requests
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Review your property viewing requests and preferred dates.
            </p>

          </div>

        </div>

      </header>


      {/* ========================================
          CONTENT
      ======================================== */}

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">


        {/* ERROR */}

        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        )}


        {/* EMPTY */}

        {!error &&
          viewings.length === 0 && (

            <div className="rounded-[24px] border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">

              <CalendarDays
                size={42}
                className="mx-auto text-[#D3A72F]"
              />

              <h2 className="mt-5 text-xl font-semibold text-[#082D52]">
                No viewing requests yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                When you request a viewing for a property, it will appear here.
              </p>

              <Link
                href="/buy"
                className="mt-6 inline-flex rounded-xl bg-[#082D52] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0b3b6a]"
              >
                Browse properties
              </Link>

            </div>

          )}


        {/* VIEWINGS LIST */}

        {!error &&
          viewings.length > 0 && (

            <div className="space-y-6">

              <div className="flex items-center justify-between">

                <p className="text-sm font-semibold text-slate-500">

                  {viewings.length} viewing request
                  {viewings.length !== 1
                    ? "s"
                    : ""}

                </p>

              </div>


              {viewings.map(
                (viewing) => {

                  const preferredDate =
                    viewing.preferred_date
                      ? new Date(
                          `${viewing.preferred_date}T00:00:00`
                        ).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "Not specified";


                  const submittedDate =
                    viewing.created_at
                      ? new Date(
                          viewing.created_at
                        ).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "Not available";


                  return (

                    <article
                      key={viewing.id}
                      className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm"
                    >

                      <div className="grid md:grid-cols-[260px_1fr]">


                        {/* PROPERTY IMAGE */}

                        <div className="h-56 bg-slate-100 md:h-full">

                          {viewing.property_image ? (

                            <img
                              src={
                                viewing.property_image
                              }
                              alt={
                                viewing.property_title ||
                                "Property"
                              }
                              className="h-full w-full object-cover"
                            />

                          ) : (

                            <div className="flex h-full min-h-[220px] items-center justify-center text-sm text-slate-400">
                              Property image
                            </div>

                          )}

                        </div>


                        {/* DETAILS */}

                        <div className="p-6 sm:p-7">


                          {/* TOP */}

                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                            <div>

                              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D3A72F]">
                                Viewing request
                              </p>

                              <h2 className="mt-2 text-xl font-semibold text-[#082D52] sm:text-2xl">
                                {viewing.property_title ||
                                  "Property"}
                              </h2>


                              {(viewing.property_address ||
                                viewing.property_postcode) && (

                                <div className="mt-3 flex items-start gap-2 text-sm text-slate-500">

                                  <MapPin
                                    size={17}
                                    className="mt-0.5 shrink-0 text-[#D3A72F]"
                                  />

                                  <span>

                                    {viewing.property_address}

                                    {viewing.property_postcode &&
                                      `, ${viewing.property_postcode}`}

                                  </span>

                                </div>

                              )}

                            </div>


                            <StatusBadge
                              status={
                                viewing.status
                              }
                            />

                          </div>


                          {/* DATES */}

                          <div className="mt-6 grid gap-4 sm:grid-cols-2">

                            <InfoBox
                              icon={
                                CalendarDays
                              }
                              label="Preferred viewing"
                              value={
                                preferredDate
                              }
                            />

                            <InfoBox
                              icon={
                                Clock3
                              }
                              label="Request submitted"
                              value={
                                submittedDate
                              }
                            />

                          </div>


                          {/* MESSAGE */}

                          {viewing.message && (

                            <div className="mt-5 rounded-xl bg-[#F7FAFC] p-4">

                              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">

                                <MessageSquareText
                                  size={15}
                                />

                                Message

                              </div>

                              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                                {viewing.message}
                              </p>

                            </div>

                          )}


                          {/* PROPERTY LINK */}

                          {viewing.property_slug && (

                            <div className="mt-6">

                              <Link
                                href={`/properties/${viewing.property_slug}`}
                                className="inline-flex rounded-xl bg-[#082D52] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0b3b6a]"
                              >
                                View property →
                              </Link>

                            </div>

                          )}


                        </div>

                      </div>

                    </article>

                  );
                }
              )}

            </div>

          )}

      </section>

    </main>
  );
}


// ========================================
// INFO BOX
// ========================================

function InfoBox({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-[#F7FAFC] p-4">

      <Icon
        size={19}
        className="text-[#D3A72F]"
      />

      <p className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-[#082D52]">
        {value}
      </p>

    </div>
  );
}


// ========================================
// STATUS BADGE
// ========================================

function StatusBadge({
  status,
}) {

  const styles = {
    new:
      "bg-blue-50 text-blue-700",
    contacted:
      "bg-amber-50 text-amber-700",
    closed:
      "bg-green-50 text-green-700",
    archived:
      "bg-slate-100 text-slate-600",
  };


  const labels = {
    new:
      "New",
    contacted:
      "Contacted",
    closed:
      "Closed",
    archived:
      "Archived",
  };


  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-bold ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {labels[status] ||
        status ||
        "New"}
    </span>
  );
}