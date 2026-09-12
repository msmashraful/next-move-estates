import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  House,
  Wrench,
  ShieldCheck,
  ClipboardCheck,
  MessageSquareText,
  KeyRound,
  BadgePoundSterling,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";


export const metadata = {
  title: "Property Management Services in London",
  description:
    "Professional property management services for landlords in London and surrounding areas from Next Move Estates London.",
  alternates: {
    canonical: "/property-management",
  },
};


const services = [
  {
    icon: MessageSquareText,
    title: "Tenant Communication",
    description:
      "We help manage day-to-day communication with tenants throughout the tenancy.",
  },

  {
    icon: Wrench,
    title: "Maintenance Support",
    description:
      "We help coordinate reported maintenance issues and keep landlords informed.",
  },

  {
    icon: ClipboardCheck,
    title: "Tenancy Administration",
    description:
      "Support with the ongoing administration and organisation of your managed tenancy.",
  },

  {
    icon: ShieldCheck,
    title: "Property Oversight",
    description:
      "We provide ongoing support to help landlords stay informed about their rental property.",
  },
];


const process = [
  {
    number: "01",
    title: "Discuss Your Property",
    description:
      "Tell us about your property, current tenancy situation and the level of support you need.",
  },

  {
    number: "02",
    title: "Choose The Right Service",
    description:
      "We discuss the management service that best suits your property and circumstances.",
  },

  {
    number: "03",
    title: "Property Handover",
    description:
      "Once instructed, we organise the information required to begin managing the property.",
  },

  {
    number: "04",
    title: "Ongoing Management",
    description:
      "We provide day-to-day support throughout the tenancy and keep communication organised.",
  },
];


const includedItems = [
  "Tenant communication support",
  "Maintenance coordination",
  "Tenancy administration",
  "Landlord updates",
  "Property management support",
  "Issue reporting and follow-up",
];


export default function PropertyManagementPage() {
  return (
    <>
      <Navbar />

      <main>

        {/* ========================================
            HERO
        ======================================== */}

        <section className="bg-[#082D52]">

          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D3A72F]">
                Property Management
              </p>


              <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                More support. Less day-to-day hassle.
              </h1>


              <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
                Our property management service is
                designed for landlords who want
                reliable ongoing support throughout
                the tenancy.
              </p>


              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  href="/valuation?type=let"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#D3A72F] px-6 py-3.5 text-sm font-semibold text-[#082D52] transition hover:bg-[#E1B93E]"
                >
                  Get a Rental Valuation

                  <ArrowRight size={17} />
                </Link>


                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Speak To Our Team
                </Link>

              </div>

            </div>


            {/* HERO CARD */}

            <div className="rounded-3xl border border-white/10 bg-white/10 p-7 backdrop-blur-sm sm:p-9">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D3A72F] text-[#082D52]">
                <House size={27} />
              </div>


              <h2 className="mt-6 text-2xl font-semibold text-white">
                Managed property service
              </h2>


              <p className="mt-3 leading-7 text-white/70">
                Let us help with the day-to-day
                administration and communication
                involved in managing your rental
                property.
              </p>


              <div className="mt-7 space-y-4">

                <HeroFeature
                  text="Tenant communication"
                />

                <HeroFeature
                  text="Maintenance coordination"
                />

                <HeroFeature
                  text="Landlord updates"
                />

                <HeroFeature
                  text="Ongoing tenancy support"
                />

              </div>


              <Link
                href="/contact"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#082D52] transition hover:bg-gray-100"
              >
                Discuss Property Management

                <ArrowRight size={17} />
              </Link>

            </div>

          </div>

        </section>


        {/* ========================================
            INTRO
        ======================================== */}

        <section className="bg-white py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                For Landlords
              </p>


              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                Property management built around your needs
              </h2>


              <p className="mt-5 text-lg leading-8 text-gray-600">
                Managing a rental property involves
                ongoing communication, organisation
                and responding to issues throughout
                the tenancy. Our service helps keep
                those responsibilities more manageable.
              </p>

            </div>

          </div>

        </section>


        {/* ========================================
            SERVICES
        ======================================== */}

        <section className="bg-[#F7FAFC] py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="max-w-2xl">

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                Management Support
              </p>


              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                Supporting you throughout the tenancy
              </h2>

            </div>


            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              {services.map((item) => {

                const Icon = item.icon;

                return (

                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#DCE8F0] bg-white p-6 shadow-sm"
                  >

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF5FA] text-[#082D52]">

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
            WHAT'S INCLUDED
        ======================================== */}

        <section className="bg-white py-20">

          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-8">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                What's Included
              </p>


              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                Ongoing landlord support
              </h2>


              <p className="mt-5 leading-8 text-gray-600">
                Our management service helps landlords
                stay organised while providing a clear
                point of contact throughout the tenancy.
              </p>


              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#B58A1E] transition hover:text-[#082D52]"
              >
                Talk About Your Property

                <ArrowRight size={16} />
              </Link>

            </div>


            <div className="rounded-3xl border border-[#DCE8F0] bg-[#F7FAFC] p-7 sm:p-9">

              <div className="grid gap-5 sm:grid-cols-2">

                {includedItems.map((item) => (

                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >

                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">

                      <CheckCircle2
                        size={17}
                        className="text-[#D3A72F]"
                      />

                    </div>


                    <p className="text-sm font-medium leading-6 text-[#082D52]">
                      {item}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </section>


        {/* ========================================
            PROCESS
        ======================================== */}

        <section className="bg-[#EEF5FA] py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="max-w-2xl">

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                How It Works
              </p>


              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                Getting started is straightforward
              </h2>

            </div>


            <div className="mt-12 space-y-4">

              {process.map((step) => (

                <div
                  key={step.number}
                  className="grid gap-5 rounded-2xl border border-[#DCE8F0] bg-white p-6 shadow-sm md:grid-cols-[90px_1fr] md:items-center"
                >

                  <div className="text-3xl font-bold text-[#D3A72F]">
                    {step.number}
                  </div>


                  <div>

                    <h3 className="text-lg font-semibold text-[#082D52]">
                      {step.title}
                    </h3>


                    <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600">
                      {step.description}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* ========================================
            LANDLORD OPTIONS
        ======================================== */}

        <section className="bg-white py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="grid gap-6 lg:grid-cols-2">

              {/* LANDLORD SERVICES */}

              <div className="rounded-3xl border border-[#DCE8F0] bg-white p-8 shadow-sm">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF5FA] text-[#082D52]">
                  <KeyRound size={23} />
                </div>


                <h3 className="mt-5 text-2xl font-semibold text-[#082D52]">
                  Need help finding a tenant?
                </h3>


                <p className="mt-3 leading-7 text-gray-600">
                  Explore our landlord and letting
                  services if your property is not
                  currently occupied.
                </p>


                <Link
                  href="/landlords"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#B58A1E]"
                >
                  Landlord Services

                  <ArrowRight size={16} />
                </Link>

              </div>


              {/* RENTAL VALUATION */}

              <div className="rounded-3xl border border-[#DCE8F0] bg-white p-8 shadow-sm">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF5FA] text-[#082D52]">
                  <BadgePoundSterling size={23} />
                </div>


                <h3 className="mt-5 text-2xl font-semibold text-[#082D52]">
                  What could your property rent for?
                </h3>


                <p className="mt-3 leading-7 text-gray-600">
                  Request a free rental valuation
                  before deciding how you would like
                  to let or manage your property.
                </p>


                <Link
                  href="/valuation?type=let"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#B58A1E]"
                >
                  Free Rental Valuation

                  <ArrowRight size={16} />
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
              Property Management
            </p>


            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Looking for help managing your rental property?
            </h2>


            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
              Speak with Next Move Estates about
              your property and the level of
              management support you need.
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
                href="/valuation?type=let"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Rental Valuation
              </Link>

            </div>

          </div>

        </section>

      </main>

      <Footer />

    </>
  );
}


// ========================================
// HERO FEATURE
// ========================================

function HeroFeature({
  text,
}) {
  return (

    <div className="flex items-center gap-3 text-sm text-white/80">

      <CheckCircle2
        size={18}
        className="shrink-0 text-[#D3A72F]"
      />

      <span>
        {text}
      </span>

    </div>

  );
}