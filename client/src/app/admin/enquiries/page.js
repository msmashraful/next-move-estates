"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  MessageSquareText,
  LoaderCircle,
  Search,
  Mail,
  Phone,
  CalendarDays,
  ExternalLink,
  AlertCircle,
  Archive,
  Trash2,
} from "lucide-react";


export default function AdminEnquiriesPage() {
  const router = useRouter();

  const [enquiries, setEnquiries] =
    useState([]);

  const [filtered, setFiltered] =
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


  // ========================================
  // LOAD ENQUIRIES
  // ========================================

  useEffect(() => {
    loadEnquiries();
  }, []);


  // ========================================
  // SEARCH + FILTER
  // ========================================

  useEffect(() => {
    let results = [...enquiries];

    if (search.trim()) {
      const keyword =
        search.toLowerCase();

      results = results.filter(
        (item) =>
          item.name
            ?.toLowerCase()
            .includes(keyword) ||

          item.email
            ?.toLowerCase()
            .includes(keyword) ||

          item.phone
            ?.toLowerCase()
            .includes(keyword) ||

          item.property_title
            ?.toLowerCase()
            .includes(keyword) ||

          item.property_address
            ?.toLowerCase()
            .includes(keyword)
      );
    }


    if (statusFilter !== "all") {
      results = results.filter(
        (item) =>
          item.status === statusFilter
      );
    }


    setFiltered(results);

  }, [
    search,
    statusFilter,
    enquiries,
  ]);


  // ========================================
  // GET ALL ENQUIRIES
  // ========================================

  async function loadEnquiries() {
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

      const API_URL =
        process.env
          .NEXT_PUBLIC_API_URL ||
        "http://localhost:5000";


      const response =
        await fetch(
          `${API_URL}/api/enquiries`,
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
            "Failed to load enquiries"
        );
      }


      const enquiryList =
        data.enquiries || [];


      setEnquiries(
        enquiryList
      );

      setFiltered(
        enquiryList
      );

    } catch (error) {

      console.error(
        "Load enquiries error:",
        error
      );


      setError(
        error.message ||
          "Failed to load enquiries"
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


      const API_URL =
        process.env
          .NEXT_PUBLIC_API_URL ||
        "http://localhost:5000";


      const response =
        await fetch(
          `${API_URL}/api/enquiries/${id}/status`,
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
            "Failed to update status"
        );
      }


      setEnquiries((current) =>
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
        "Update status error:",
        error
      );


      alert(
        error.message ||
          "Failed to update enquiry"
      );

    } finally {

      setUpdatingId(null);

    }
  }


  // ========================================
  // ARCHIVE ENQUIRY
  // ========================================

  async function archiveEnquiry(id) {
    const confirmed =
      window.confirm(
        "Are you sure you want to archive this enquiry?"
      );


    if (!confirmed) {
      return;
    }


    await updateStatus(
      id,
      "archived"
    );
  }


  // ========================================
  // DELETE PERMANENTLY
  // ========================================

  async function deleteEnquiry(
    enquiry
  ) {
    const confirmed =
      window.confirm(
        `Permanently delete enquiry from "${enquiry.name}"?\n\nThis action cannot be undone.`
      );


    if (!confirmed) {
      return;
    }


    try {
      setDeletingId(
        enquiry.id
      );


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


      const API_URL =
        process.env
          .NEXT_PUBLIC_API_URL ||
        "http://localhost:5000";


      const response =
        await fetch(
          `${API_URL}/api/enquiries/${enquiry.id}`,
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
            "Failed to delete enquiry"
        );
      }


      setEnquiries((current) =>
        current.filter(
          (item) =>
            item.id !==
            enquiry.id
        )
      );

    } catch (error) {

      console.error(
        "Delete enquiry error:",
        error
      );


      alert(
        error.message ||
          "Failed to delete enquiry"
      );

    } finally {

      setDeletingId(null);

    }
  }


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">

        <div className="text-center">

          <LoaderCircle
            size={34}
            className="mx-auto animate-spin text-[#082D52]"
          />

          <p className="mt-3 text-sm text-gray-500">
            Loading enquiries...
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
          Customer Enquiries
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-[#082D52]">
          Enquiries
        </h1>

        <p className="mt-2 text-gray-500">
          Manage viewing requests and
          property enquiries.
        </p>

      </div>


      {/* ========================================
          FILTERS
      ======================================== */}

      <div className="mt-8 rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-sm">

        <div className="grid gap-4 md:grid-cols-[1fr_220px]">

          {/* SEARCH */}

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />


            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search customer, property or location..."
              className="
                w-full
                rounded-xl
                border
                border-gray-300
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
              All Enquiries
            </option>

            <option value="new">
              New
            </option>

            <option value="contacted">
              Contacted
            </option>

            <option value="closed">
              Closed
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
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

          <AlertCircle size={18} />

          {error}

        </div>
      )}


      {/* ========================================
          RESULT COUNT
      ======================================== */}

      <div className="mt-6">

        <p className="text-sm text-gray-500">
          {filtered.length}{" "}
          {filtered.length === 1
            ? "enquiry"
            : "enquiries"}
        </p>

      </div>


      {/* ========================================
          EMPTY STATE
      ======================================== */}

      {filtered.length === 0 ? (

        <div className="mt-4 flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-[#DCE8F0] bg-white px-5 text-center shadow-sm">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF5FA] text-[#082D52]">

            <MessageSquareText
              size={25}
            />

          </div>


          <h2 className="mt-4 text-lg font-semibold text-[#082D52]">
            No enquiries found
          </h2>


          <p className="mt-2 text-sm text-gray-500">
            Customer enquiries will
            appear here.
          </p>

        </div>

      ) : (

        // ========================================
        // ENQUIRY CARDS
        // ========================================

        <div className="mt-4 space-y-4">

          {filtered.map(
            (enquiry) => (

              <EnquiryCard
                key={enquiry.id}
                enquiry={enquiry}

                updating={
                  updatingId ===
                  enquiry.id
                }

                deleting={
                  deletingId ===
                  enquiry.id
                }

                onStatusChange={
                  updateStatus
                }

                onArchive={() =>
                  archiveEnquiry(
                    enquiry.id
                  )
                }

                onDelete={() =>
                  deleteEnquiry(
                    enquiry
                  )
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
// ENQUIRY CARD
// ========================================

function EnquiryCard({
  enquiry,
  updating,
  deleting,
  onStatusChange,
  onArchive,
  onDelete,
}) {
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
              {enquiry.name}
            </h2>


            <StatusBadge
              status={
                enquiry.status
              }
            />

          </div>


          {/* CONTACT DETAILS */}

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500">

            {/* EMAIL */}

            <a
              href={`mailto:${enquiry.email}`}
              className="flex items-center gap-2 transition hover:text-[#082D52]"
            >
              <Mail size={16} />

              {enquiry.email}
            </a>


            {/* PHONE */}

            {enquiry.phone && (
              <a
                href={`tel:${enquiry.phone}`}
                className="flex items-center gap-2 transition hover:text-[#082D52]"
              >
                <Phone size={16} />

                {enquiry.phone}
              </a>
            )}


            {/* PREFERRED DATE */}

            {enquiry.preferred_date && (
              <div className="flex items-center gap-2">

                <CalendarDays
                  size={16}
                />

                <span>
                  Preferred:{" "}
                  {formatPreferredDate(
                    enquiry.preferred_date
                  )}
                </span>

              </div>
            )}

          </div>


          {/* ========================================
              PROPERTY
          ======================================== */}

          <div className="mt-5 rounded-xl bg-[#F7FAFC] p-4">

            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Property
            </p>


            <div className="mt-1 flex flex-wrap items-center gap-3">

              <p className="font-semibold text-[#082D52]">
                {enquiry.property_title ||
                  "Property unavailable"}
              </p>


              {enquiry.property_slug && (
                <a
                  href={`/properties/${enquiry.property_slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#B58A1E] transition hover:text-[#8E6A14]"
                >
                  View Property

                  <ExternalLink
                    size={13}
                  />
                </a>
              )}

            </div>


            {enquiry.property_address && (
              <p className="mt-1 text-sm text-gray-500">
                {enquiry.property_address}
              </p>
            )}

          </div>


          {/* ========================================
              MESSAGE
          ======================================== */}

          {enquiry.message && (
            <div className="mt-5">

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Message
              </p>


              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-gray-600">
                {enquiry.message}
              </p>

            </div>
          )}


          {/* RECEIVED TIME */}

          <p className="mt-5 text-xs text-gray-400">
            Received:{" "}
            {formatDate(
              enquiry.created_at
            )}
          </p>

        </div>


        {/* ========================================
            RIGHT SIDE
        ======================================== */}

        <div className="w-full shrink-0 xl:w-[220px]">

          {/* STATUS */}

          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">
            Enquiry Status
          </label>


          <select
            value={
              enquiry.status
            }
            disabled={
              updating ||
              deleting
            }
            onChange={(e) =>
              onStatusChange(
                enquiry.id,
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

            <option value="new">
              New
            </option>

            <option value="contacted">
              Contacted
            </option>

            <option value="closed">
              Closed
            </option>

            <option value="archived">
              Archived
            </option>

          </select>


          {/* UPDATING */}

          {updating && (
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">

              <LoaderCircle
                size={14}
                className="animate-spin"
              />

              Updating...

            </div>
          )}


          {/* ========================================
              ACTION BUTTONS
          ======================================== */}

          <div className="mt-4 space-y-2">

            {/* ARCHIVE */}

            {enquiry.status !==
              "archived" && (

              <button
                type="button"
                onClick={
                  onArchive
                }
                disabled={
                  updating ||
                  deleting
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-[#082D52]
                  transition
                  hover:bg-[#F7FAFC]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                <Archive
                  size={16}
                />

                Archive

              </button>

            )}


            {/* DELETE PERMANENTLY */}

            {enquiry.status ===
              "archived" && (

              <button
                type="button"
                onClick={
                  onDelete
                }
                disabled={
                  deleting ||
                  updating
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-red-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-red-600
                  transition
                  hover:bg-red-50
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                {deleting ? (
                  <>
                    <LoaderCircle
                      size={16}
                      className="animate-spin"
                    />

                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2
                      size={16}
                    />

                    Delete Permanently
                  </>
                )}

              </button>

            )}

          </div>

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

    closed:
      "bg-green-50 text-green-700",

    archived:
      "bg-gray-100 text-gray-600",
  };


  const labels = {
    new: "New",
    contacted: "Contacted",
    closed: "Closed",
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
      {labels[status] ||
        status}
    </span>
  );
}


// ========================================
// FORMAT RECEIVED DATE
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


// ========================================
// FORMAT PREFERRED VIEWING DATE
// ========================================

function formatPreferredDate(
  date
) {
  if (!date) {
    return "";
  }


  try {
    const parsed =
      new Date(
        `${date}T00:00:00`
      );


    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
      return date;
    }


    return parsed.toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  } catch {
    return date;
  }
}