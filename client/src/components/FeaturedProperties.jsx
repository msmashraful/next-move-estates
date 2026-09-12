import Link from "next/link";
import PropertyCard from "./PropertyCard";

const featuredProperties = [
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    badge: "For Sale",
    price: "£425,000",
    title: "Modern Family Home",
    location: "Romford, London",
    bedrooms: 3,
    bathrooms: 2,
    href: "/properties/modern-family-home",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    badge: "To Let",
    price: "£1,850",
    priceSuffix: "pcm",
    title: "Contemporary Two Bedroom Flat",
    location: "Canary Wharf, London",
    bedrooms: 2,
    bathrooms: 1,
    href: "/properties/contemporary-two-bedroom-flat",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    badge: "Room To Let",
    price: "£750",
    priceSuffix: "pcm",
    title: "Bright Furnished Double Room",
    location: "Stratford, London",
    bedrooms: 1,
    bathrooms: 1,
    href: "/properties/bright-furnished-double-room",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="bg-[#F7FAFC] px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D3A72F]">
              Featured Properties
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-[#082D52] md:text-4xl lg:text-5xl">
              Discover our latest properties
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 md:text-lg">
              Explore a selection of homes for sale, properties to rent and
              rooms available across London.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center text-sm font-semibold text-[#082D52] transition hover:text-[#D3A72F]"
          >
            View all properties
            <span className="ml-2 text-lg">→</span>
          </Link>
        </div>

        {/* Property Cards */}
        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.title}
              {...property}
            />
          ))}
        </div>

      </div>
    </section>
  );
}