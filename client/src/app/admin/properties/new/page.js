import Link from "next/link";

import {
  ArrowLeft,
} from "lucide-react";

import PropertyForm from "@/components/admin/PropertyForm";


export const metadata = {
  title: "Add Property",
};


export default function AddPropertyPage() {
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
          Add New Property
        </h1>

        <p className="mt-2 max-w-2xl text-gray-500">
          Add a new property for sale,
          letting or room rental.
        </p>

      </div>


      <div className="mt-8 max-w-5xl">

        <PropertyForm />

      </div>

    </div>
  );
}