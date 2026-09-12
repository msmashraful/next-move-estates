import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import RentFilters from "@/components/RentFilters";

export const metadata = {
  title: "Properties to Rent in London",
  description:
    "Find houses, flats and rental properties in London and surrounding areas with Next Move Estates London.",
  alternates: {
    canonical: "/rent",
  },
};


// ========================================
// API URL
// ========================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";


// ========================================
// GET RENTAL PROPERTIES
// ========================================

async function getProperties(filters) {
  try {
    const params =
      new URLSearchParams();


    // Rent page তাই letting সবসময় থাকবে
    params.set(
      "listing_type",
      "letting"
    );


    if (filters.location) {
      params.set(
        "location",
        filters.location
      );
    }


    if (
      filters.property_type
    ) {
      params.set(
        "property_type",
        filters.property_type
      );
    }


    if (filters.min_price) {
      params.set(
        "min_price",
        filters.min_price
      );
    }


    if (filters.max_price) {
      params.set(
        "max_price",
        filters.max_price
      );
    }


    if (filters.sort) {
      params.set(
        "sort",
        filters.sort
      );
    }


    const response =
      await fetch(
        `${API_URL}/api/properties?${params.toString()}`,
        {
          cache:
            "no-store",
        }
      );


    if (!response.ok) {
      throw new Error(
        "Failed to fetch rental properties"
      );
    }


    const data =
      await response.json();


    return (
      data.properties ||
      []
    );

  } catch (error) {

    console.error(
      "Rental property fetch error:",
      error
    );


    return [];
  }
}


// ========================================
// RENT PAGE
// ========================================

export default async function RentPage({
  searchParams,
}) {

  const params =
    await searchParams;


  const filters = {

    location:
      typeof params?.location ===
      "string"
        ? params.location
        : "",


    property_type:
      typeof params?.property_type ===
      "string"
        ? params.property_type
        : "",


    min_price:
      typeof params?.min_price ===
      "string"
        ? params.min_price
        : "",


    max_price:
      typeof params?.max_price ===
      "string"
        ? params.max_price
        : "",


    sort:
      typeof params?.sort ===
      "string"
        ? params.sort
        : "newest",
  };


  const properties =
    await getProperties(
      filters
    );


  return (
    <>

      <Navbar />


      <main>


        {/* ========================================
            HEADER
        ======================================== */}

        <section className="bg-[#082D52] px-4 py-14 text-white md:px-6 md:py-16">

          <div className="mx-auto max-w-7xl">


            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D3A72F]">
              Properties To Rent
            </p>


            <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
              Find your next rental home
            </h1>


            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
              Explore our latest
              properties to rent and
              find a home that suits
              your lifestyle and budget.
            </p>


          </div>

        </section>


        {/* ========================================
            PROPERTY SECTION
        ======================================== */}

        <section className="bg-[#F7FAFC] px-4 py-12 md:px-6 md:py-16">

          <div className="mx-auto max-w-7xl">


            {/* ========================================
                FILTERS
            ======================================== */}

            <RentFilters
              initialLocation={
                filters.location
              }

              initialPropertyType={
                filters.property_type
              }

              initialMinPrice={
                filters.min_price
              }

              initialMaxPrice={
                filters.max_price
              }

              initialSort={
                filters.sort
              }
            />


            {/* ========================================
                RESULT INFO
            ======================================== */}

            <div className="-mt-10">


              <p className="text-sm font-medium text-[#D3A72F]">
                Properties to rent
              </p>


              <h2 className="mt-1 text-2xl font-semibold text-[#082D52] md:text-3xl">
                Available Rentals
              </h2>


              <p className="mt-2 text-sm text-gray-500">

                {properties.length}{" "}

                {properties.length === 1
                  ? "property"
                  : "properties"}{" "}

                found

              </p>


            </div>


            {/* ========================================
                PROPERTY GRID
            ======================================== */}

            {properties.length > 0 ? (

              <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">


                {properties.map(
                  (property) => (

                    <PropertyCard

                      key={
                        property.id
                      }


                      // ========================================
                      // SAVE / FAVOURITES
                      // ========================================

                      propertyId={
                        property.id
                      }


                      // ========================================
                      // IMAGE
                      // ========================================

                      image={
                        property.image ||
                        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80"
                      }


                      // ========================================
                      // BADGE
                      // ========================================

                      badge=
                        "To Let"


                      // ========================================
                      // PRICE
                      // ========================================

                      price={`£${Number(
                        property.price
                      ).toLocaleString(
                        "en-GB"
                      )}`}


                      priceSuffix={
                        property.price_period ||
                        "pcm"
                      }


                      // ========================================
                      // PROPERTY DETAILS
                      // ========================================

                      title={
                        property.title
                      }


                      location={
                        property.address
                      }


                      bedrooms={
                        property.bedrooms
                      }


                      bathrooms={
                        property.bathrooms
                      }


                      // ========================================
                      // LINK
                      // ========================================

                      href={`/properties/${property.slug}`}

                    />

                  )
                )}


              </div>

            ) : (

              /* ========================================
                  NO RESULTS
              ======================================== */

              <div className="mt-8 rounded-2xl border border-[#DCE8F0] bg-white px-6 py-16 text-center">


                <h3 className="text-xl font-semibold text-[#082D52]">
                  No rental properties found
                </h3>


                <p className="mx-auto mt-2 max-w-md text-gray-500">
                  We couldn't find any
                  rental properties
                  matching your search.
                  Try changing the
                  location, property
                  type or monthly rent.
                </p>


              </div>

            )}


          </div>

        </section>


      </main>


      <Footer />

    </>
  );
}