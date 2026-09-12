"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  Search,
  Mail,
  Phone,
  MessageSquareText,
  CalendarDays,
  LoaderCircle,
  CircleAlert,
  Inbox,
  Trash2,
} from "lucide-react";


const statusOptions = [
  "new",
  "contacted",
  "closed",
  "archived",
];


export default function ContactEnquiriesPage() {
  const router = useRouter();


  const [enquiries, setEnquiries] =
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
    process.env
      .NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";


  // ========================================
  // LOAD CONTACT ENQUIRIES
  // ========================================

  useEffect(() => {

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


        const response =
          await fetch(
            `${API_URL}/api/contact`,
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
              "Failed to load contact enquiries."
          );
        }


        setEnquiries(
          data.enquiries || []
        );


      } catch (error) {

        console.error(
          "Contact enquiries error:",
          error
        );


        setError(
          error.message ||
            "Failed to load contact enquiries."
        );


      } finally {

        setLoading(false);

      }
    }


    loadEnquiries();

  }, [
    router,
    API_URL,
  ]);


  // ========================================
  // UPDATE STATUS
  // ========================================

  async function updateStatus(
    id,
    status
  ) {
    try {

      setUpdatingId(id);
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
          `${API_URL}/api/contact/${id}/status`,
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
            "Failed to update status."
        );
      }


      setEnquiries(
        (previous) =>
          previous.map(
            (enquiry) =>
              enquiry.id === id

                ? {
                    ...enquiry,
                    status,
                  }

                : enquiry
          )
      );


    } catch (error) {

      console.error(
        "Update contact status error:",
        error
      );


      setError(
        error.message ||
          "Failed to update enquiry."
      );


    } finally {

      setUpdatingId(null);

    }
  }


  // ========================================
  // DELETE ARCHIVED ENQUIRY
  // ========================================

  async function deleteEnquiry(id) {

    const confirmed =
      window.confirm(
        "Are you sure you want to permanently delete this archived contact enquiry?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setDeletingId(id);
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
          `${API_URL}/api/contact/${id}`,
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
            "Failed to delete contact enquiry."
        );
      }


      setEnquiries(
        (previous) =>
          previous.filter(
            (enquiry) =>
              enquiry.id !== id
          )
      );


    } catch (error) {

      console.error(
        "Delete contact enquiry error:",
        error
      );


      setError(
        error.message ||
          "Failed to delete contact enquiry."
      );


    } finally {

      setDeletingId(null);

    }
  }


  // ========================================
  // FILTER
  // ========================================

  const filteredEnquiries =
    useMemo(() => {

      const keyword =
        search
          .trim()
          .toLowerCase();


      return enquiries.filter(
        (enquiry) => {

          const matchesStatus =
            statusFilter === "all" ||
            enquiry.status ===
              statusFilter;


          const searchableText = [
            enquiry.name,
            enquiry.email,
            enquiry.phone,
            enquiry.subject,
            enquiry.message,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();


          const matchesSearch =
            !keyword ||
            searchableText.includes(
              keyword
            );


          return (
            matchesStatus &&
            matchesSearch
          );
        }
      );

    }, [
      enquiries,
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

          <LoaderCircle
            size={34}
            className="mx-auto animate-spin text-[#082D52]"
          />

          <p className="mt-3 text-sm text-gray-500">
            Loading contact enquiries...
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
          Messages
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-[#082D52]">
          Contact Enquiries
        </h1>

        <p className="mt-2 text-gray-500">
          View and manage general enquiries
          submitted through the website contact
          form.
        </p>

      </div>


      {/* ========================================
          ERROR
      ======================================== */}

      {error && (

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

          <CircleAlert
            size={19}
            className="mt-0.5 shrink-0"
          />

          <span>
            {error}
          </span>

        </div>

      )}


      {/* ========================================
          FILTERS
      ======================================== */}

      <div className="mt-8 grid gap-4 rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-sm md:grid-cols-[1fr_220px]">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"

            value={search}

            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }

            placeholder="Search name, email, phone, subject..."

            className="w-full rounded-xl border border-[#DCE8F0] bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#D3A72F] focus:ring-2 focus:ring-[#D3A72F]/15"
          />

        </div>


        <select
          value={statusFilter}

          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }

          className="rounded-xl border border-[#DCE8F0] bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#D3A72F]"
        >

          <option value="all">
            All Statuses
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


      {/* ========================================
          RESULT COUNT
      ======================================== */}

      <div className="mt-6 flex items-center justify-between">

        <p className="text-sm text-gray-500">

          Showing{" "}

          <span className="font-semibold text-[#082D52]">
            {filteredEnquiries.length}
          </span>{" "}

          {filteredEnquiries.length === 1
            ? "enquiry"
            : "enquiries"}

        </p>

      </div>


      {/* ========================================
          EMPTY STATE
      ======================================== */}

      {filteredEnquiries.length === 0 ? (

        <div className="mt-6 rounded-2xl border border-dashed border-[#DCE8F0] bg-white px-6 py-16 text-center">

          <Inbox
            size={38}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-4 text-lg font-semibold text-[#082D52]">
            No contact enquiries found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            New messages submitted through the
            contact form will appear here.
          </p>

        </div>

      ) : (

        /* ========================================
            ENQUIRY CARDS
        ======================================== */

        <div className="mt-5 space-y-5">

          {filteredEnquiries.map(
            (enquiry) => (

              <div
                key={enquiry.id}
                className="rounded-2xl border border-[#DCE8F0] bg-white p-6 shadow-sm"
              >


                {/* ========================================
                    TOP
                ======================================== */}

                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">


                  {/* LEFT */}

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-xl font-semibold text-[#082D52]">
                        {enquiry.name}
                      </h2>


                      <StatusBadge
                        status={
                          enquiry.status
                        }
                      />

                    </div>


                    {enquiry.subject && (

                      <p className="mt-2 text-sm font-medium text-[#B58A1E]">
                        {enquiry.subject}
                      </p>

                    )}

                  </div>


                  {/* ========================================
                      STATUS + DELETE
                  ======================================== */}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">


                    <div className="flex items-center gap-2">

                      <span className="text-xs font-medium text-gray-500">
                        Status
                      </span>


                      <select
                        value={
                          enquiry.status
                        }

                        disabled={
                          updatingId ===
                            enquiry.id ||
                          deletingId ===
                            enquiry.id
                        }

                        onChange={(event) =>
                          updateStatus(
                            enquiry.id,
                            event.target.value
                          )
                        }

                        className="rounded-lg border border-[#DCE8F0] bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#D3A72F] disabled:opacity-50"
                      >

                        {statusOptions.map(
                          (status) => (

                            <option
                              key={status}
                              value={status}
                            >
                              {formatStatus(
                                status
                              )}
                            </option>

                          )
                        )}

                      </select>


                      {updatingId ===
                        enquiry.id && (

                        <LoaderCircle
                          size={17}
                          className="animate-spin text-[#082D52]"
                        />

                      )}

                    </div>


                    {/* DELETE BUTTON */}

                    {enquiry.status ===
                      "archived" && (

                      <button
                        type="button"

                        disabled={
                          deletingId ===
                          enquiry.id
                        }

                        onClick={() =>
                          deleteEnquiry(
                            enquiry.id
                          )
                        }

                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          rounded-lg
                          border
                          border-red-200
                          bg-red-50
                          px-3
                          py-2
                          text-sm
                          font-semibold
                          text-red-700
                          transition
                          hover:bg-red-100
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >

                        {deletingId ===
                        enquiry.id ? (

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

                            Delete
                          </>

                        )}

                      </button>

                    )}

                  </div>

                </div>


                {/* ========================================
                    CONTACT INFORMATION
                ======================================== */}

                <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">


                  <InfoItem
                    icon={Mail}
                    label="Email"
                  >

                    <a
                      href={`mailto:${enquiry.email}`}
                      className="break-all hover:text-[#D3A72F]"
                    >
                      {enquiry.email}
                    </a>

                  </InfoItem>


                  <InfoItem
                    icon={Phone}
                    label="Phone"
                  >

                    {enquiry.phone ? (

                      <a
                        href={`tel:${enquiry.phone}`}
                        className="hover:text-[#D3A72F]"
                      >
                        {enquiry.phone}
                      </a>

                    ) : (

                      "Not provided"

                    )}

                  </InfoItem>


                  <InfoItem
                    icon={CalendarDays}
                    label="Received"
                  >

                    {formatDate(
                      enquiry.created_at
                    )}

                  </InfoItem>

                </div>


                {/* ========================================
                    MESSAGE
                ======================================== */}

                <div className="mt-6 rounded-xl bg-[#F7FAFC] p-5">

                  <div className="flex items-center gap-2">

                    <MessageSquareText
                      size={17}
                      className="text-[#D3A72F]"
                    />

                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#082D52]">
                      Message
                    </p>

                  </div>


                  <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-gray-600">
                    {enquiry.message}
                  </p>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}


// ========================================
// INFO ITEM
// ========================================

function InfoItem({
  icon: Icon,
  label,
  children,
}) {

  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#E5EDF3] p-4">

      <Icon
        size={18}
        className="mt-0.5 shrink-0 text-[#D3A72F]"
      />


      <div className="min-w-0">

        <p className="text-xs text-gray-400">
          {label}
        </p>

        <div className="mt-1 break-words text-sm font-medium text-[#082D52]">
          {children}
        </div>

      </div>

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
      "bg-blue-50 text-blue-700 border-blue-200",

    contacted:
      "bg-amber-50 text-amber-700 border-amber-200",

    closed:
      "bg-green-50 text-green-700 border-green-200",

    archived:
      "bg-gray-100 text-gray-600 border-gray-200",
  };


  return (
    <span
      className={`
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-semibold

        ${
          styles[status] ||
          styles.archived
        }
      `}
    >

      {formatStatus(status)}

    </span>
  );
}


// ========================================
// FORMAT STATUS
// ========================================

function formatStatus(status) {

  if (!status) {
    return "Unknown";
  }


  return (
    status.charAt(0).toUpperCase() +
    status.slice(1)
  );
}


// ========================================
// FORMAT DATE
// ========================================

function formatDate(date) {

  if (!date) {
    return "—";
  }


  const parsedDate =
    new Date(
      date.replace(
        " ",
        "T"
      ) + "Z"
    );


  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return date;
  }


  return new Intl.DateTimeFormat(
    "en-GB",
    {
      dateStyle: "medium",
      timeStyle: "short",

      timeZone:
        "Europe/London",
    }
  ).format(
    parsedDate
  );
}