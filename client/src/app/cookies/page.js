import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  Cookie,
  ShieldCheck,
  Settings,
  BarChart3,
  Megaphone,
  LockKeyhole,
  Building2,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";


export const metadata = {
  title: "Cookie Policy",
  description:
    "Read the Cookie Policy for the Next Move Estates London website.",
  alternates: {
    canonical: "/cookies",
  },
};


const companyDetails = {
  name: "NEXT MOVE ESTATES LONDON LIMITED",
  registrationNumber: "17394368",
  address: "83 Garron Lane, South Ockendon, RM15 5JQ, United Kingdom",
  phone: "07506 744382",
  phoneHref: "tel:+447506744382",
  email: "info.nextmoveuk@gmail.com",
};


const cookieTypes = [
  {
    icon: ShieldCheck,
    title: "Essential Cookies",
    content:
      "Essential cookies are required for important website functions such as security, navigation, form handling and maintaining basic website functionality. These cookies cannot normally be switched off through our website because the website may not function correctly without them.",
  },
  {
    icon: Settings,
    title: "Functional Cookies",
    content:
      "Functional cookies may be used to remember preferences or improve how certain parts of the website operate. If introduced, they may help provide a more convenient and personalised browsing experience.",
  },
  {
    icon: BarChart3,
    title: "Analytics Cookies",
    content:
      "Analytics cookies may be used to understand how visitors use our website, such as which pages are visited and how users navigate the site. We will update our cookie controls where required if non-essential analytics tools are introduced.",
  },
  {
    icon: Megaphone,
    title: "Marketing Cookies",
    content:
      "Marketing or advertising cookies may be used in the future if we introduce advertising, remarketing or social media tracking technologies. Where required, these cookies should only be used after obtaining appropriate consent.",
  },
];


export default function CookiesPage() {
  return (
    <>
      <Navbar />

      <main>

        {/* HERO */}
        <section className="bg-[#082D52]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

            <div className="max-w-3xl">

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D3A72F]">
                Legal Information
              </p>

              <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">
                Cookie Policy
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                This Cookie Policy explains how NEXT MOVE ESTATES
                LONDON LIMITED may use cookies and similar technologies
                on this website.
              </p>

            </div>

          </div>
        </section>


        {/* COMPANY DETAILS */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <div className="rounded-3xl border border-[#DCE8F0] bg-[#F7FAFC] p-7 sm:p-9">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#082D52] text-white">
                <Building2 size={27} />
              </div>

              <h2 className="mt-6 text-2xl font-semibold text-[#082D52]">
                About the Business
              </h2>

              <p className="mt-4 leading-8 text-gray-600">
                This website is operated by:
              </p>

              <div className="mt-6 space-y-5">

                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    Business Name
                  </p>

                  <p className="mt-1 font-semibold text-[#082D52]">
                    {companyDetails.name}
                  </p>
                </div>


                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    Company Registration Number
                  </p>

                  <p className="mt-1 font-semibold text-[#082D52]">
                    {companyDetails.registrationNumber}
                  </p>
                </div>


                <div className="flex items-start gap-3">

                  <MapPin
                    size={20}
                    className="mt-1 shrink-0 text-[#D3A72F]"
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Business Address
                    </p>

                    <p className="mt-1 leading-7 text-[#082D52]">
                      {companyDetails.address}
                    </p>
                  </div>

                </div>


                <div className="flex items-start gap-3">

                  <Phone
                    size={20}
                    className="mt-1 shrink-0 text-[#D3A72F]"
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Telephone
                    </p>

                    <a
                      href={companyDetails.phoneHref}
                      className="mt-1 inline-block font-medium text-[#082D52] transition hover:text-[#B58A1E]"
                    >
                      {companyDetails.phone}
                    </a>
                  </div>

                </div>


                <div className="flex items-start gap-3">

                  <Mail
                    size={20}
                    className="mt-1 shrink-0 text-[#D3A72F]"
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Email
                    </p>

                    <a
                      href={`mailto:${companyDetails.email}`}
                      className="mt-1 inline-block font-medium text-[#082D52] transition hover:text-[#B58A1E]"
                    >
                      {companyDetails.email}
                    </a>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* INTRO */}
        <section className="bg-[#F7FAFC] py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <div className="rounded-3xl border border-[#DCE8F0] bg-white p-7 shadow-sm sm:p-9">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#082D52] text-white">
                <Cookie size={27} />
              </div>

              <h2 className="mt-6 text-2xl font-semibold text-[#082D52]">
                What Are Cookies?
              </h2>

              <p className="mt-4 leading-8 text-gray-600">
                Cookies are small data files that may be stored on your
                computer, smartphone or other device when you visit a
                website.
              </p>

              <p className="mt-4 leading-8 text-gray-600">
                Cookies can help websites operate correctly, remember
                preferences, improve security and provide information
                about how visitors interact with a website.
              </p>

            </div>

          </div>
        </section>


        {/* COOKIE TYPES */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-3xl font-semibold text-[#082D52]">
              Types of Cookies
            </h2>

            <p className="mt-4 leading-8 text-gray-600">
              Depending on the technologies used on the website, cookies
              may fall into the following categories.
            </p>

            <div className="mt-8 space-y-6">

              {cookieTypes.map((item) => {

                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-[#DCE8F0] bg-white p-7 shadow-sm sm:p-9"
                  >

                    <div className="flex items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF5FA] text-[#082D52]">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-[#082D52]">
                          {item.title}
                        </h3>

                        <p className="mt-4 leading-8 text-gray-600">
                          {item.content}
                        </p>
                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>
        </section>


        {/* CURRENT WEBSITE USE */}
        <section className="bg-[#F7FAFC] py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Cookies Currently Used by Our Website
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              At present, our website may use cookies or similar
              technologies that are necessary for core website
              functionality, administration, security or technical
              operation.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              We may also use third-party technology providers for
              website hosting, image delivery, email communications
              or other technical services. Some of these providers may
              use their own technologies as part of delivering their
              services.
            </p>

            <div className="mt-7 rounded-2xl border border-[#DCE8F0] bg-white p-6">

              <p className="font-semibold text-[#082D52]">
                Important
              </p>

              <p className="mt-3 leading-7 text-gray-600">
                If we later introduce Google Analytics, Meta Pixel,
                advertising tools or other non-essential tracking
                technologies, this Cookie Policy and our cookie consent
                controls should be updated before those technologies
                are enabled where consent is required.
              </p>

            </div>

          </div>
        </section>


        {/* COOKIE DURATION */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Session and Persistent Cookies
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Some cookies may only remain on your device while you are
              using the website and are removed when the browser
              session ends. These are commonly called session cookies.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Other cookies may remain on your device for a defined
              period or until you remove them. These are commonly
              referred to as persistent cookies.
            </p>

          </div>
        </section>


        {/* THIRD PARTY */}
        <section className="bg-[#F7FAFC] py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Third-Party Cookies
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Some features or services used by our website may be
              provided by third parties. Those providers may place or
              access cookies or similar technologies in accordance
              with their own privacy and cookie policies.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              NEXT MOVE ESTATES LONDON LIMITED does not control the
              cookies used directly by independent third-party
              websites or services.
            </p>

          </div>
        </section>


        {/* MANAGING COOKIES */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Managing Cookies
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Most web browsers allow you to view, block or delete
              cookies through browser settings.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Blocking certain cookies may affect the functionality
              or performance of some websites.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              If our website introduces a cookie preference or consent
              tool in the future, you may also be able to manage
              non-essential cookie preferences through that tool.
            </p>

          </div>
        </section>


        {/* PRIVACY */}
        <section className="bg-[#F7FAFC] py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#082D52] text-white">
              <LockKeyhole size={22} />
            </div>

            <h2 className="mt-5 text-2xl font-semibold text-[#082D52]">
              Personal Information
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Where information collected through cookies or similar
              technologies relates to an identifiable individual, it
              will be handled in accordance with our Privacy Policy.
            </p>

            <Link
              href="/privacy"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-[#B58A1E] transition hover:text-[#082D52]"
            >
              Read our Privacy Policy

              <ArrowRight size={17} />
            </Link>

          </div>
        </section>


        {/* CHANGES */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Changes to This Cookie Policy
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              We may update this Cookie Policy from time to time to
              reflect changes to our website, technology, services or
              applicable requirements.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              The latest version will be published on this page.
            </p>

            <p className="mt-5 text-sm font-medium text-gray-500">
              Last updated: 10 September 2026
            </p>

          </div>
        </section>


        {/* CONTACT CTA */}
        <section className="bg-[#082D52] py-20">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">

            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
              Cookie Questions
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Have a question about our use of cookies?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
              Contact NEXT MOVE ESTATES LONDON LIMITED if you have
              questions about this Cookie Policy or our website.
            </p>


            <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-6 text-left sm:p-8">

              <p className="font-semibold text-white">
                {companyDetails.name}
              </p>

              <p className="mt-3 text-sm leading-7 text-white/70">
                Company Registration No:{" "}
                {companyDetails.registrationNumber}
              </p>

              <p className="mt-1 text-sm leading-7 text-white/70">
                {companyDetails.address}
              </p>

              <p className="mt-1 text-sm leading-7 text-white/70">
                Telephone:{" "}
                <a
                  href={companyDetails.phoneHref}
                  className="text-white transition hover:text-[#D3A72F]"
                >
                  {companyDetails.phone}
                </a>
              </p>

              <p className="mt-1 text-sm leading-7 text-white/70">
                Email:{" "}
                <a
                  href={`mailto:${companyDetails.email}`}
                  className="text-white transition hover:text-[#D3A72F]"
                >
                  {companyDetails.email}
                </a>
              </p>

            </div>


            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#D3A72F] px-7 py-4 text-sm font-semibold text-[#082D52] transition hover:bg-[#E1B93E]"
              >
                Contact Our Team

                <ArrowRight size={17} />
              </Link>


              <a
                href={`mailto:${companyDetails.email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Mail size={17} />

                Email Us
              </a>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}