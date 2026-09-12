import Link from "next/link";
import {
  Home,
  ArrowRight,
  BadgePoundSterling,
} from "lucide-react";

export default function ValuationCTA() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-[#082D52] px-6 py-12 text-white shadow-[0_20px_60px_rgba(8,45,82,0.18)] md:px-10 md:py-14 lg:px-14">

          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D3A72F]/10 blur-2xl" />
          <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-white/5 blur-2xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">

            {/* Left */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <Home
                    size={24}
                    strokeWidth={1.8}
                    className="text-[#F2C94C]"
                  />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F2C94C]">
                  Free Property Valuation
                </p>
              </div>

              <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
                Curious what your property could be worth?
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
                Whether you're thinking of selling or letting, our team can
                provide a free, no-obligation valuation and help you understand
                your next move.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D3A72F]" />
                  No obligation
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D3A72F]" />
                  Local market guidance
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D3A72F]" />
                  Sales & rental valuation
                </span>
              </div>
            </div>

            {/* Right CTA */}
            <div className="lg:flex lg:justify-end">
              <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D3A72F] text-[#082D52]">
                  <BadgePoundSterling
                    size={25}
                    strokeWidth={1.8}
                  />
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  Book your free valuation
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/70">
                  Tell us a little about your property and our team will get in
                  touch to arrange your valuation.
                </p>

                <Link
                  href="/valuation"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D3A72F] px-5 py-3.5 text-sm font-semibold text-[#082D52] transition-all duration-300 hover:bg-[#E1B93E]"
                >
                  Book a Free Valuation
                  <ArrowRight size={17} />
                </Link>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}