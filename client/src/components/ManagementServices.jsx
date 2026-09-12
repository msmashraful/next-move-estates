import Link from "next/link";
import {
  Building2,
  Users,
  Wrench,
  ClipboardCheck,
  CirclePoundSterling,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Tenant Management",
    description:
      "Professional support with tenant communication, enquiries and ongoing tenancy matters.",
  },
  {
    icon: CirclePoundSterling,
    title: "Rent Administration",
    description:
      "Helping landlords stay organised with rent collection and tenancy administration.",
  },
  {
    icon: Wrench,
    title: "Maintenance Support",
    description:
      "Coordinate property maintenance and help resolve repair issues efficiently.",
  },
  {
    icon: ClipboardCheck,
    title: "Property Inspections",
    description:
      "Regular property checks to help landlords protect and maintain their investment.",
  },
];

export default function ManagementServices() {
  return (
    <section className="bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D3A72F]">
              For Landlords
            </p>

            <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight text-[#082D52] md:text-4xl lg:text-5xl">
              Property management made simple
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 md:text-lg">
              From finding tenants to managing day-to-day property matters, our
              team provides professional support designed to make letting your
              property easier.
            </p>

            <p className="mt-4 max-w-xl leading-7 text-gray-600">
              Whether you own a single property or manage a growing portfolio,
              Next Move Estates can help you save time, reduce hassle and stay
              in control of your investment.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/property-management"
                className="inline-flex items-center gap-2 rounded-lg bg-[#082D52] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0B3D6F]"
              >
                Property Management
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/landlords"
                className="inline-flex items-center gap-2 rounded-lg border border-[#082D52] px-6 py-3.5 text-sm font-semibold text-[#082D52] transition-all duration-300 hover:bg-[#EEF5FA]"
              >
                Landlord Services
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          {/* Right Service Panel */}
          <div className="relative">

            {/* Decorative background */}
            <div className="absolute -left-5 -top-5 h-full w-full rounded-3xl bg-[#D3A72F]/10" />

            <div className="relative rounded-3xl bg-[#EEF5FA] p-6 shadow-[0_20px_50px_rgba(8,45,82,0.10)] md:p-8">

              {/* Panel Header */}
              <div className="flex items-center gap-4 border-b border-[#D5E3EC] pb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#082D52]">
                  <Building2
                    size={28}
                    strokeWidth={1.7}
                    className="text-white"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Complete Support
                  </p>

                  <h3 className="text-xl font-semibold text-[#082D52]">
                    Management Services
                  </h3>
                </div>
              </div>

              {/* Service Grid */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {benefits.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="group rounded-2xl border border-white bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C8DCE8] hover:shadow-lg"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EEF5FA] text-[#082D52] transition-all duration-300 group-hover:bg-[#D3A72F]">
                        <Icon size={21} strokeWidth={1.8} />
                      </div>

                      <h4 className="mt-4 font-semibold text-[#082D52]">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}