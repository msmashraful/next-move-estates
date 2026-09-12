import {
  ShieldCheck,
  Handshake,
  MapPinned,
  Clock3,
} from "lucide-react";

const reasons = [
  {
    icon: MapPinned,
    title: "Local Market Knowledge",
    description:
      "Practical local insight to help buyers, tenants, sellers and landlords make confident property decisions.",
  },
  {
    icon: Handshake,
    title: "Personal Service",
    description:
      "A friendly, straightforward approach with support tailored to your individual property needs.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Support",
    description:
      "Clear communication and dependable guidance throughout your property journey.",
  },
  {
    icon: Clock3,
    title: "Responsive Team",
    description:
      "We aim to respond quickly to enquiries and keep you informed every step of the way.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#F7FAFC] px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D3A72F]">
            Why Choose Us
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-[#082D52] md:text-4xl lg:text-5xl">
            A better way to make your next move
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
            We combine local knowledge, personal service and professional
            support to make buying, renting, selling and letting as simple as
            possible.
          </p>
        </div>

        {/* Reasons */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="
                  group rounded-2xl
                  border border-[#DCE8F0]
                  bg-white
                  p-7
                  shadow-[0_8px_28px_rgba(8,45,82,0.05)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#BFD2DF]
                  hover:shadow-[0_16px_38px_rgba(8,45,82,0.10)]
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex h-14 w-14 items-center justify-center
                    rounded-2xl
                    bg-[#EEF5FA]
                    text-[#082D52]
                    transition-all duration-300
                    group-hover:bg-[#082D52]
                    group-hover:text-[#D3A72F]
                  "
                >
                  <Icon size={26} strokeWidth={1.7} />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-semibold text-[#082D52]">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}