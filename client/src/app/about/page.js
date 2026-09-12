import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  House,
  KeyRound,
  Building2,
  Wrench,
  MessageSquareText,
  MapPin,
  Users,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  BadgePoundSterling,
} from "lucide-react";


export const metadata = {
  title: "About Us",
  description:
    "Learn about Next Move Estates London Limited and our approach to property sales, lettings, room lets and property management.",
  alternates: {
    canonical: "/about",
  },
};


const services = [
  {
    icon: House,
    title: "Property Sales",
    description:
      "Supporting property owners and buyers throughout the sales journey with clear communication and practical guidance.",
    href: "/buy",
    linkText: "View Properties",
  },

  {
    icon: KeyRound,
    title: "Lettings",
    description:
      "Helping landlords market their properties and helping tenants find suitable homes to rent.",
    href: "/rent",
    linkText: "Explore Lettings",
  },

  {
    icon: Users,
    title: "Room Let",
    description:
      "Helping people find suitable rooms while supporting landlords with room letting opportunities.",
    href: "/rooms",
    linkText: "View Rooms",
  },

  {
    icon: Wrench,
    title: "Property Management",
    description:
      "Ongoing support for landlords with tenant communication, maintenance coordination and tenancy administration.",
    href: "/property-management",
    linkText: "Property Management",
  },
];


const approachItems = [
  {
    icon: MessageSquareText,
    title: "Clear Communication",
    description:
      "We believe property decisions are easier when communication is clear, responsive and straightforward.",
  },

  {
    icon: MapPin,
    title: "Property Knowledge",
    description:
      "We focus on understanding properties, local demand and the individual requirements of our clients.",
  },

  {
    icon: Users,
    title: "Personal Service",
    description:
      "Every client and property is different, so we aim to provide a service suited to individual circumstances.",
  },

  {
    icon: ShieldCheck,
    title: "Professional Support",
    description:
      "Our goal is to keep each stage organised and provide dependable support throughout the property journey.",
  },
];


const clientTypes = [
  {
    title: "Buyers",
    description:
      "Explore available properties and contact our team to arrange a viewing or discuss your requirements.",
    href: "/buy",
    button: "Properties For Sale",
  },

  {
    title: "Tenants",
    description:
      "Search rental properties and rooms and speak with our team about your next move.",
    href: "/rent",
    button: "Properties To Rent",
  },

  {
    title: "Sellers",
    description:
      "Thinking about selling? Start by requesting a free sales valuation for your property.",
    href: "/valuation?type=sell",
    button: "Sales Valuation",
  },

  {
    title: "Landlords",
    description:
      "From finding tenants to ongoing management, explore support designed for rental property owners.",
    href: "/landlords",
    button: "Landlord Services",
  },
];


const reasons = [
  "Support for buyers, tenants, sellers and landlords",
  "Sales, lettings, room let and property management",
  "Straightforward property enquiries and viewing requests",
  "Free sales and rental valuation requests",
  "Clear and professional communication",
  "Personal approach to property services",
];


export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>

        {/* ========================================
            HERO
        ======================================== */}

        <section className="bg-[#082D52]">

          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

            <div className="max-w-4xl">

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D3A72F]">
                About Next Move Estates
              </p>


              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Helping you make your
                next property move
              </h1>


              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                Next Move Estates provides property
                services for buyers, tenants, sellers
                and landlords, with a focus on clear
                communication and practical support.
              </p>


              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#D3A72F] px-6 py-3.5 text-sm font-semibold text-[#082D52] transition hover:bg-[#E1B93E]"
                >
                  Speak To Our Team

                  <ArrowRight size={17} />
                </Link>


                <Link
                  href="/valuation"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Free Property Valuation
                </Link>

              </div>

            </div>

          </div>

        </section>


        {/* ========================================
            WHO WE ARE
        ======================================== */}

        <section className="bg-white py-20">

          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-8">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                Who We Are
              </p>


              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#082D52] sm:text-4xl">
                A straightforward approach
                to property
              </h2>


              <p className="mt-6 leading-8 text-gray-600">
                Next Move Estates is focused on
                helping clients navigate their
                property journey with a clear,
                organised and personal approach.
              </p>


              <p className="mt-4 leading-8 text-gray-600">
                Whether you are looking for your
                next home, searching for a rental
                property, preparing to sell, or
                looking for support as a landlord,
                our aim is to make the process as
                straightforward as possible.
              </p>


              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#B58A1E] transition hover:text-[#082D52]"
              >
                Contact Next Move Estates

                <ArrowRight size={16} />
              </Link>

            </div>


            {/* INFO CARD */}

            <div className="rounded-3xl bg-[#F7FAFC] p-7 sm:p-10">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#082D52] text-white">
                <Building2 size={27} />
              </div>


              <h3 className="mt-6 text-2xl font-semibold text-[#082D52]">
                Next Move Estates London
              </h3>


              <p className="mt-4 leading-8 text-gray-600">
                Bringing property sales, lettings,
                room lets, landlord services and
                property management together under
                one professional property service.
              </p>


              <div className="mt-7 border-t border-[#DCE8F0] pt-7">

                <div className="flex items-start gap-3">

                  <MapPin
                    size={21}
                    className="mt-1 shrink-0 text-[#D3A72F]"
                  />

                  <div>

                    <p className="font-semibold text-[#082D52]">
                      Serving London
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Property services for clients
                      looking to buy, rent, sell or
                      let their property.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ========================================
            WHAT WE DO
        ======================================== */}

        <section className="bg-[#F7FAFC] py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                What We Do
              </p>


              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                Property services for every
                stage of your journey
              </h2>


              <p className="mt-5 text-lg leading-8 text-gray-600">
                From finding a property to
                marketing and managing one, our
                services are designed around the
                needs of property owners and movers.
              </p>

            </div>


            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              {services.map((service) => {

                const Icon = service.icon;

                return (

                  <div
                    key={service.title}
                    className="flex flex-col rounded-2xl border border-[#DCE8F0] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF5FA] text-[#082D52]">
                      <Icon size={23} />
                    </div>


                    <h3 className="mt-5 text-xl font-semibold text-[#082D52]">
                      {service.title}
                    </h3>


                    <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">
                      {service.description}
                    </p>


                    <Link
                      href={service.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#B58A1E] transition hover:text-[#082D52]"
                    >
                      {service.linkText}

                      <ArrowRight size={16} />
                    </Link>

                  </div>

                );
              })}

            </div>

          </div>

        </section>


        {/* ========================================
            OUR APPROACH
        ======================================== */}

        <section className="bg-white py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="max-w-3xl">

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                Our Approach
              </p>


              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                Property service built around
                clear communication
              </h2>


              <p className="mt-5 max-w-2xl leading-8 text-gray-600">
                We aim to keep property decisions
                understandable and communication
                organised throughout the process.
              </p>

            </div>


            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              {approachItems.map((item) => {

                const Icon = item.icon;

                return (

                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#DCE8F0] p-6"
                  >

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#082D52] text-white">
                      <Icon size={22} />
                    </div>


                    <h3 className="mt-5 text-lg font-semibold text-[#082D52]">
                      {item.title}
                    </h3>


                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      {item.description}
                    </p>

                  </div>

                );
              })}

            </div>

          </div>

        </section>


        {/* ========================================
            WHO WE HELP
        ======================================== */}

        <section className="bg-[#EEF5FA] py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                Who We Help
              </p>


              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                Whatever your next move,
                we're here to help
              </h2>

            </div>


            <div className="mt-12 grid gap-6 md:grid-cols-2">

              {clientTypes.map((item) => (

                <div
                  key={item.title}
                  className="rounded-2xl bg-white p-7 shadow-sm sm:p-8"
                >

                  <h3 className="text-2xl font-semibold text-[#082D52]">
                    {item.title}
                  </h3>


                  <p className="mt-3 leading-7 text-gray-600">
                    {item.description}
                  </p>


                  <Link
                    href={item.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#B58A1E] transition hover:text-[#082D52]"
                  >
                    {item.button}

                    <ArrowRight size={16} />
                  </Link>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* ========================================
            WHY CHOOSE US
        ======================================== */}

        <section className="bg-white py-20">

          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-8">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                Why Next Move Estates
              </p>


              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                One place for your
                property requirements
              </h2>


              <p className="mt-5 max-w-xl leading-8 text-gray-600">
                Our range of services means you
                can speak with one team whether
                you are moving home, letting a
                property or looking for ongoing
                management support.
              </p>


              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#082D52] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0A3A69]"
              >
                Talk To Our Team

                <ArrowRight size={17} />
              </Link>

            </div>


            <div className="rounded-3xl border border-[#DCE8F0] bg-[#F7FAFC] p-7 sm:p-9">

              <div className="space-y-5">

                {reasons.map((reason) => (

                  <div
                    key={reason}
                    className="flex items-start gap-4"
                  >

                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">

                      <CheckCircle2
                        size={17}
                        className="text-[#D3A72F]"
                      />

                    </div>


                    <p className="font-medium leading-7 text-[#082D52]">
                      {reason}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </section>


        {/* ========================================
            VALUATION SECTION
        ======================================== */}

        <section className="bg-[#F7FAFC] py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#082D52] text-white">
                <BadgePoundSterling size={26} />
              </div>


              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                Free Property Valuation
              </p>


              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                Thinking about selling or
                letting your property?
              </h2>


              <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
                Request a free property valuation
                and tell us whether you're
                considering selling or letting.
              </p>


              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

                {/* SALES VALUATION */}

                <Link
                  href="/valuation?type=sell"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#082D52] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#0A3A69]"
                >
                  Sales Valuation

                  <ArrowRight size={17} />
                </Link>


                {/* RENTAL VALUATION */}

                <Link
                  href="/valuation?type=let"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D3A72F] px-7 py-4 text-sm font-semibold text-[#082D52] transition hover:bg-[#E1B93E]"
                >
                  Rental Valuation

                  <ArrowRight size={17} />
                </Link>

              </div>

            </div>

          </div>

        </section>


        {/* ========================================
            FINAL CTA
        ======================================== */}

        <section className="bg-[#082D52] py-20">

          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">

            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
              Your Next Move
            </p>


            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Ready to discuss your
              property requirements?
            </h2>


            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
              Contact Next Move Estates and tell
              us how we can help with your next
              property move.
            </p>


            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#D3A72F] px-7 py-4 text-sm font-semibold text-[#082D52] transition hover:bg-[#E1B93E]"
              >
                Contact Our Team

                <ArrowRight size={17} />
              </Link>


              <Link
                href="/buy"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Properties
              </Link>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}