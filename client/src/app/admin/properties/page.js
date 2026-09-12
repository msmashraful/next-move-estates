"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  LoaderCircle,
  Building2,
  Search,
  AlertCircle,
} from "lucide-react";

export default function AdminPropertiesPage() {
  const router = useRouter();

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const [deletingId, setDeletingId] = useState(null);


  useEffect(() => {
    loadProperties();
  }, []);


  useEffect(() => {
    let result = [...properties];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((property) =>
        property.title?.toLowerCase().includes(keyword) ||
        property.address?.toLowerCase().includes(keyword) ||
        property.postcode?.toLowerCase().includes(keyword)
      );
    }

    if (typeFilter !== "all") {
      result = result.filter(
        (property) =>
          property.listing_type === typeFilter
      );
    }

    setFilteredProperties(result);

  }, [search, typeFilter, properties]);


  async function loadProperties() {
    try {
      setLoading(true);
      setError("");

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
        `${API_URL}/api/properties/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to load properties"
        );
      }

      setProperties(data.properties);
      setFilteredProperties(data.properties);

    } catch (error) {
      console.error(error);

      setError(
        error.message ||
        "Failed to load properties"
      );

    } finally {
      setLoading(false);
    }
  }


  async function handleDelete(property) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${property.title}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(property.id);

      const token =
        localStorage.getItem("admin_token");

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5000";

      const response = await fetch(
        `${API_URL}/api/properties/${property.id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to delete property"
        );
      }

      setProperties((current) =>
        current.filter(
          (item) => item.id !== property.id
        )
      );

    } catch (error) {
      alert(
        error.message ||
        "Failed to delete property"
      );

    } finally {
      setDeletingId(null);
    }
  }


  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">

        <div className="text-center">

          <LoaderCircle
            size={34}
            className="mx-auto animate-spin text-[#082D52]"
          />

          <p className="mt-3 text-sm text-gray-500">
            Loading properties...
          </p>

        </div>

      </div>
    );
  }


  return (
    <div className="p-6 md:p-8 lg:p-10">

      {/* HEADER */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D3A72F]">
            Property Management
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#082D52]">
            Properties
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all sale, letting and room listings.
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
          <Plus size={18} />

          Add Property
        </Link>

      </div>


      {/* FILTERS */}

      <div className="mt-8 rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-sm">

        <div className="grid gap-4 md:grid-cols-[1fr_220px]">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search by title, location or postcode..."
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
                focus:border-[#082D52]
                focus:ring-2
                focus:ring-[#082D52]/10
              "
            />

          </div>


          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
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
              focus:border-[#082D52]
            "
          >
            <option value="all">
              All Listings
            </option>

            <option value="sale">
              For Sale
            </option>

            <option value="letting">
              To Let
            </option>

            <option value="room">
              Room To Let
            </option>
          </select>

        </div>

      </div>


      {/* ERROR */}

      {error && (
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

          <AlertCircle size={18} />

          {error}

        </div>
      )}


      {/* RESULT COUNT */}

      <div className="mt-6 flex items-center justify-between">

        <p className="text-sm text-gray-500">
          {filteredProperties.length} properties
        </p>

      </div>


      {/* TABLE */}

      <div className="mt-4 overflow-hidden rounded-2xl border border-[#DCE8F0] bg-white shadow-sm">

        {filteredProperties.length === 0 ? (

          <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF5FA] text-[#082D52]">

              <Building2 size={25} />

            </div>

            <h2 className="mt-4 text-lg font-semibold text-[#082D52]">
              No properties found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try another search or add a new property.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px]">

              <thead className="bg-[#F7FAFC]">

                <tr className="border-b border-gray-200">

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Property
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Listing
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Price
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Featured
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredProperties.map(
                  (property) => (

                    <PropertyRow
                      key={property.id}
                      property={property}
                      deleting={
                        deletingId === property.id
                      }
                      onDelete={() =>
                        handleDelete(property)
                      }
                    />

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}


function PropertyRow({
  property,
  deleting,
  onDelete,
}) {
  return (
    <tr className="border-b border-gray-100 last:border-0 hover:bg-[#FAFCFD]">

      {/* PROPERTY */}

      <td className="px-5 py-4">

        <div>

          <p className="font-semibold text-[#082D52]">
            {property.title}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {property.address || "No address"}

            {property.postcode &&
              ` · ${property.postcode}`}
          </p>

        </div>

      </td>


      {/* LISTING */}

      <td className="px-5 py-4">

        <ListingBadge
          type={property.listing_type}
        />

      </td>


      {/* PRICE */}

      <td className="px-5 py-4">

        <p className="font-semibold text-[#082D52]">

          £
          {Number(
            property.price
          ).toLocaleString("en-GB")}

          {property.price_period && (
            <span className="ml-1 text-xs font-normal text-gray-500">
              {property.price_period}
            </span>
          )}

        </p>

      </td>


      {/* STATUS */}

      <td className="px-5 py-4">

        <StatusBadge
          status={property.status}
        />

      </td>


      {/* FEATURED */}

      <td className="px-5 py-4 text-sm">

        {property.featured
          ? "Yes"
          : "No"}

      </td>


      {/* ACTIONS */}

      <td className="px-5 py-4">

        <div className="flex items-center justify-end gap-2">

          <Link
            href={`/properties/${property.slug}`}
            target="_blank"
            aria-label="View property"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#082D52] hover:text-[#082D52]"
          >
            <ExternalLink size={16} />
          </Link>


          <Link
            href={`/admin/properties/${property.id}/edit`}
            aria-label="Edit property"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#D3A72F] hover:text-[#B58A1E]"
          >
            <Pencil size={16} />
          </Link>


          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            aria-label="Delete property"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50 disabled:opacity-40"
          >

            {deleting ? (
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
            ) : (
              <Trash2 size={16} />
            )}

          </button>

        </div>

      </td>

    </tr>
  );
}


function ListingBadge({ type }) {
  const labels = {
    sale: "For Sale",
    letting: "To Let",
    room: "Room",
  };

  return (
    <span className="inline-flex rounded-full bg-[#EEF5FA] px-3 py-1 text-xs font-semibold text-[#082D52]">
      {labels[type] || type}
    </span>
  );
}


function StatusBadge({ status }) {
  const styles = {
    available:
      "bg-green-50 text-green-700",

    sold:
      "bg-gray-100 text-gray-600",

    let:
      "bg-blue-50 text-blue-700",

    draft:
      "bg-amber-50 text-amber-700",
  };

  const labels = {
    available: "Available",
    sold: "Sold",
    let: "Let Agreed",
    draft: "Draft",
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