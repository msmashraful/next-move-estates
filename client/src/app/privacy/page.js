import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  ShieldCheck,
  Database,
  Mail,
  LockKeyhole,
  Cookie,
  UserRoundCheck,
  Building2,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";


export const metadata = {
  title: "Privacy Policy",
  description:
    "Read the Privacy Policy for Next Move Estates London Limited.",
  alternates: {
    canonical: "/privacy",
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


const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "When you contact us, request a property valuation, submit a property enquiry or use one of our website forms, we may collect personal information such as your name, email address, telephone number and information relating to your property or enquiry.",

      "Depending on the service you request, we may also collect details such as a property address, postcode, property type, number of bedrooms, viewing preferences and any message or additional information you choose to provide.",

      "We may also receive technical information about how our website is accessed, including browser, device and basic usage information where this is collected by our hosting, security or website service providers.",
    ],
  },

  {
    icon: UserRoundCheck,
    title: "How We Use Your Information",
    content: [
      "We use the personal information you provide to respond to enquiries, arrange property-related communication, process valuation requests and discuss our sales, lettings, room let, landlord and property management services.",

      "We may also use information where reasonably necessary to operate, maintain, secure and improve our website and business services.",

      "Where appropriate, personal information may also be used to maintain business records and comply with applicable legal or regulatory obligations.",
    ],
  },

  {
    icon: Mail,
    title: "Email and Telephone Communications",
    content: [
      "If you submit an enquiry or valuation request, we may contact you by email or telephone regarding the request or service you have asked about.",

      "We may also send an acknowledgement or confirmation email after you submit certain website forms.",

      "We will not use information submitted through an enquiry for unrelated marketing unless we have an appropriate lawful basis or your consent where required.",
    ],
  },

  {
    icon: LockKeyhole,
    title: "How We Protect Your Information",
    content: [
      "We take reasonable technical and organisational steps to protect personal information against unauthorised access, loss, misuse, alteration or disclosure.",

      "Administrative areas of our website are restricted and access controls are used to help protect information managed through our systems.",

      "Although we take reasonable precautions, no website, server or online service can guarantee absolute security.",
    ],
  },

  {
    icon: Cookie,
    title: "Cookies and Similar Technologies",
    content: [
      "Our website may use essential cookies or similar technologies that are necessary for website functionality, performance and security.",

      "If we introduce non-essential analytics, advertising or marketing cookies in the future, appropriate cookie information and consent controls should be provided where required.",
    ],
  },
];


export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main>

        {/* ========================================
            HERO
        ======================================== */}

        <section className="bg-[#082D52]">

          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

            <div className="max-w-3xl">

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D3A72F]">
                Legal Information
              </p>


              <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">
                Privacy Policy
              </h1>


              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                This Privacy Policy explains how NEXT MOVE ESTATES
                LONDON LIMITED collects, uses, stores and protects
                personal information submitted through our website
                and property services.
              </p>

            </div>

          </div>

        </section>


        {/* ========================================
            COMPANY DETAILS
        ======================================== */}

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


        {/* ========================================
            INTRODUCTION
        ======================================== */}

        <section className="bg-[#F7FAFC] py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <div className="rounded-3xl border border-[#DCE8F0] bg-white p-7 shadow-sm sm:p-9">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#082D52] text-white">
                <ShieldCheck size={27} />
              </div>


              <h2 className="mt-6 text-2xl font-semibold text-[#082D52]">
                Our Commitment to Privacy
              </h2>


              <p className="mt-4 leading-8 text-gray-600">
                NEXT MOVE ESTATES LONDON LIMITED respects the privacy
                of website visitors, buyers, tenants, sellers,
                landlords and other individuals who contact us.
              </p>


              <p className="mt-4 leading-8 text-gray-600">
                This policy explains what personal information we may
                collect, how that information may be used and the
                choices available to you regarding your personal data.
              </p>

            </div>

          </div>

        </section>


        {/* ========================================
            MAIN POLICY SECTIONS
        ======================================== */}

        <section className="bg-white py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <div className="space-y-6">

              {sections.map((section) => {

                const Icon = section.icon;

                return (

                  <div
                    key={section.title}
                    className="rounded-3xl border border-[#DCE8F0] bg-white p-7 shadow-sm sm:p-9"
                  >

                    <div className="flex items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF5FA] text-[#082D52]">
                        <Icon size={22} />
                      </div>


                      <div>
                        <h2 className="text-xl font-semibold text-[#082D52]">
                          {section.title}
                        </h2>
                      </div>

                    </div>


                    <div className="mt-5 space-y-4">

                      {section.content.map((paragraph) => (

                        <p
                          key={paragraph}
                          className="leading-8 text-gray-600"
                        >
                          {paragraph}
                        </p>

                      ))}

                    </div>

                  </div>

                );
              })}

            </div>

          </div>

        </section>


        {/* ========================================
            LAWFUL BASIS
        ======================================== */}

        <section className="bg-[#F7FAFC] py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Our Basis for Using Personal Information
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              Depending on the circumstances, we may process personal
              information because it is necessary to respond to a
              request you have made, provide a service, meet a legal
              obligation, pursue legitimate business interests or
              because you have provided consent.
            </p>


            <p className="mt-4 leading-8 text-gray-600">
              The appropriate basis will depend on the type of
              information involved and the purpose for which it is
              being used.
            </p>

          </div>

        </section>


        {/* ========================================
            SHARING DATA
        ======================================== */}

        <section className="bg-white py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Sharing Your Information
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              NEXT MOVE ESTATES LONDON LIMITED does not sell personal
              information submitted through this website.
            </p>


            <p className="mt-4 leading-8 text-gray-600">
              Where necessary, information may be shared with trusted
              service providers that help us operate our website,
              communicate with clients, store information or provide
              other technology and business services.
            </p>


            <p className="mt-4 leading-8 text-gray-600">
              These service providers may include website hosting
              providers, cloud storage providers, email delivery
              providers and other technical service providers.
            </p>


            <p className="mt-4 leading-8 text-gray-600">
              We may also disclose personal information where required
              by applicable law, regulation, court order or where
              reasonably necessary to protect our legal rights.
            </p>

          </div>

        </section>


        {/* ========================================
            RETENTION
        ======================================== */}

        <section className="bg-[#F7FAFC] py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              How Long We Keep Personal Information
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              Personal information will normally be retained only for
              as long as reasonably necessary for the purpose for
              which it was collected.
            </p>


            <p className="mt-4 leading-8 text-gray-600">
              Information may be retained for longer where necessary
              for legitimate business record keeping, resolving
              disputes or complying with applicable legal and
              regulatory requirements.
            </p>

          </div>

        </section>


        {/* ========================================
            DATA RIGHTS
        ======================================== */}

        <section className="bg-white py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Your Data Protection Rights
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              Depending on the circumstances and applicable data
              protection law, you may have rights regarding your
              personal information.
            </p>


            <div className="mt-6 space-y-4">

              <RightItem text="Request access to personal information we hold about you." />

              <RightItem text="Request correction of inaccurate or incomplete personal information." />

              <RightItem text="Request deletion of personal information in certain circumstances." />

              <RightItem text="Request restriction of certain processing activities." />

              <RightItem text="Object to certain uses of your personal information." />

              <RightItem text="Withdraw consent where processing is based on your consent." />

            </div>


            <p className="mt-7 leading-8 text-gray-600">
              To make a request relating to your personal information,
              contact us at{" "}
              <a
                href={`mailto:${companyDetails.email}`}
                className="font-semibold text-[#082D52] underline decoration-[#D3A72F] underline-offset-4"
              >
                {companyDetails.email}
              </a>.
            </p>

          </div>

        </section>


        {/* ========================================
            THIRD PARTY LINKS
        ======================================== */}

        <section className="bg-[#F7FAFC] py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Third-Party Websites
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              Our website may contain links to websites or services
              operated by third parties.
            </p>


            <p className="mt-4 leading-8 text-gray-600">
              NEXT MOVE ESTATES LONDON LIMITED is not responsible for
              the privacy practices, content or security of third-party
              websites. We recommend reviewing the privacy information
              provided by those organisations before submitting
              personal information to them.
            </p>

          </div>

        </section>


        {/* ========================================
            INTERNATIONAL SERVICES
        ======================================== */}

        <section className="bg-white py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Service Providers and International Processing
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              Some technology providers used to operate our website
              or send communications may process or store information
              using infrastructure located outside the United Kingdom.
            </p>


            <p className="mt-4 leading-8 text-gray-600">
              Where applicable, we aim to use reputable service
              providers and appropriate safeguards for the handling
              of personal information.
            </p>

          </div>

        </section>


        {/* ========================================
            CHILDREN
        ======================================== */}

        <section className="bg-[#F7FAFC] py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Children's Information
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              Our property services and website are not specifically
              directed at children. We do not intentionally seek to
              collect personal information from children through our
              general property enquiry forms.
            </p>

          </div>

        </section>


        {/* ========================================
            POLICY CHANGES
        ======================================== */}

        <section className="bg-white py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Changes to This Privacy Policy
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              We may update this Privacy Policy from time to time to
              reflect changes to our services, website, technology or
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


        {/* ========================================
            CONTACT DETAILS
        ======================================== */}

        <section className="bg-[#082D52] py-20">

          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">

            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
              Privacy Questions
            </p>


            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Contact us about your personal information
            </h2>


            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
              If you have a privacy question or would like to make
              a request relating to personal information you have
              provided to us, please contact NEXT MOVE ESTATES
              LONDON LIMITED.
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


// ========================================
// DATA RIGHT ITEM
// ========================================

function RightItem({ text }) {
  return (
    <div className="flex items-start gap-3">

      <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D3A72F]" />

      <p className="leading-7 text-gray-600">
        {text}
      </p>

    </div>
  );
}