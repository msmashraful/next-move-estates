import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  KeyRound,
  House,
  Users,
  ClipboardCheck,
  ShieldCheck,
  Wrench,
  BadgePoundSterling,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";


export const metadata = {
  title: "Landlord Services in London",
  description:
    "Landlord services from Next Move Estates London, including lettings, tenant enquiries, rental valuations and property management.",
  alternates: {
    canonical: "/landlords",
  },
};


const services = [
  {
    icon: KeyRound,
    title: "Lettings",
    description:
      "From marketing your property to arranging viewings and helping you secure suitable tenants.",
    href: "/rent",
    linkText: "Explore Lettings",
  },

  {
    icon: House,
    title: "Property Management",
    description:
      "Ongoing support for landlords who want help managing their rental property and tenancy.",
    href: "/property-management",
    linkText: "Property Management",
  },

  {
    icon: BadgePoundSterling,
    title: "Rental Valuation",
    description:
      "Request a free rental valuation to understand your property's current rental potential.",
    href: "/valuation?type=let",
    linkText: "Book Free Valuation",
  },
];


const benefits = [
  {
    icon: Users,
    title: "Tenant Enquiries",
    description:
      "We handle enquiries and help coordinate suitable viewing opportunities.",
  },

  {
    icon: ClipboardCheck,
    title: "Organised Lettings",
    description:
      "A clear process from preparing the listing through to progressing the tenancy.",
  },

  {
    icon: ShieldCheck,
    title: "Landlord Support",
    description:
      "Practical support throughout the letting and management process.",
  },

  {
    icon: Wrench,
    title: "Property Management",
    description:
      "Ongoing assistance with the day-to-day management of your rental property.",
  },
];


const process = [
  {
    number: "01",
    title: "Rental Valuation",
    description:
      "We start by discussing your property and its potential rental value.",
  },

  {
    number: "02",
    title: "Prepare & Market",
    description:
      "We prepare the property information and market it to prospective tenants.",
  },

  {
    number: "03",
    title: "Enquiries & Viewings",
    description:
      "We manage tenant enquiries and coordinate property viewings.",
  },

  {
    number: "04",
    title: "Progress The Let",
    description:
      "Once a suitable applicant is identified, we help progress the letting process.",
  },

  {
    number: "05",
    title: "Ongoing Management",
    description:
      "Where property management is selected, our support continues throughout the tenancy.",
  },
];


export default function LandlordsPage() {
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
                Landlord Services
              </p>


              <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Let your property with confidence
              </h1>


              <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
                Whether you need help finding tenants or ongoing
                property management, Next Move Estates provides
                practical support throughout your letting journey.
              </p>


              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  href="/valuation?type=let"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#D3A72F] px-6 py-3.5 text-sm font-semibold text-[#082D52] transition hover:bg-[#E1B93E]"
                >
                  Get a Free Rental Valuation

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
                <KeyRound size={26} />
              </div>


              <h2 className="mt-6 text-2xl font-semibold text-white">
                Looking to let your property?
              </h2>


              <p className="mt-3 leading-7 text-white/70">
                Start with a rental valuation and discuss the
                right letting service for your property.
              </p>


              <div className="mt-7 space-y-4">

                <HeroFeature text="Free rental valuation" />

                <HeroFeature text="Property marketing" />

                <HeroFeature text="Tenant enquiry management" />

                <HeroFeature text="Ongoing management options" />

              </div>


              <Link
                href="/valuation?type=let"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#082D52] transition hover:bg-gray-100"
              >
                Request Rental Valuation

                <ArrowRight size={17} />
              </Link>

            </div>

          </div>

        </section>


        {/* ========================================
            LANDLORD SERVICES
        ======================================== */}

        <section className="bg-white py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                Our Services
              </p>


              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                Choose the support your property needs
              </h2>


              <p className="mt-5 text-lg leading-8 text-gray-600">
                From finding tenants to ongoing management, our
                landlord services are designed to make the letting
                process more straightforward.
              </p>

            </div>


            <div className="mt-12 grid gap-6 lg:grid-cols-3">

              {services.map((service) => {

                const Icon = service.icon;

                return (

                  <div
                    key={service.title}
                    className="flex flex-col rounded-2xl border border-[#DCE8F0] bg-white p-7 shadow-sm"
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
            WHY LANDLORDS CHOOSE US
        ======================================== */}

        <section className="bg-[#F7FAFC] py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="max-w-2xl">

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                Landlord Support
              </p>


              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                Helping you manage the letting journey
              </h2>


              <p className="mt-4 leading-7 text-gray-600">
                We help keep communication, enquiries and the
                letting process organised from the beginning.
              </p>

            </div>


            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              {benefits.map((item) => {

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
            PROCESS
        ======================================== */}

        <section className="bg-white py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="max-w-2xl">

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                How It Works
              </p>


              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                From valuation to tenancy
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
            MANAGEMENT CTA
        ======================================== */}

        <section className="bg-[#EEF5FA] py-20">

          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                Property Management
              </p>


              <h2 className="mt-4 text-3xl font-semibold text-[#082D52]">
                Need ongoing support after your property is let?
              </h2>


              <p className="mt-4 max-w-3xl leading-7 text-gray-600">
                Our property management service is designed for
                landlords who want ongoing assistance throughout
                the tenancy.
              </p>

            </div>


            <Link
              href="/property-management"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#082D52] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0A3A69]"
            >
              Property Management

              <ArrowRight size={17} />
            </Link>

          </div>

        </section>


        {/* ========================================
            FINAL CTA
        ======================================== */}

        <section className="bg-[#082D52] py-20">

          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">

            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
              Let Your Property
            </p>


            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Find out what your property could rent for
            </h2>


            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
              Request a free rental valuation and discuss your
              letting and property management options with our team.
            </p>


            <Link
              href="/valuation?type=let"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#D3A72F] px-7 py-4 text-sm font-semibold text-[#082D52] transition hover:bg-[#E1B93E]"
            >
              Get a Free Rental Valuation

              <ArrowRight size={17} />
            </Link>

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

function HeroFeature({ text }) {
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