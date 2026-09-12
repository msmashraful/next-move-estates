"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Building2,
  BadgePoundSterling,
  KeyRound,
  BedDouble,
  MessageSquareText,
  MessagesSquare,
  Bell,
  ClipboardList,
  CirclePlus,
  ArrowRight,
  LoaderCircle,
  Eye,
} from "lucide-react";


export default function AdminDashboardPage() {
  const router = useRouter();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ========================================
  // LOAD DASHBOARD STATS
  // ========================================

  useEffect(() => {
    async function loadStats() {
      try {
        const token =
          localStorage.getItem("admin_token");

        if (!token) {
          router.replace("/admin/login");
          return;
        }

        const API_URL =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:5000";

        const response = await fetch(
          `${API_URL}/api/admin/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },

            cache: "no-store",
          }
        );

        const data = await response.json();

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

            router.replace("/admin/login");
            return;
          }

          throw new Error(
            data.message ||
              "Failed to load dashboard."
          );
        }

        setStats(data.stats || {});
      } catch (error) {
        console.error(
          "Dashboard stats error:",
          error
        );

        setError(
          error.message ||
            "Failed to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [router]);


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">

        <div className="text-center">

          <LoaderCircle
            size={36}
            className="mx-auto animate-spin text-[#082D52]"
          />

          <p className="mt-3 text-sm text-gray-500">
            Loading dashboard...
          </p>

        </div>

      </div>
    );
  }


  // ========================================
  // PAGE
  // ========================================

  return (
    <div className="p-6 md:p-8 lg:p-10">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D3A72F]">
            Overview
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#082D52]">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Manage properties, enquiries and
            valuation requests from one place.
          </p>

        </div>


        <Link
          href="/admin/properties/new"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#D3A72F]
            px-5
            py-3
            text-sm
            font-semibold
            text-[#082D52]
            transition
            hover:bg-[#E1B93E]
          "
        >
          <CirclePlus size={18} />

          Add Property
        </Link>

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
          PROPERTY STATS
      ======================================== */}

      <section className="mt-10">

        <SectionHeading
          title="Properties"
          description="Overview of your current property listings."
        />


        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Properties"
            value={
              stats?.total_properties ?? 0
            }
            icon={Building2}
            href="/admin/properties"
          />


          <StatCard
            title="Properties For Sale"
            value={
              stats?.sale_properties ?? 0
            }
            icon={BadgePoundSterling}
            href="/admin/properties"
          />


          <StatCard
            title="Properties To Let"
            value={
              stats?.letting_properties ?? 0
            }
            icon={KeyRound}
            href="/admin/properties"
          />


          <StatCard
            title="Rooms To Let"
            value={
              stats?.room_properties ?? 0
            }
            icon={BedDouble}
            href="/admin/properties"
          />

        </div>

      </section>


      {/* ========================================
          LEADS / ENQUIRIES
      ======================================== */}

      <section className="mt-10">

        <SectionHeading
          title="Leads & Enquiries"
          description="Keep track of new customer enquiries and valuation requests."
        />


        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {/* PROPERTY ENQUIRIES */}

          <StatCard
            title="Total Property Enquiries"
            value={
              stats?.total_enquiries ?? 0
            }
            icon={MessageSquareText}
            href="/admin/enquiries"
          />


          <StatCard
            title="New Property Enquiries"
            value={
              stats?.new_enquiries ?? 0
            }
            icon={Bell}
            href="/admin/enquiries"
            highlight={
              (stats?.new_enquiries ?? 0) > 0
            }
          />


          {/* VALUATIONS */}

          <StatCard
            title="Total Valuations"
            value={
              stats?.total_valuations ?? 0
            }
            icon={ClipboardList}
            href="/admin/valuations"
          />


          <StatCard
            title="New Valuations"
            value={
              stats?.new_valuations ?? 0
            }
            icon={Bell}
            href="/admin/valuations"
            highlight={
              (stats?.new_valuations ?? 0) > 0
            }
          />


          {/* CONTACT ENQUIRIES */}

          <StatCard
            title="Total Contact Enquiries"
            value={
              stats?.total_contact_enquiries ??
              0
            }
            icon={MessagesSquare}
            href="/admin/contact-enquiries"
          />


          <StatCard
            title="New Contact Enquiries"
            value={
              stats?.new_contact_enquiries ??
              0
            }
            icon={Bell}
            href="/admin/contact-enquiries"
            highlight={
              (stats?.new_contact_enquiries ?? 0) >
              0
            }
          />

        </div>

      </section>


      {/* ========================================
          QUICK ACTIONS
      ======================================== */}

      <section className="mt-10">

        <SectionHeading
          title="Quick Actions"
          description="Frequently used admin actions."
        />


        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">

          <QuickAction
            href="/admin/properties/new"
            icon={CirclePlus}
            title="Add Property"
            description="Create a new sale, letting or room listing."
          />


          <QuickAction
            href="/admin/properties"
            icon={Building2}
            title="Manage Properties"
            description="View, edit and manage your property listings."
          />


          <QuickAction
            href="/admin/enquiries"
            icon={MessageSquareText}
            title="Property Enquiries"
            description={`${
              stats?.new_enquiries ?? 0
            } new property enquiries waiting.`}
          />


          <QuickAction
            href="/admin/valuations"
            icon={ClipboardList}
            title="Valuations"
            description={`${
              stats?.new_valuations ?? 0
            } new valuation requests waiting.`}
          />


          <QuickAction
            href="/admin/contact-enquiries"
            icon={MessagesSquare}
            title="Contact Enquiries"
            description={`${
              stats?.new_contact_enquiries ??
              0
            } new general enquiries waiting.`}
          />

        </div>

      </section>


      {/* ========================================
          WEBSITE SHORTCUT
      ======================================== */}

      <section className="mt-10">

        <div className="flex flex-col gap-5 rounded-2xl bg-[#082D52] p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D3A72F]">
              Next Move Estates
            </p>

            <h2 className="mt-2 text-xl font-semibold text-white">
              View the public website
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/65">
              Check how your properties and
              website content appear to visitors.
            </p>

          </div>


          <Link
            href="/"
            target="_blank"
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-[#082D52]
              transition
              hover:bg-gray-100
            "
          >

            <Eye size={17} />

            View Website

          </Link>

        </div>

      </section>

    </div>
  );
}


// ========================================
// SECTION HEADING
// ========================================

function SectionHeading({
  title,
  description,
}) {
  return (
    <div>

      <h2 className="text-xl font-semibold text-[#082D52]">
        {title}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>

    </div>
  );
}


// ========================================
// STAT CARD
// ========================================

function StatCard({
  title,
  value,
  icon: Icon,
  href,
  highlight = false,
}) {

  const content = (
    <div
      className={`
        group
        h-full
        rounded-2xl
        border
        p-6
        shadow-sm
        transition-all
        duration-200

        ${
          highlight
            ? "border-[#E7D18C] bg-[#FFF9E8]"
            : "border-[#DCE8F0] bg-white"
        }

        ${
          href
            ? "hover:-translate-y-0.5 hover:shadow-md"
            : ""
        }
      `}
    >

      <div className="flex items-start justify-between gap-4">

        <div>

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-semibold text-[#082D52]">
            {value}
          </p>

        </div>


        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl

            ${
              highlight
                ? "bg-[#D3A72F] text-[#082D52]"
                : "bg-[#EEF5FA] text-[#082D52]"
            }
          `}
        >

          <Icon
            size={21}
            strokeWidth={1.8}
          />

        </div>

      </div>


      {href && (

        <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[#B58A1E]">

          View details

          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />

        </div>

      )}

    </div>
  );


  if (!href) {
    return content;
  }


  return (
    <Link
      href={href}
      className="block"
    >
      {content}
    </Link>
  );
}


// ========================================
// QUICK ACTION
// ========================================

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}) {

  return (
    <Link
      href={href}
      className="
        group
        rounded-2xl
        border
        border-[#DCE8F0]
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-[#D3A72F]
        hover:shadow-md
      "
    >

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF5FA] text-[#082D52]">

        <Icon
          size={19}
          strokeWidth={1.8}
        />

      </div>


      <h3 className="mt-4 font-semibold text-[#082D52]">
        {title}
      </h3>


      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>


      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#B58A1E]">

        Open

        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-1"
        />

      </div>

    </Link>
  );
}