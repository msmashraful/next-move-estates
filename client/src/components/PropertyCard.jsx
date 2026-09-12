"use client";

import Link from "next/link";

import {
  BedDouble,
  Bath,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import SavePropertyButton from
  "@/components/property/SavePropertyButton";


export default function PropertyCard({
  propertyId,
  image,
  badge,
  price,
  priceSuffix,
  title,
  location,
  bedrooms,
  bathrooms,
  href = "#",
  onSavedChange,
}) {

  return (

    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >


      {/* ========================================
          PROPERTY IMAGE
      ======================================== */}

      <div className="relative">

        <Link
          href={href}
          className="
            relative
            block
            overflow-hidden
          "
        >

          <img
            src={image}
            alt={title}
            className="
              h-[260px]
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />


          {/* Badge */}

          <span
            className="
              absolute
              left-4
              top-4
              rounded-md
              bg-[#082D52]
              px-3
              py-1.5
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-white
            "
          >

            {badge}

          </span>

        </Link>


        {/* ========================================
            SAVE BUTTON
        ======================================== */}

        {propertyId && (

          <SavePropertyButton
            propertyId={
              propertyId
            }
            showText={false}
            onSavedChange={
              onSavedChange
            }
            className="
              absolute
              right-4
              top-4
              z-20
              h-11
              w-11
              rounded-full
              bg-white
              text-[#082D52]
              shadow-md
              hover:bg-[#082D52]
              hover:text-white
            "
          />

        )}

      </div>


      {/* ========================================
          PROPERTY INFORMATION
      ======================================== */}

      <div className="p-6">


        {/* PRICE */}

        <div className="flex items-end gap-1">

          <p className="text-2xl font-bold text-[#082D52]">

            {price}

          </p>


          {priceSuffix && (

            <span className="mb-1 text-sm text-gray-500">

              {priceSuffix}

            </span>

          )}

        </div>


        {/* TITLE */}

        <Link href={href}>

          <h3
            className="
              mt-3
              text-xl
              font-semibold
              text-[#082D52]
              transition-colors
              group-hover:text-[#B58A1E]
            "
          >

            {title}

          </h3>

        </Link>


        {/* LOCATION */}

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">

          <MapPin
            size={16}
          />

          <span>
            {location}
          </span>

        </div>


        {/* DIVIDER */}

        <div className="my-5 border-t border-gray-200" />


        {/* FEATURES */}

        <div className="flex items-center justify-between">


          <div className="flex items-center gap-5 text-sm text-gray-600">


            <div className="flex items-center gap-2">

              <BedDouble
                size={18}
                className="text-[#082D52]"
              />

              <span>
                {bedrooms} Beds
              </span>

            </div>


            <div className="flex items-center gap-2">

              <Bath
                size={18}
                className="text-[#082D52]"
              />

              <span>
                {bathrooms} Baths
              </span>

            </div>


          </div>


          <Link
            href={href}
            aria-label={`View ${title}`}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-[#EEF5FA]
              text-[#082D52]
              transition-all
              duration-300
              hover:bg-[#D3A72F]
            "
          >

            <ArrowUpRight
              size={17}
            />

          </Link>


        </div>

      </div>

    </article>

  );
}