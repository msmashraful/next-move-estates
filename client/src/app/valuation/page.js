import { Suspense } from "react";
import ValuationForm from "@/components/ValuationForm";

export const metadata = {
  title: "Free Property Valuation | Next Move Estates London",
  description:
    "Book a free property valuation with Next Move Estates London for sales or lettings.",
};

export default function ValuationPage() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="min-h-[500px] flex items-center justify-center">
            <p>Loading valuation form...</p>
          </div>
        </section>

        {/* =========================
            CONTENT
        ========================== */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_2fr] lg:px-8">

            {/* LEFT INFORMATION */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D3A72F]">
                Why choose us?
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#082D52]">
                Start your property journey with us
              </h2>

              <p className="mt-5 leading-7 text-gray-600">
                Whether you are considering selling your
                home or letting your property, our team
                can help you understand your next steps.
              </p>

              <div className="mt-8 space-y-6">
                <Feature
                  number="01"
                  title="Free Valuation"
                  text="Request an initial property valuation with no obligation."
                />

                <Feature
                  number="02"
                  title="Local Advice"
                  text="Speak with our team about your property, location and current requirements."
                />

                <Feature
                  number="03"
                  title="Sales & Lettings"
                  text="We can help whether you are planning to sell your property or find tenants."
                />

                <Feature
                  number="04"
                  title="Personal Service"
                  text="Our team will contact you directly to discuss the most suitable next step."
                />
              </div>

              <div className="mt-10 rounded-xl bg-[#082D52] p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-[#D3A72F]">
                  Need to speak to us?
                </p>

                <p className="mt-3 text-xl font-bold text-white">
                  Next Move Estates London
                </p>

                <p className="mt-3 text-sm leading-6 text-gray-300">
                  Submit your details and a member of our
                  team will contact you regarding your
                  valuation request.
                </p>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div>
              <ValuationForm />
            </div>
          </div>
        </section>

        {/* =========================
            BOTTOM MESSAGE
        ========================== */}
        <section className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#082D52] sm:text-3xl">
              Your next move starts here.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Complete our valuation form and let Next
              Move Estates help you take the next step
              with your property.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Feature({ number, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF6D9] text-sm font-bold text-[#A77D00]">
        {number}
      </div>

      <div>
        <h3 className="font-bold text-[#082D52]">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-gray-600">
          {text}
        </p>
      </div>
    </div>
  );
}