import Link from "next/link";
import {
  House,
  KeyRound,
  BadgePoundSterling,
  Building2,
} from "lucide-react";

const services = [
  {
    title: "Buy",
    description: "Explore properties for sale and find your next home.",
    href: "/buy",
    button: "Explore properties",
    icon: House,
  },
  {
    title: "Rent",
    description: "Discover homes and flats available to rent.",
    href: "/rent",
    button: "Find a rental",
    icon: KeyRound,
  },
  {
    title: "Sell",
    description: "Thinking of selling? Start with a free property valuation.",
    href: "/sell",
    button: "Sell your property",
    icon: BadgePoundSterling,
  },
  {
    title: "Let",
    description:
      "Let your property with professional support from our team.",
    href: "/landlords",
    button: "Let your property",
    icon: Building2,
  },
];

export default function ServicesIntro() {
  return (
    <section className="bg-white px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D3A72F]">
            Your Next Move
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-[#082D52] md:text-4xl lg:text-5xl">
            How can we help you?
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">
            Whether you're buying, renting, selling or letting, we're here to
            help you make your next move.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className="
                  group relative overflow-hidden
                  rounded-2xl
                  border border-[#D8E6F0]
                  bg-[#EEF5FA]
                  p-7
                  shadow-[0_8px_24px_rgba(8,45,82,0.06)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#AFC9DA]
                  hover:bg-[#E7F1F8]
                  hover:shadow-[0_16px_35px_rgba(8,45,82,0.12)]
                "
              >

                {/* Decorative background */}
                <div
                  className="
                    absolute -right-12 -top-12
                    h-32 w-32
                    rounded-full
                    bg-[#BFD8E8]/30
                    blur-2xl
                    transition-all duration-500
                    group-hover:bg-[#D3A72F]/10
                  "
                />

                {/* Top Gold Line */}
                <div
                  className="
                    absolute left-0 top-0
                    h-[3px] w-0
                    bg-[#D3A72F]
                    transition-all duration-500
                    group-hover:w-full
                  "
                />

                {/* Icon */}
                <div
                  className="
                    relative
                    flex h-14 w-14
                    items-center justify-center
                    rounded-xl
                    bg-[#082D52]
                    shadow-sm
                    transition-all duration-300
                    group-hover:scale-105
                    group-hover:bg-[#D3A72F]
                  "
                >
                  <Icon
                    size={27}
                    strokeWidth={1.7}
                    className="
                      text-white
                      transition-colors duration-300
                      group-hover:text-[#082D52]
                    "
                  />
                </div>

                {/* Title */}
                <h3 className="relative mt-6 text-2xl font-semibold text-[#082D52]">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="relative mt-3 leading-7 text-[#526675]">
                  {service.description}
                </p>

                {/* Button */}
                <div className="relative mt-7">
                  <span
                    className="
                      inline-flex items-center
                      text-sm font-semibold
                      text-[#082D52]
                      transition-colors duration-300
                      group-hover:text-[#B58A1E]
                    "
                  >
                    {service.button}

                    <span
                      className="
                        ml-2 text-lg
                        text-[#D3A72F]
                        transition-transform duration-300
                        group-hover:translate-x-2
                      "
                    >
                      →
                    </span>
                  </span>
                </div>

              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}