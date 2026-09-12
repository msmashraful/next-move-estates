import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  FileText,
  Building2,
  Home,
  KeyRound,
  ClipboardCheck,
  ShieldCheck,
  Scale,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";


export const metadata = {
  title: "Terms & Conditions | Next Move Estates London Limited",
  description:
    "Read the Terms and Conditions governing the use of the Next Move Estates London Limited website and property services.",
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
    icon: Home,
    title: "Use of This Website",
    content: [
      "This website is provided for general information about properties and services offered by NEXT MOVE ESTATES LONDON LIMITED.",

      "You may use this website for lawful personal or business purposes relating to property sales, lettings, room lets, landlord services, property management, valuations and enquiries.",

      "You must not use this website in any way that may damage, disrupt or interfere with the website, its security, its systems or the experience of other users.",
    ],
  },

  {
    icon: KeyRound,
    title: "Property Information",
    content: [
      "Property descriptions, photographs, floor plans, prices, rental amounts, availability and other property information displayed on this website are intended as general guidance.",

      "Property information may change without notice, and availability cannot be guaranteed until confirmed directly by NEXT MOVE ESTATES LONDON LIMITED.",

      "Prospective buyers and tenants should satisfy themselves as to the accuracy and suitability of any property information before making a decision or entering into an agreement.",
    ],
  },

  {
    icon: ClipboardCheck,
    title: "Property Enquiries and Viewings",
    content: [
      "Submitting a property enquiry, viewing request or contact form through this website does not create a contract, tenancy, reservation or legal obligation between you and NEXT MOVE ESTATES LONDON LIMITED.",

      "Viewing requests are subject to availability and confirmation. We may contact you to arrange, change or confirm a suitable viewing time.",

      "A property may be withdrawn, reserved, let or sold before a requested viewing takes place.",
    ],
  },

  {
    icon: Scale,
    title: "Property Valuations",
    content: [
      "Any valuation requested through this website is intended to provide an initial indication of the possible sale or rental value of a property.",

      "A website valuation request does not constitute a formal survey, mortgage valuation, structural survey or professional valuation for lending, taxation, legal or court purposes.",

      "Actual sale prices and rental values may differ depending on market conditions, property condition, location, demand and other relevant factors.",
    ],
  },

  {
    icon: Building2,
    title: "Landlord and Property Management Services",
    content: [
      "Information relating to lettings, landlord services and property management on this website is provided as a general description of the services that may be available.",

      "The precise scope, fees, responsibilities and terms of any service will be agreed separately with the relevant client before services are provided.",

      "Nothing on this website should be treated as creating a property management, agency or tenancy agreement unless a separate agreement has been entered into.",
    ],
  },

  {
    icon: ShieldCheck,
    title: "Accuracy and Availability",
    content: [
      "We aim to keep the information on this website accurate and reasonably up to date, but we do not guarantee that all information will always be complete, current or free from errors.",

      "We may update, remove or change website content, property listings, services or functionality without prior notice.",

      "We do not guarantee uninterrupted availability of the website and may temporarily suspend access for maintenance, security or technical reasons.",
    ],
  },
];


export default function TermsPage() {
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
                Terms & Conditions
              </h1>


              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                These Terms & Conditions explain the rules that apply
                when using the NEXT MOVE ESTATES LONDON LIMITED website
                and submitting property-related enquiries through it.
              </p>

            </div>

          </div>

        </section>


        {/* ========================================
            COMPANY INFORMATION
        ======================================== */}

        <section className="bg-white py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <div className="rounded-3xl border border-[#DCE8F0] bg-[#F7FAFC] p-7 sm:p-9">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#082D52] text-white">
                <Building2 size={27} />
              </div>


              <h2 className="mt-6 text-2xl font-semibold text-[#082D52]">
                Business Information
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
                <FileText size={27} />
              </div>


              <h2 className="mt-6 text-2xl font-semibold text-[#082D52]">
                Agreement to These Terms
              </h2>


              <p className="mt-4 leading-8 text-gray-600">
                By accessing or using this website, you agree to use
                it in accordance with these Terms & Conditions.
              </p>


              <p className="mt-4 leading-8 text-gray-600">
                If you do not agree with these terms, you should stop
                using the website.
              </p>

            </div>

          </div>

        </section>


        {/* ========================================
            MAIN SECTIONS
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


                      <h2 className="pt-2 text-xl font-semibold text-[#082D52]">
                        {section.title}
                      </h2>

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
            FEES
        ======================================== */}

        <section className="bg-[#F7FAFC] py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Fees and Charges
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              The general information displayed on this website does
              not necessarily represent the complete fees or charges
              applicable to a particular property service.
            </p>


            <p className="mt-4 leading-8 text-gray-600">
              Where fees apply, relevant charges and service terms
              should be communicated or agreed separately before the
              relevant service is provided.
            </p>

          </div>

        </section>


        {/* ========================================
            THIRD PARTY SERVICES
        ======================================== */}

        <section className="bg-white py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Third-Party Websites and Services
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              This website may contain links to third-party websites
              or may rely on third-party technology and service
              providers.
            </p>


            <p className="mt-4 leading-8 text-gray-600">
              NEXT MOVE ESTATES LONDON LIMITED does not control
              third-party websites and is not responsible for their
              content, availability, security or privacy practices.
            </p>

          </div>

        </section>


        {/* ========================================
            INTELLECTUAL PROPERTY
        ======================================== */}

        <section className="bg-[#F7FAFC] py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Intellectual Property
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              Unless otherwise stated, website content including text,
              branding, design elements, graphics and other original
              materials belongs to NEXT MOVE ESTATES LONDON LIMITED
              or is used with appropriate permission.
            </p>


            <p className="mt-4 leading-8 text-gray-600">
              You must not reproduce, republish, distribute or
              commercially exploit website content without appropriate
              permission, except where permitted by law.
            </p>

          </div>

        </section>


        {/* ========================================
            USER SUBMISSIONS
        ======================================== */}

        <section className="bg-white py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Information You Submit
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              When submitting information through this website, you
              should provide information that is accurate and that you
              are authorised to provide.
            </p>


            <p className="mt-4 leading-8 text-gray-600">
              You must not knowingly submit false, misleading,
              unlawful, abusive or malicious information through any
              website form.
            </p>

          </div>

        </section>


        {/* ========================================
            LIABILITY
        ======================================== */}

        <section className="bg-[#F7FAFC] py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Limitation of Liability
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              Nothing in these Terms & Conditions excludes or limits
              any liability that cannot lawfully be excluded or
              limited.
            </p>


            <p className="mt-4 leading-8 text-gray-600">
              Subject to applicable law, NEXT MOVE ESTATES LONDON
              LIMITED will not be responsible for loss resulting solely
              from reliance on general information displayed on this
              website where that information has not been separately
              verified or confirmed.
            </p>


            <p className="mt-4 leading-8 text-gray-600">
              Users remain responsible for obtaining appropriate
              professional, financial, legal, mortgage, survey or
              other specialist advice where required.
            </p>

          </div>

        </section>


        {/* ========================================
            PRIVACY
        ======================================== */}

        <section className="bg-white py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Privacy and Personal Information
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              Personal information submitted through this website is
              handled in accordance with our Privacy Policy.
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


        {/* ========================================
            GOVERNING LAW
        ======================================== */}

        <section className="bg-[#F7FAFC] py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Governing Law
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              These Terms & Conditions are governed by the laws of
              England and Wales.
            </p>


            <p className="mt-4 leading-8 text-gray-600">
              Any dispute relating to these Terms & Conditions or the
              use of this website will be subject to the jurisdiction
              of the courts of England and Wales, subject to any
              mandatory consumer rights that may apply.
            </p>

          </div>

        </section>


        {/* ========================================
            CHANGES
        ======================================== */}

        <section className="bg-white py-16">

          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="text-2xl font-semibold text-[#082D52]">
              Changes to These Terms
            </h2>


            <p className="mt-5 leading-8 text-gray-600">
              NEXT MOVE ESTATES LONDON LIMITED may update these Terms
              & Conditions from time to time to reflect changes to the
              website, business services or applicable requirements.
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
            CONTACT
        ======================================== */}

        <section className="bg-[#082D52] py-20">

          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">

            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D3A72F]">
              Contact Us
            </p>


            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Have a question about these terms?
            </h2>


            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
              Contact NEXT MOVE ESTATES LONDON LIMITED if you have
              a question about these Terms & Conditions or our
              property services.
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