import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  BadgePoundSterling,
  Camera,
  Megaphone,
  Users,
  House,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";


export const metadata = {
  title: "Sell Your Property in London",
  description:
    "Sell your property with Next Move Estates London. Get professional support, property marketing and a free sales valuation.",
  alternates: {
    canonical: "/sell",
  },
};

const benefits = [
  {
    icon: BadgePoundSterling,
    title: "Accurate Valuation",
    description:
      "We assess your property using local market knowledge and comparable sales to recommend a realistic asking price.",
  },

  {
    icon: Camera,
    title: "Professional Marketing",
    description:
      "Your property is presented with strong photography, clear descriptions and attractive marketing materials.",
  },

  {
    icon: Megaphone,
    title: "Maximum Exposure",
    description:
      "We market your property to active buyers through our website, enquiries database and selected advertising channels.",
  },

  {
    icon: Users,
    title: "Dedicated Support",
    description:
      "Our team supports you throughout viewings, offers, negotiations and the sales progression process.",
  },
];


const steps = [
  {
    number: "01",
    title: "Book Your Valuation",
    description:
      "Tell us about your property and arrange a free valuation with our team.",
  },

  {
    number: "02",
    title: "Prepare Your Property",
    description:
      "We help prepare the listing, photographs, property details and marketing strategy.",
  },

  {
    number: "03",
    title: "Launch To Market",
    description:
      "Your property is advertised and introduced to suitable prospective buyers.",
  },

  {
    number: "04",
    title: "Viewings & Offers",
    description:
      "We coordinate viewings, gather feedback and negotiate offers on your behalf.",
  },

  {
    number: "05",
    title: "Progress The Sale",
    description:
      "Once an offer is accepted, we stay involved through the sales process until completion.",
  },
];


export default function SellPage() {
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
                Sell With Next Move Estates
              </p>

              <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Thinking of selling your property?
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
                From your first valuation to
                completion, our team helps you
                market your property effectively,
                attract serious buyers and move
                forward with confidence.
              </p>


              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  href="/valuation?type=sell"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-[#D3A72F]
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-[#082D52]
                    transition
                    hover:bg-[#E2B83D]
                  "
                >
                  Book a Free Valuation

                  <ArrowRight size={17} />
                </Link>


                <Link
                  href="/contact"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/30
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-white/10
                  "
                >
                  Speak To Our Team
                </Link>

              </div>

            </div>


            {/* HERO CARD */}

            <div className="rounded-3xl border border-white/10 bg-white/10 p-7 backdrop-blur-sm sm:p-9">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D3A72F] text-[#082D52]">
                <House size={26} />
              </div>

              <h2 className="mt-6 text-2xl font-semibold text-white">
                Start with a free valuation
              </h2>

              <p className="mt-3 leading-7 text-white/70">
                Understanding the current market
                value of your property is the first
                step towards making the right
                selling decision.
              </p>


              <div className="mt-7 space-y-4">

                <FeatureText text="No obligation valuation" />

                <FeatureText text="Local market guidance" />

                <FeatureText text="Sales strategy discussion" />

                <FeatureText text="Clear next steps" />

              </div>


              <Link
                href="/valuation"
                className="
                  mt-8
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  py-3.5
                  text-sm
                  font-semibold
                  text-[#082D52]
                  transition
                  hover:bg-gray-100
                "
              >
                Request Your Valuation

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
                Selling Your Property
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                A straightforward approach to selling
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Selling a home involves more than
                simply putting it online. Pricing,
                presentation, marketing, viewings
                and negotiation all influence the
                final result.
              </p>

            </div>

          </div>

        </section>


        {/* ========================================
            WHY CHOOSE US
        ======================================== */}

        <section className="bg-[#F7FAFC] py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="max-w-2xl">

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                Why Next Move Estates
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                Support at every stage
              </h2>

            </div>


            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              {benefits.map((item) => {

                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="
                      rounded-2xl
                      border
                      border-[#DCE8F0]
                      bg-white
                      p-6
                      shadow-sm
                    "
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
            SELLING PROCESS
        ======================================== */}

        <section className="bg-white py-20">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="max-w-2xl">

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                Our Process
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                Your selling journey
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                We keep the process organised and
                help you understand what happens
                at each stage.
              </p>

            </div>


            <div className="mt-12 space-y-4">

              {steps.map((step) => (

                <div
                  key={step.number}
                  className="
                    grid
                    gap-5
                    rounded-2xl
                    border
                    border-[#DCE8F0]
                    bg-white
                    p-6
                    shadow-sm
                    md:grid-cols-[90px_1fr]
                    md:items-center
                  "
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
            MARKETING SECTION
        ======================================== */}

        <section className="bg-[#EEF5FA] py-20">

          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-8">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                Property Marketing
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-[#082D52] sm:text-4xl">
                Present your property at its best
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                Good presentation helps buyers
                understand the value and potential
                of your property before they even
                arrange a viewing.
              </p>

            </div>


            <div className="rounded-3xl bg-white p-7 shadow-sm sm:p-9">

              <div className="space-y-5">

                <FeatureRow
                  text="Strong property photography"
                />

                <FeatureRow
                  text="Clear property descriptions"
                />

                <FeatureRow
                  text="Buyer enquiry management"
                />

                <FeatureRow
                  text="Viewings coordination"
                />

                <FeatureRow
                  text="Offer negotiation support"
                />

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
              Ready To Make Your Next Move?
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Find out what your property could be worth
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
              Request a free property valuation
              and speak with our team about your
              selling options.
            </p>


            <Link
              href="/valuation"
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-[#D3A72F]
                px-7
                py-4
                text-sm
                font-semibold
                text-[#082D52]
                transition
                hover:bg-[#E1B93E]
              "
            >
              Book a Free Valuation

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

function FeatureText({
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


// ========================================
// MARKETING FEATURE
// ========================================

function FeatureRow({
  text,
}) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF5FA]">

        <CheckCircle2
          size={18}
          className="text-[#D3A72F]"
        />

      </div>

      <p className="font-medium text-[#082D52]">
        {text}
      </p>

    </div>
  );
}