"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

const statusOptions = [
  "new",
  "contacted",
  "completed",
  "archived",
];

export default function AdminValuationsPage() {
  const router = useRouter();

  const [valuations, setValuations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [updatingId, setUpdatingId] =
    useState(null);


const [deletingId, setDeletingId] =
  useState(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";


  // ========================================
  // LOAD VALUATIONS
  // ========================================

  useEffect(() => {
    loadValuations();
  }, []);


  async function loadValuations() {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem(
          "admin_token"
        );

      if (!token) {
        router.replace(
          "/admin/login"
        );

        return;
      }

      const response =
        await fetch(
          `${API_URL}/api/valuations`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        if (
          response.status === 401 ||
          response.status === 403
        ) {
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

        throw new Error(
          data.message ||
            "Failed to load valuation requests."
        );
      }

      setValuations(
        data.valuations || []
      );

    } catch (error) {
      console.error(
        "Load valuations error:",
        error
      );

      setError(
        error.message ||
          "Failed to load valuation requests."
      );

    } finally {
      setLoading(false);
    }
  }


  // ========================================
  // UPDATE STATUS
  // ========================================

  async function updateStatus(
    id,
    status
  ) {
    try {
      setUpdatingId(id);

      const token =
        localStorage.getItem(
          "admin_token"
        );

      if (!token) {
        router.replace(
          "/admin/login"
        );

        return;
      }

      const response =
        await fetch(
          `${API_URL}/api/valuations/${id}/status`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              status,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update valuation status."
        );
      }

      setValuations((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );

    } catch (error) {
      console.error(
        "Update valuation status error:",
        error
      );

      alert(
        error.message ||
          "Failed to update valuation status."
      );

    } finally {
      setUpdatingId(null);
    }
  }

  // ========================================
// DELETE VALUATION
// ========================================

async function deleteValuation(id) {
  const confirmed =
    window.confirm(
      "Are you sure you want to permanently delete this archived valuation request?"
    );

  if (!confirmed) {
    return;
  }

  try {
    setDeletingId(id);

    const token =
      localStorage.getItem(
        "admin_token"
      );

    if (!token) {
      router.replace(
        "/admin/login"
      );

      return;
    }

    const response =
      await fetch(
        `${API_URL}/api/valuations/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to delete valuation request."
      );
    }

    setValuations((current) =>
      current.filter(
        (item) =>
          item.id !== id
      )
    );

  } catch (error) {
    console.error(
      "Delete valuation error:",
      error
    );

    alert(
      error.message ||
        "Failed to delete valuation request."
    );

  } finally {
    setDeletingId(null);
  }
}

  // ========================================
  // SEARCH + FILTER
  // ========================================

  const filteredValuations =
    useMemo(() => {
      return valuations.filter(
        (item) => {
          const matchesStatus =
            statusFilter === "all" ||
            item.status ===
              statusFilter;

          const term =
            search
              .trim()
              .toLowerCase();

          const matchesSearch =
            !term ||

            item.name
              ?.toLowerCase()
              .includes(term) ||

            item.email
              ?.toLowerCase()
              .includes(term) ||

            item.phone
              ?.toLowerCase()
              .includes(term) ||

            item.property_address
              ?.toLowerCase()
              .includes(term) ||

            item.postcode
              ?.toLowerCase()
              .includes(term);

          return (
            matchesStatus &&
            matchesSearch
          );
        }
      );
    }, [
      valuations,
      search,
      statusFilter,
    ]);


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">

          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-[#082D52]" />

          <p className="mt-4 text-sm text-gray-500">
            Loading valuation requests...
          </p>

        </div>
      </div>
    );
  }


  return (
    <div className="p-6 md:p-8 lg:p-10">

      {/* ========================================
          HEADER
      ======================================== */}

      <div>

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D3A72F]">
          Property Owners
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-[#082D52]">
          Valuation Requests
        </h1>

        <p className="mt-2 text-gray-500">
          Manage property valuation enquiries
          from sellers and landlords.
        </p>

      </div>


      {/* ========================================
          FILTERS
      ======================================== */}

      <div className="mt-8 rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-sm">

        <div className="grid gap-4 md:grid-cols-[1fr_220px]">

          {/* SEARCH */}

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search name, email, address or postcode..."
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
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


          {/* STATUS FILTER */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              text-sm
              text-[#082D52]
              outline-none
              transition
              focus:border-[#082D52]
              focus:ring-2
              focus:ring-[#082D52]/10
            "
          >
            <option value="all">
              All Valuations
            </option>

            <option value="new">
              New
            </option>

            <option value="contacted">
              Contacted
            </option>

            <option value="completed">
              Completed
            </option>

            <option value="archived">
              Archived
            </option>

          </select>

        </div>

      </div>


      {/* ========================================
          ERROR
      ======================================== */}

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}


      {/* ========================================
          RESULT COUNT
      ======================================== */}

      <div className="mt-6">

        <p className="text-sm text-gray-500">

          {filteredValuations.length}{" "}

          {filteredValuations.length === 1
            ? "valuation"
            : "valuations"}

        </p>

      </div>


      {/* ========================================
          EMPTY STATE
      ======================================== */}

      {filteredValuations.length === 0 ? (

        <div className="mt-4 flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-[#DCE8F0] bg-white px-5 text-center shadow-sm">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF5FA] text-2xl text-[#082D52]">
            🏠
          </div>

          <h2 className="mt-4 text-lg font-semibold text-[#082D52]">
            No valuation requests found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Property valuation requests
            will appear here.
          </p>

        </div>

      ) : (

        // ========================================
        // VALUATION CARDS
        // ========================================

        <div className="mt-4 space-y-4">

          {filteredValuations.map(
            (item) => (

              <ValuationCard
                key={item.id}
                item={item}

                updating={
                  updatingId === item.id
                }

                deleting={
                  deletingId === item.id
                }

                onStatusChange={
                  updateStatus
                }

                onDelete={
                  deleteValuation
                }
              />

            )
          )}

        </div>

      )}

    </div>
  );
}


// ========================================
// VALUATION CARD
// ========================================

function ValuationCard({
  item,
  updating,
  deleting,
  onStatusChange,
  onDelete,
}) {

  const valuationLabel =
    item.valuation_type === "sell"
      ? "Sales Valuation"
      : "Rental Valuation";

  return (
    <article className="rounded-2xl border border-[#DCE8F0] bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">


        {/* ========================================
            LEFT SIDE
        ======================================== */}

        <div className="min-w-0 flex-1">


          {/* NAME + STATUS */}

          <div className="flex flex-wrap items-center gap-3">

            <h2 className="text-lg font-semibold text-[#082D52]">
              {item.name}
            </h2>

            <StatusBadge
              status={item.status}
            />

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#082D52]">
              {valuationLabel}
            </span>

          </div>


          {/* CONTACT DETAILS */}

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500">

            <a
              href={`mailto:${item.email}`}
              className="transition hover:text-[#082D52]"
            >
              <strong>Email:</strong>{" "}
              {item.email}
            </a>


            {item.phone && (

              <a
                href={`tel:${item.phone}`}
                className="transition hover:text-[#082D52]"
              >
                <strong>Phone:</strong>{" "}
                {item.phone}
              </a>

            )}

          </div>


          {/* ========================================
              PROPERTY
          ======================================== */}

          <div className="mt-5 rounded-xl bg-[#F7FAFC] p-5">

            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Property
            </p>

            <p className="mt-2 font-semibold text-[#082D52]">
              {item.property_address}
            </p>


            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">

              {item.postcode && (
                <span>
                  Postcode:{" "}
                  {item.postcode}
                </span>
              )}


              {item.property_type && (
                <span>
                  Type:{" "}
                  {item.property_type}
                </span>
              )}


              {item.bedrooms !== null &&
                item.bedrooms !==
                  undefined && (

                  <span>
                    Bedrooms:{" "}

                    {item.bedrooms === 0
                      ? "Studio"
                      : item.bedrooms}
                  </span>

                )}

            </div>

          </div>


          {/* ========================================
              MESSAGE
          ======================================== */}

          {item.message && (

            <div className="mt-5">

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Message
              </p>

              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-gray-600">
                {item.message}
              </p>

            </div>

          )}


          {/* RECEIVED TIME */}

          <p className="mt-5 text-xs text-gray-400">

            Received:{" "}

            {formatDate(
              item.created_at
            )}

          </p>

        </div>


        {/* ========================================
            RIGHT SIDE
        ======================================== */}

        <div className="w-full shrink-0 xl:w-[240px]">


          {/* STATUS */}

          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">
            Valuation Status
          </label>

          <select
            value={item.status}
            disabled={updating}
            onChange={(e) =>
              onStatusChange(
                item.id,
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              text-sm
              font-medium
              text-[#082D52]
              outline-none
              transition
              focus:border-[#082D52]
              focus:ring-2
              focus:ring-[#082D52]/10
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            {statusOptions.map(
              (status) => (

                <option
                  key={status}
                  value={status}
                >
                  {status
                    .charAt(0)
                    .toUpperCase() +
                    status.slice(1)}
                </option>

              )
            )}

          </select>


          {updating && (

            <p className="mt-3 text-xs text-gray-500">
              Updating...
            </p>

          )}


          {/* REQUEST TYPE */}

          <div className="mt-4 rounded-xl border border-gray-200 p-4">

            <p className="text-sm font-semibold text-[#082D52]">
              Request Type
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {valuationLabel}
            </p>

          </div>
            {/* DELETE ARCHIVED VALUATION */}

            {item.status === "archived" && (
              <button
                type="button"
                disabled={deleting}
                onClick={() =>
                  onDelete(item.id)
                }
                className="
                  mt-4
                  w-full
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-red-700
                  transition
                  hover:bg-red-100
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {deleting
                  ? "Deleting..."
                  : "Delete Valuation"}
              </button>
            )}
        </div>

      </div>

    </article>
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
      "bg-amber-50 text-amber-700",

    contacted:
      "bg-blue-50 text-blue-700",

    completed:
      "bg-green-50 text-green-700",

    archived:
      "bg-gray-100 text-gray-600",
  };


  const labels = {
    new: "New",
    contacted: "Contacted",
    completed: "Completed",
    archived: "Archived",
  };


  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold

        ${
          styles[status] ||
          "bg-gray-100 text-gray-600"
        }
      `}
    >
      {labels[status] || status}
    </span>
  );
}


// ========================================
// FORMAT DATE
// ========================================

function formatDate(date) {
  if (!date) {
    return "Unknown";
  }

  try {

    const value =
      date.includes("T")
        ? date
        : date.replace(
            " ",
            "T"
          );


    const parsed =
      new Date(
        value.endsWith("Z")
          ? value
          : `${value}Z`
      );


    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
      return date;
    }


    return parsed.toLocaleString(
      "en-GB",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );

  } catch {
    return date;
  }
}