"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

import PropertyForm from "@/components/admin/PropertyForm";


export default function EditPropertyPage({
  params,
}) {
  const router = useRouter();

  const { id } = use(params);

  const [property, setProperty] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {
    async function loadProperty() {
      try {
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
            `${API_URL}/api/properties/admin/${id}`,
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
          throw new Error(
            data.message ||
              "Failed to load property"
          );
        }

        setProperty(
          data.property
        );

      } catch (error) {
        console.error(error);

        setError(
          error.message ||
            "Failed to load property"
        );

      } finally {
        setLoading(false);
      }
    }

    loadProperty();

  }, [id, router]);


  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">

        <div className="text-center">

          <LoaderCircle
            size={34}
            className="mx-auto animate-spin text-[#082D52]"
          />

          <p className="mt-3 text-sm text-gray-500">
            Loading property...
          </p>

        </div>

      </div>
    );
  }


  if (error || !property) {
    return (
      <div className="p-6 md:p-8 lg:p-10">

        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

          <AlertCircle size={18} />

          {error ||
            "Property not found"}

        </div>

      </div>
    );
  }


  return (
    <div className="p-6 md:p-8 lg:p-10">

      <Link
        href="/admin/properties"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#082D52]"
      >
        <ArrowLeft size={17} />

        Back to Properties
      </Link>


      <div className="mt-5">

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D3A72F]">
          Properties
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-[#082D52]">
          Edit Property
        </h1>

        <p className="mt-2 text-gray-500">
          Update listing information for{" "}
          <span className="font-medium text-[#082D52]">
            {property.title}
          </span>
          .
        </p>

      </div>


      <div className="mt-8 max-w-5xl">

        <PropertyForm
          mode="edit"
          initialData={property}
        />

      </div>

    </div>
  );
}