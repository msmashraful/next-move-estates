"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";

import {
  Heart,
  Loader2,
  ArrowLeft,
} from "lucide-react";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";


export default function SavedPropertiesPage() {

  const router =
    useRouter();


  const [properties, setProperties] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ========================================
  // LOAD SAVED PROPERTIES
  // ========================================

  useEffect(() => {

    const loadSavedProperties =
      async () => {

        const token =
          localStorage.getItem(
            "customer_token"
          );


        if (!token) {

          router.replace(
            "/sign-in?redirect=/account/saved-properties"
          );

          return;
        }


        try {

          setLoading(true);
          setError("");


          const response =
            await fetch(
              `${API_URL}/api/saved-properties`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },

                cache:
                  "no-store",
              }
            );


          const contentType =
            response.headers.get(
              "content-type"
            );


          let data;


          if (
            contentType?.includes(
              "application/json"
            )
          ) {

            data =
              await response.json();

          } else {

            const text =
              await response.text();


            console.error(
              "Unexpected response:",
              text
            );


            throw new Error(
              "Unexpected server response."
            );

          }


          if (
            response.status === 401
          ) {

            localStorage.removeItem(
              "customer_token"
            );

            localStorage.removeItem(
              "customer_user"
            );


            window.dispatchEvent(
              new Event(
                "customer-auth-change"
              )
            );


            router.replace(
              "/sign-in?redirect=/account/saved-properties"
            );

            return;
          }


          if (!response.ok) {

            throw new Error(
              data.message ||
              "Unable to load saved properties."
            );

          }


          setProperties(
            data.properties ||
            []
          );


        } catch (error) {

          console.error(
            "Load saved properties error:",
            error
          );


          setError(
            error.message ||
              "Unable to load saved properties."
          );


        } finally {

          setLoading(false);

        }

      };


    loadSavedProperties();

  }, [router]);


  // ========================================
  // INSTANT REMOVE
  // ========================================

  const handleSavedChange = (
    isSaved,
    propertyId
  ) => {

    // যদি unsave করা হয়
    // সঙ্গে সঙ্গে list থেকে remove হবে

    if (!isSaved) {

      setProperties(
        (currentProperties) =>
          currentProperties.filter(
            (property) =>
              Number(property.id) !==
              Number(propertyId)
          )
      );

    }

  };


  return (
    <>

      <Navbar />


      <main className="min-h-screen bg-[#F7FAFC]">


        {/* ========================================
            HEADER
        ======================================== */}

        <section className="bg-[#082D52] px-4 py-12 text-white md:px-6 md:py-14">

          <div className="mx-auto max-w-7xl">


            <Link
              href="/account"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-white/70
                transition
                hover:text-white
              "
            >

              <ArrowLeft
                size={16}
              />

              Back to My Account

            </Link>


            <div className="mt-8 flex items-center gap-3">


              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-[#D3A72F]
                "
              >

                <Heart
                  size={24}
                />

              </div>


              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D3A72F]">
                  My Account
                </p>

                <h1 className="mt-1 text-3xl font-semibold md:text-4xl">
                  Saved Properties
                </h1>

              </div>


            </div>


            <p className="mt-5 max-w-2xl text-white/70">
              View the properties you have
              saved and return to them
              whenever you are ready.
            </p>


          </div>

        </section>


        {/* ========================================
            CONTENT
        ======================================== */}

        <section className="px-4 py-12 md:px-6 md:py-16">

          <div className="mx-auto max-w-7xl">


            {/* ========================================
                LOADING
            ======================================== */}

            {loading && (

              <div className="flex min-h-[300px] items-center justify-center">

                <div className="text-center">

                  <Loader2
                    size={34}
                    className="mx-auto animate-spin text-[#082D52]"
                  />

                  <p className="mt-4 text-sm text-gray-500">
                    Loading saved properties...
                  </p>

                </div>

              </div>

            )}


            {/* ========================================
                ERROR
            ======================================== */}

            {!loading &&
              error && (

                <div
                  className="
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    px-6
                    py-10
                    text-center
                  "
                >

                  <p className="font-medium text-red-700">
                    {error}
                  </p>


                  <button
                    type="button"
                    onClick={() =>
                      window.location.reload()
                    }
                    className="
                      mt-5
                      rounded-xl
                      bg-[#082D52]
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-[#0A3A68]
                    "
                  >
                    Try Again
                  </button>

                </div>

              )}


            {/* ========================================
                PROPERTY LIST
            ======================================== */}

            {!loading &&
              !error &&
              properties.length > 0 && (

                <>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">


                    <div>

                      <p className="text-sm font-medium text-[#D3A72F]">
                        Your favourites
                      </p>

                      <h2 className="mt-1 text-2xl font-semibold text-[#082D52] md:text-3xl">
                        Saved Properties
                      </h2>

                    </div>


                    <p className="text-sm text-gray-500">

                      {properties.length}{" "}

                      {properties.length === 1
                        ? "property"
                        : "properties"}{" "}

                      saved

                    </p>


                  </div>


                  <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

                    {properties.map(
                      (property) => {


                        const badge =

                          property.listing_type ===
                          "sale"

                            ? "For Sale"

                            : property.listing_type ===
                              "letting"

                            ? "To Let"

                            : property.listing_type ===
                              "room"

                            ? "Room To Let"

                            : "Property";


                        const priceSuffix =

                          property.listing_type ===
                          "sale"

                            ? property.price_period

                            : property.price_period ||
                              "pcm";


                        return (

                          <PropertyCard

                            key={
                              property.id
                            }


                            propertyId={
                              property.id
                            }


                            onSavedChange={
                              handleSavedChange
                            }


                            image={
                              property.image ||
                              property.images?.[0]
                                ?.image_url ||
                              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                            }


                            badge={
                              badge
                            }


                            price={`£${Number(
                              property.price
                            ).toLocaleString(
                              "en-GB"
                            )}`}


                            priceSuffix={
                              priceSuffix
                            }


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


                            href={`/properties/${property.slug}`}

                          />

                        );

                      }
                    )}

                  </div>

                </>

              )}


            {/* ========================================
                EMPTY STATE
            ======================================== */}

            {!loading &&
              !error &&
              properties.length === 0 && (

                <div
                  className="
                    rounded-3xl
                    border
                    border-[#DCE8F0]
                    bg-white
                    px-6
                    py-16
                    text-center
                    shadow-sm
                  "
                >

                  <div
                    className="
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-[#EEF5FA]
                      text-[#082D52]
                    "
                  >

                    <Heart
                      size={30}
                    />

                  </div>


                  <h2 className="mt-6 text-2xl font-semibold text-[#082D52]">
                    No saved properties yet
                  </h2>


                  <p className="mx-auto mt-3 max-w-md leading-7 text-gray-500">
                    Save properties you like
                    by clicking the heart icon.
                    They will automatically
                    appear here.
                  </p>


                  <div className="mt-7 flex flex-wrap justify-center gap-3">


                    <Link
                      href="/buy"
                      className="
                        rounded-xl
                        bg-[#082D52]
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#0A3A68]
                      "
                    >
                      Buy
                    </Link>


                    <Link
                      href="/rent"
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
                        transition
                        hover:bg-[#F3F7FA]
                      "
                    >
                      Rent
                    </Link>


                    <Link
                      href="/rooms"
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
                        transition
                        hover:bg-[#F3F7FA]
                      "
                    >
                      Rooms
                    </Link>


                  </div>

                </div>

              )}


          </div>

        </section>


      </main>


      <Footer />

    </>
  );
}