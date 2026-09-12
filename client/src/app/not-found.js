import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  House,
  Search,
  Building2,
} from "lucide-react";


export const metadata = {
  title: "Page Not Found | Next Move Estates London Limited",
  description:
    "The page you are looking for could not be found. Return to Next Move Estates London Limited.",
};


export default function NotFound() {
  return (
    <>
      <Navbar />

      <main>

        <section className="bg-[#F7FAFC]">

          <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 py-20 lg:px-8">

            <div className="w-full max-w-3xl text-center">

              {/* ICON */}

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#EEF5FA] text-[#082D52]">
                <Building2 size={36} />
              </div>


              {/* ERROR LABEL */}

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#D3A72F]">
                Error 404
              </p>


              {/* TITLE */}

              <h1 className="mt-4 text-5xl font-bold text-[#082D52] sm:text-6xl">
                Page Not Found
              </h1>


              {/* DESCRIPTION */}

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                Sorry, the page you are looking for may have been moved,
                removed, or the address may be incorrect.
              </p>


              {/* MAIN BUTTONS */}

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#082D52] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#0A3A69]"
                >
                  <House size={18} />

                  Back To Home
                </Link>


                <Link
                  href="/buy"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D3A72F] px-7 py-4 text-sm font-semibold text-[#082D52] transition hover:bg-[#E1B93E]"
                >
                  <Search size={18} />

                  View Properties
                </Link>

              </div>


              {/* QUICK LINKS */}

              <div className="mt-12 border-t border-[#DCE8F0] pt-8">

                <p className="text-sm text-gray-500">
                  You may also be looking for:
                </p>


                <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold">

                  <Link
                    href="/rent"
                    className="text-[#082D52] transition hover:text-[#B58A1E]"
                  >
                    Rent
                  </Link>


                  <Link
                    href="/rooms"
                    className="text-[#082D52] transition hover:text-[#B58A1E]"
                  >
                    Rooms
                  </Link>


                  <Link
                    href="/sell"
                    className="text-[#082D52] transition hover:text-[#B58A1E]"
                  >
                    Sell
                  </Link>


                  <Link
                    href="/landlords"
                    className="text-[#082D52] transition hover:text-[#B58A1E]"
                  >
                    Landlords
                  </Link>


                  <Link
                    href="/property-management"
                    className="text-[#082D52] transition hover:text-[#B58A1E]"
                  >
                    Property Management
                  </Link>


                  <Link
                    href="/about"
                    className="text-[#082D52] transition hover:text-[#B58A1E]"
                  >
                    About
                  </Link>


                  <Link
                    href="/valuation"
                    className="text-[#082D52] transition hover:text-[#B58A1E]"
                  >
                    Free Valuation
                  </Link>


                  <Link
                    href="/contact"
                    className="text-[#082D52] transition hover:text-[#B58A1E]"
                  >
                    Contact
                  </Link>

                </div>

              </div>


              {/* COMPANY INFO */}

              <div className="mt-10 rounded-2xl border border-[#DCE8F0] bg-white p-6 shadow-sm">

                <p className="text-sm font-semibold text-[#082D52]">
                  NEXT MOVE ESTATES LONDON LIMITED
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  83 Garron Lane, South Ockendon, RM15 5JQ, United Kingdom
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Company Registration No: 17394368
                </p>

                <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">

                  <a
                    href="tel:+447506744382"
                    className="font-medium text-[#082D52] transition hover:text-[#B58A1E]"
                  >
                    07506 744382
                  </a>


                  <a
                    href="mailto:info.nextmoveuk@gmail.com"
                    className="font-medium text-[#082D52] transition hover:text-[#B58A1E]"
                  >
                    info.nextmoveuk@gmail.com
                  </a>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}