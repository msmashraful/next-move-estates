import {
  Quote,
  Star,
} from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Property Seller",
    review:
      "The team made the whole selling process straightforward and kept us updated throughout. Communication was clear and professional from start to finish.",
    rating: 5,
  },
  {
    name: "James R.",
    role: "Landlord",
    review:
      "A very responsive and helpful service. They supported us with letting the property and made the day-to-day management much easier.",
    rating: 5,
  },
  {
    name: "Amina K.",
    role: "Tenant",
    review:
      "The process was smooth and well organised. Any questions we had were answered quickly and the team was always friendly and helpful.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D3A72F]">
            Client Feedback
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-[#082D52] md:text-4xl lg:text-5xl">
            What our clients say
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
            We aim to provide a professional, responsive and straightforward
            service to buyers, tenants, sellers and landlords.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="
                group relative overflow-hidden
                rounded-2xl
                border border-[#D9E7F0]
                bg-[#EEF5FA]
                p-7
                shadow-[0_8px_24px_rgba(8,45,82,0.06)]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-[#BFD4E2]
                hover:shadow-[0_16px_35px_rgba(8,45,82,0.10)]
              "
            >
              {/* Quote Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#082D52] text-[#D3A72F]">
                <Quote size={23} strokeWidth={1.8} />
              </div>

              {/* Stars */}
              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={17}
                    fill="currentColor"
                    className="text-[#D3A72F]"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="mt-5 leading-7 text-[#526675]">
                “{testimonial.review}”
              </p>

              {/* Client */}
              <div className="mt-7 border-t border-[#D4E3EC] pt-5">
                <h3 className="font-semibold text-[#082D52]">
                  {testimonial.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {testimonial.role}
                </p>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#D3A72F]/10 blur-3xl" />
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}