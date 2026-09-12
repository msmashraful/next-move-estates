import Link from "next/link";
import {
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="bg-[#F7FAFC] px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-[#082D52] px-6 py-10 text-white md:px-10 md:py-12 lg:px-14">

          {/* Decorative shapes */}
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#D3A72F]/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-white/5 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">

            {/* Left Content */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D3A72F]">
                Get In Touch
              </p>

              <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
                Ready to make your next move?
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
                Whether you're looking to buy, rent, sell, let or need property
                management support, our team is here to help.
              </p>

              {/* Contact Options */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#D3A72F]">
                    <Phone size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-white/60">Call us</p>
                    <p className="mt-1 text-sm font-medium">
                      Speak to our team
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#D3A72F]">
                    <Mail size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-white/60">Email us</p>
                    <p className="mt-1 text-sm font-medium">
                      Send an enquiry
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#D3A72F]">
                    <MessageCircle size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-white/60">Message us</p>
                    <p className="mt-1 text-sm font-medium">
                      Quick response
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right CTA */}
            <div className="lg:flex lg:justify-end">
              <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-[#082D52] shadow-xl">

                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D3A72F]">
                  Talk To Us
                </p>

                <h3 className="mt-3 text-2xl font-semibold">
                  How can we help?
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Tell us what you're looking for and a member of our team will
                  get back to you.
                </p>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D3A72F] px-5 py-3.5 text-sm font-semibold text-[#082D52] transition hover:bg-[#E1B93E]"
                >
                  Contact Us
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