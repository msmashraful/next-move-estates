import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyEnquiryForm from "@/components/PropertyEnquiryForm";
import SavePropertyButton from
  "@/components/property/SavePropertyButton";

import {
  MapPin,
  BedDouble,
  Bath,
  Home,
  Sofa,
  CalendarDays,
  BadgePoundSterling,
  ClipboardCheck,
  ArrowLeft,
  Phone,
  Mail,
} from "lucide-react";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://nextmoveestateslondon.co.uk";


// ========================================
// GET SINGLE PROPERTY
// ========================================

async function getProperty(slug) {
  try {
    const response = await fetch(
      `${API_URL}/api/properties/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(
        "Failed to fetch property"
      );
    }

    const data =
      await response.json();

    return data.property;

  } catch (error) {
    console.error(
      "Single property fetch error:",
      error
    );

    return null;
  }
}


// ========================================
// PAGE METADATA
// ========================================

export async function generateMetadata({
  params,
}) {
  const { slug } =
    await params;

  const property =
    await getProperty(slug);


  if (!property) {
    return {
      title:
        "Property Not Found",

      description:
        "The requested property could not be found on Next Move Estates London.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }


  const listingType =
    property.listing_type === "sale"
      ? "For Sale"
      : property.listing_type === "letting"
      ? "To Rent"
      : property.listing_type === "room"
      ? "Room To Rent"
      : "Property";


  const price =
    property.price != null
      ? Number(
          property.price
        ).toLocaleString(
          "en-GB"
        )
      : null;


  const priceText =
    property.listing_type === "sale"
      ? price
        ? `£${price}`
        : ""
      : price
      ? `£${price}${
          property.price_period
            ? ` ${property.price_period}`
            : ""
        }`
      : "";


  const title = [
    property.title,
    listingType,
    property.address,
  ]
    .filter(Boolean)
    .join(" | ");


  const description = [
    property.bedrooms
      ? `${property.bedrooms} bedroom`
      : null,

    property.property_type,

    listingType.toLowerCase(),

    property.address
      ? `in ${property.address}`
      : null,

    priceText
      ? `available at ${priceText}`
      : null,

    "through Next Move Estates London.",
  ]
    .filter(Boolean)
    .join(" ");


  const propertyUrl =
    `${SITE_URL}/properties/${slug}`;


  const image =
    property.images?.find(
      (img) => img.is_primary
    )?.image_url ||
    property.images?.[0]
      ?.image_url ||
    property.image ||
    `${SITE_URL}/logo.png`;


  return {
    title,
    description,

    alternates: {
      canonical:
        propertyUrl,
    },

    openGraph: {
      type:
        "website",

      locale:
        "en_GB",

      url:
        propertyUrl,

      siteName:
        "Next Move Estates London",

      title,
      description,

      images: [
        {
          url: image,

          alt:
            property.title ||
            "Next Move Estates London Property",
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title,
      description,

      images: [image],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}


// ========================================
// PROPERTY STRUCTURED DATA
// ========================================

function buildPropertySchema(
  property,
  slug
) {
  const propertyUrl =
    `${SITE_URL}/properties/${slug}`;


  const primaryImage =
    property.images?.find(
      (image) =>
        image.is_primary
    )?.image_url ||
    property.images?.[0]
      ?.image_url ||
    property.image ||
    `${SITE_URL}/logo.png`;


  const propertyType =
    property.property_type
      ?.toLowerCase() || "";


  let schemaType =
    "House";


  if (
    propertyType.includes(
      "flat"
    ) ||
    propertyType.includes(
      "apartment"
    )
  ) {
    schemaType =
      "Apartment";
  }


  const schema = {
    "@context":
      "https://schema.org",

    "@type":
      schemaType,

    name:
      property.title,

    url:
      propertyUrl,

    image: [
      primaryImage,
    ],

    description:
      property.description ||
      `${property.title} listed with Next Move Estates London.`,

    address: {
      "@type":
        "PostalAddress",

      streetAddress:
        property.address ||
        undefined,

      postalCode:
        property.postcode ||
        undefined,

      addressCountry:
        "GB",
    },

    numberOfBedrooms:
      property.bedrooms != null
        ? Number(
            property.bedrooms
          )
        : undefined,

    numberOfBathroomsTotal:
      property.bathrooms != null
        ? Number(
            property.bathrooms
          )
        : undefined,

    offers: {
      "@type":
        "Offer",

      url:
        propertyUrl,

      price:
        property.price != null
          ? Number(
              property.price
            )
          : undefined,

      priceCurrency:
        "GBP",

      availability:
        property.status ===
        "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",

      seller: {
        "@type":
          "RealEstateAgent",

        name:
          "Next Move Estates London Limited",

        url:
          SITE_URL,
      },
    },
  };


  return JSON.parse(
    JSON.stringify(schema)
  );
}


// ========================================
// BREADCRUMB STRUCTURED DATA
// ========================================

function buildBreadcrumbSchema(
  property,
  slug
) {
  let listingPage =
    "/buy";

  let listingName =
    "Properties for Sale";


  if (
    property.listing_type ===
    "letting"
  ) {
    listingPage =
      "/rent";

    listingName =
      "Properties to Rent";
  }


  if (
    property.listing_type ===
    "room"
  ) {
    listingPage =
      "/rooms";

    listingName =
      "Rooms to Rent";
  }


  return {
    "@context":
      "https://schema.org",

    "@type":
      "BreadcrumbList",

    itemListElement: [
      {
        "@type":
          "ListItem",

        position: 1,

        name:
          "Home",

        item:
          SITE_URL,
      },

      {
        "@type":
          "ListItem",

        position: 2,

        name:
          listingName,

        item:
          `${SITE_URL}${listingPage}`,
      },

      {
        "@type":
          "ListItem",

        position: 3,

        name:
          property.title,

        item:
          `${SITE_URL}/properties/${slug}`,
      },
    ],
  };
}


// ========================================
// PROPERTY DETAILS PAGE
// ========================================

export default async function PropertyDetailsPage({
  params,
}) {
  const { slug } =
    await params;


  const property =
    await getProperty(slug);


  if (!property) {
    notFound();
  }


  // ========================================
  // STRUCTURED DATA
  // ========================================

  const propertySchema =
    buildPropertySchema(
      property,
      slug
    );


  const breadcrumbSchema =
    buildBreadcrumbSchema(
      property,
      slug
    );


  // ========================================
  // PRICE
  // ========================================

  const formattedPrice =
    Number(
      property.price
    ).toLocaleString(
      "en-GB"
    );


  // ========================================
  // LISTING LABEL
  // ========================================

  let listingLabel =
    "Property";


  if (
    property.listing_type ===
    "sale"
  ) {
    listingLabel =
      "For Sale";
  }


  if (
    property.listing_type ===
    "letting"
  ) {
    listingLabel =
      "To Let";
  }


  if (
    property.listing_type ===
    "room"
  ) {
    listingLabel =
      "Room To Let";
  }


  // ========================================
  // BACK LINK
  // ========================================

  let backLink =
    "/buy";


  if (
    property.listing_type ===
    "letting"
  ) {
    backLink =
      "/rent";
  }


  if (
    property.listing_type ===
    "room"
  ) {
    backLink =
      "/rooms";
  }


  return (
    <>

      {/* ========================================
          PROPERTY STRUCTURED DATA
      ======================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              propertySchema
            ),
        }}
      />


      {/* ========================================
          BREADCRUMB STRUCTURED DATA
      ======================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbSchema
            ),
        }}
      />


      <Navbar />


      <main className="bg-[#F7FAFC]">


        {/* ========================================
            BREADCRUMB
        ======================================== */}

        <section className="border-b border-gray-200 bg-white">

          <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">

            <Link
              href={backLink}
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-gray-500
                transition
                hover:text-[#082D52]
              "
            >

              <ArrowLeft
                size={16}
              />

              Back to properties

            </Link>

          </div>

        </section>


        {/* ========================================
            PROPERTY HERO
        ======================================== */}

        <section className="bg-white px-4 pb-10 pt-8 md:px-6 md:pb-14">

          <div className="mx-auto max-w-7xl">


            {/* LISTING BADGE */}

            <div className="mb-4">

              <span
                className="
                  inline-flex
                  rounded-lg
                  bg-[#082D52]
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-white
                "
              >
                {listingLabel}
              </span>

            </div>


            {/* PROPERTY GALLERY */}

            <PropertyGallery
              images={
                property.images ||
                []
              }

              fallbackImage={
                property.image ||
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
              }

              title={
                property.title
              }
            />


            {/* ========================================
                TITLE / PRICE / SAVE
            ======================================== */}

            <div
              className="
                mt-8
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >

              {/* LEFT */}

              <div>

                <h1
                  className="
                    max-w-4xl
                    text-3xl
                    font-semibold
                    leading-tight
                    text-[#082D52]
                    md:text-4xl
                    lg:text-5xl
                  "
                >
                  {property.title}
                </h1>


                <div className="mt-4 flex items-center gap-2 text-gray-500">

                  <MapPin
                    size={19}
                    className="text-[#D3A72F]"
                  />

                  <span>

                    {property.address}

                    {property.postcode &&
                      `, ${property.postcode}`}

                  </span>

                </div>

              </div>


              {/* RIGHT */}

              <div className="flex flex-col gap-4 lg:items-end lg:text-right">


                {/* PRICE */}

                <div>

                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-gray-400">
                    Price
                  </p>


                  <div className="mt-1 flex items-end gap-2 lg:justify-end">

                    <p className="text-3xl font-bold text-[#082D52] md:text-4xl">
                      £{formattedPrice}
                    </p>


                    {property.price_period && (
                      <span className="mb-1 text-gray-500">
                        {property.price_period}
                      </span>
                    )}

                  </div>

                </div>


                {/* SAVE PROPERTY */}

                <SavePropertyButton
                  propertyId={
                    property.id
                  }
                  className="
                    rounded-xl
                    border
                    border-[#082D52]
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-[#082D52]
                    shadow-sm
                    transition
                    hover:bg-[#082D52]
                    hover:text-white
                  "
                />

              </div>

            </div>

          </div>

        </section>


        {/* ========================================
            MAIN DETAILS
        ======================================== */}

        <section className="px-4 py-12 md:px-6 md:py-16">

          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">


            {/* LEFT COLUMN */}

            <div>


              {/* ========================================
                  PROPERTY FEATURES
              ======================================== */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-4
                  rounded-2xl
                  border
                  border-[#DCE8F0]
                  bg-white
                  p-5
                  shadow-sm
                  sm:grid-cols-4
                  md:p-6
                "
              >

                {/* BEDROOMS */}

                <div>

                  <BedDouble
                    size={24}
                    className="text-[#D3A72F]"
                  />


                  <p className="mt-3 text-xs uppercase tracking-wide text-gray-400">
                    Bedrooms
                  </p>


                  <p className="mt-1 font-semibold text-[#082D52]">
                    {
                      property.bedrooms ??
                      "N/A"
                    }
                  </p>

                </div>


                {/* BATHROOMS */}

                <div>

                  <Bath
                    size={24}
                    className="text-[#D3A72F]"
                  />


                  <p className="mt-3 text-xs uppercase tracking-wide text-gray-400">
                    Bathrooms
                  </p>


                  <p className="mt-1 font-semibold text-[#082D52]">
                    {
                      property.bathrooms ??
                      "N/A"
                    }
                  </p>

                </div>


                {/* PROPERTY TYPE */}

                <div>

                  <Home
                    size={24}
                    className="text-[#D3A72F]"
                  />


                  <p className="mt-3 text-xs uppercase tracking-wide text-gray-400">
                    Property Type
                  </p>


                  <p className="mt-1 font-semibold text-[#082D52]">
                    {
                      property.property_type ||
                      "N/A"
                    }
                  </p>

                </div>


                {/* FURNISHING */}

                <div>

                  <Sofa
                    size={24}
                    className="text-[#D3A72F]"
                  />


                  <p className="mt-3 text-xs uppercase tracking-wide text-gray-400">
                    Furnishing
                  </p>


                  <p className="mt-1 font-semibold text-[#082D52]">
                    {
                      property.furnished_status ||
                      "N/A"
                    }
                  </p>

                </div>

              </div>


              {/* ========================================
                  DESCRIPTION
              ======================================== */}

              <div
                className="
                  mt-8
                  rounded-2xl
                  border
                  border-[#DCE8F0]
                  bg-white
                  p-6
                  shadow-sm
                  md:p-8
                "
              >

                <h2 className="text-2xl font-semibold text-[#082D52]">
                  About this property
                </h2>


                <p className="mt-5 whitespace-pre-line leading-8 text-gray-600">

                  {
                    property.description ||
                    "Property information will be available soon."
                  }

                </p>

              </div>


              {/* ========================================
                  PROPERTY INFORMATION
              ======================================== */}

              <div
                className="
                  mt-8
                  rounded-2xl
                  border
                  border-[#DCE8F0]
                  bg-white
                  p-6
                  shadow-sm
                  md:p-8
                "
              >

                <h2 className="text-2xl font-semibold text-[#082D52]">
                  Property information
                </h2>


                <div className="mt-6 grid gap-5 sm:grid-cols-2">


                  <InfoItem
                    icon={
                      ClipboardCheck
                    }

                    label=
                      "EPC Rating"

                    value={
                      property.epc_rating ||
                      "Not available"
                    }
                  />


                  <InfoItem
                    icon={
                      BadgePoundSterling
                    }

                    label=
                      "Council Tax Band"

                    value={
                      property.council_tax_band ||
                      "Not available"
                    }
                  />


                  {
                    property.available_date &&
                    (
                      <InfoItem
                        icon={
                          CalendarDays
                        }

                        label=
                          "Available From"

                        value={
                          property.available_date
                        }
                      />
                    )
                  }


                  {
                    property.deposit &&
                    (
                      <InfoItem
                        icon={
                          BadgePoundSterling
                        }

                        label=
                          "Deposit"

                        value={`£${Number(
                          property.deposit
                        ).toLocaleString(
                          "en-GB"
                        )}`}
                      />
                    )
                  }

                </div>

              </div>

            </div>


            {/* ========================================
                ENQUIRY SIDEBAR
            ======================================== */}

            <aside>

              <div
                className="
                  sticky
                  top-28
                  rounded-3xl
                  bg-[#082D52]
                  p-6
                  text-white
                  shadow-[0_18px_45px_rgba(8,45,82,0.18)]
                "
              >

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D3A72F]">
                  Interested?
                </p>


                <h2 className="mt-3 text-2xl font-semibold">
                  Arrange a viewing
                </h2>


                <p className="mt-4 text-sm leading-7 text-white/70">
                  Interested in this
                  property? Contact our
                  team to ask a question
                  or arrange a viewing.
                </p>


                <PropertyEnquiryForm
                  propertyId={
                    property.id
                  }

                  propertyTitle={
                    property.title
                  }
                />


                {/* PHONE */}

                <a
                  href="tel:+447506744382"
                  className="
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/15
                    bg-white/5
                    px-5
                    py-3.5
                    text-sm
                    font-semibold
                    transition
                    hover:bg-white/10
                  "
                >

                  <Phone
                    size={17}
                  />

                  +44 (0) 7506 744382

                </a>


                {/* EMAIL */}

                <a
                  href={`mailto:info.nextmoveuk@gmail.com?subject=${encodeURIComponent(
                    `Property Enquiry - ${property.title}`
                  )}`}
                  className="
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/15
                    bg-white/5
                    px-5
                    py-3.5
                    text-sm
                    font-semibold
                    transition
                    hover:bg-white/10
                  "
                >

                  <Mail
                    size={17}
                  />

                  Email Us

                </a>


                {/* PROPERTY REFERENCE */}

                <div className="mt-6 border-t border-white/10 pt-5">

                  <p className="text-xs text-white/45">
                    Property Reference
                  </p>


                  <p className="mt-1 text-sm font-medium text-white/75">

                    NME-

                    {
                      String(
                        property.id
                      ).padStart(
                        4,
                        "0"
                      )
                    }

                  </p>

                </div>

              </div>

            </aside>

          </div>

        </section>

      </main>


      <Footer />

    </>
  );
}


// ========================================
// REUSABLE INFO ITEM
// ========================================

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-4
        rounded-xl
        bg-[#F7FAFC]
        p-4
      "
    >

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-[#EEF5FA]
          text-[#082D52]
        "
      >

        <Icon
          size={19}
        />

      </div>


      <div>

        <p className="text-xs uppercase tracking-wide text-gray-400">
          {label}
        </p>


        <p className="mt-1 font-semibold text-[#082D52]">
          {value}
        </p>

      </div>

    </div>
  );
}