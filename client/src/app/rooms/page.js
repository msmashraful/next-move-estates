import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import RoomFilters from "@/components/RoomFilters";

export const metadata = {
  title: "Rooms to Rent in London",
  description:
    "Browse rooms to rent in London and surrounding areas with Next Move Estates London.",
  alternates: {
    canonical: "/rooms",
  },
};


// ========================================
// API URL
// ========================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";


// ========================================
// GET ROOM PROPERTIES
// ========================================

async function getProperties(filters) {
  try {
    const params =
      new URLSearchParams();

    params.set(
      "listing_type",
      "room"
    );


    if (filters.location) {
      params.set(
        "location",
        filters.location
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
          cache: "no-store",
        }
      );


    if (!response.ok) {
      throw new Error(
        "Failed to fetch rooms"
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
      "Room fetch error:",
      error
    );


    return [];
  }
}


// ========================================
// ROOMS PAGE
// ========================================

export default async function RoomsPage({
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
              Rooms To Rent
            </p>


            <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
              Find your next room
            </h1>


            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
              Browse furnished and
              unfurnished rooms to rent
              and find a comfortable
              place that matches your
              budget and location.
            </p>


          </div>

        </section>


        {/* ========================================
            ROOMS SECTION
        ======================================== */}

        <section className="bg-[#F7FAFC] px-4 py-12 md:px-6 md:py-16">

          <div className="mx-auto max-w-7xl">


            {/* ========================================
                FILTERS
            ======================================== */}

            <RoomFilters
              initialLocation={
                filters.location
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
                RESULTS HEADER
            ======================================== */}

            <div className="-mt-10">


              <p className="text-sm font-medium text-[#D3A72F]">
                Rooms to rent
              </p>


              <h2 className="mt-1 text-2xl font-semibold text-[#082D52] md:text-3xl">
                Available Rooms
              </h2>


              <p className="mt-2 text-sm text-gray-500">

                {properties.length}{" "}

                {properties.length === 1
                  ? "room"
                  : "rooms"}{" "}

                found

              </p>


            </div>


            {/* ========================================
                ROOM GRID
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
                        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"
                      }


                      // ========================================
                      // BADGE
                      // ========================================

                      badge=
                        "Room To Let"


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
                      // PROPERTY INFORMATION
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
                      // PROPERTY DETAILS LINK
                      // ========================================

                      href={`/properties/${property.slug}`}

                    />

                  )
                )}


              </div>

            ) : (

              /* ========================================
                  EMPTY STATE
              ======================================== */

              <div className="mt-8 rounded-2xl border border-[#DCE8F0] bg-white px-6 py-16 text-center">


                <h3 className="text-xl font-semibold text-[#082D52]">
                  No rooms found
                </h3>


                <p className="mx-auto mt-2 max-w-md text-gray-500">
                  We couldn't find any
                  rooms matching your
                  search. Try changing
                  the location or
                  monthly rent range.
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