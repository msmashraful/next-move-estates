import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  ArrowRight,
} from "lucide-react";


// ========================================
// SEO METADATA
// ========================================

export const metadata = {
  title: "Contact Next Move Estates London",

  description:
    "Contact Next Move Estates London Limited for property sales, lettings, room lets, landlord support, property management and property valuation enquiries.",

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact Next Move Estates London",
    description:
      "Contact our team about buying, selling, renting, letting or managing property in London and surrounding areas.",
    url: "/contact",
    type: "website",
  },
};


// ========================================
// CONTACT PAGE
// ========================================

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main>

        {/* ========================================
            HERO
        ======================================== */}

        <section className="bg-[#082D52]">

          <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8 lg:py-20">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D3A72F]">
              Contact Us
            </p>

            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-5xl">
              How can we help with your next move?
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Whether you are buying, selling,
              renting or letting a property,
              get in touch with our team.
            </p>

          </div>

        </section>


        {/* ========================================
            CONTACT SECTION
        ======================================== */}

        <section className="bg-[#F7FAFC] py-20">

          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">


            {/* ========================================
                LEFT SIDE
            ======================================== */}

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
                Get In Touch
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-[#082D52]">
                Speak with Next Move Estates
              </h2>

              <p className="mt-5 max-w-lg leading-8 text-gray-600">
                Send us a message and a member of
                our team will get back to you as
                soon as possible.
              </p>


              <div className="mt-9 space-y-4">

                <ContactItem
                  icon={Phone}
                  title="Call Us"
                  value="+44 (0) 7506 744382"
                  href="tel:+447506744382"
                />

                <ContactItem
                  icon={Mail}
                  title="Email Us"
                  value="info.nextmoveuk@gmail.com"
                  href="mailto:info.nextmoveuk@gmail.com"
                />

                <ContactItem
                  icon={MapPin}
                  title="Office"
                  value="83 Garron Lane, South Ockendon, RM15 5JQ, United Kingdom"
                />

                <ContactItem
                  icon={Clock3}
                  title="Enquiries"
                  value="Contact our team for assistance"
                />

              </div>


              {/* ========================================
                  VALUATION BOX
              ======================================== */}

              <div className="mt-8 rounded-2xl bg-[#082D52] p-6">

                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D3A72F]">
                  Property Owner?
                </p>

                <h3 className="mt-3 text-xl font-semibold text-white">
                  Looking for a property valuation?
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/70">
                  If you are thinking about selling
                  or letting your property, request
                  a free valuation instead.
                </p>

                <Link
                  href="/valuation"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D3A72F]"
                >
                  Book a Free Valuation

                  <ArrowRight size={16} />
                </Link>

              </div>

            </div>


            {/* ========================================
                FORM - CLIENT COMPONENT
            ======================================== */}

            <ContactForm />

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}


// ========================================
// CONTACT ITEM
// ========================================

function ContactItem({
  icon: Icon,
  title,
  value,
  href,
}) {

  const content = (
    <div className="flex items-start gap-4 rounded-2xl border border-[#DCE8F0] bg-white p-5">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF5FA] text-[#082D52]">

        <Icon size={20} />

      </div>

      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
          {title}
        </p>

        <p className="mt-1 break-words font-medium text-[#082D52]">
          {value}
        </p>

      </div>

    </div>
  );


  if (href) {
    return (
      <a
        href={href}
        className="block transition hover:-translate-y-0.5"
      >
        {content}
      </a>
    );
  }


  return content;
}