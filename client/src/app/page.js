import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesIntro from "@/components/ServicesIntro";
import FeaturedProperties from "@/components/FeaturedProperties";
import ManagementServices from "@/components/ManagementServices";
import ValuationCTA from "@/components/ValuationCTA";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";


// ========================================
// HOMEPAGE SEO
// ========================================

export const metadata = {
  title: "Next Move Estates London",
  description:
    "Next Move Estates London Limited provides property sales, lettings, room lets, landlord support and property management services in London and surrounding areas.",

  alternates: {
    canonical: "/",
  },
};


// ========================================
// REAL ESTATE AGENT STRUCTURED DATA
// ========================================

const realEstateSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",

  name: "Next Move Estates London Limited",

  url: "https://nextmoveestateslondon.co.uk",

  logo: "https://nextmoveestateslondon.co.uk/logo.png",

  telephone: "+44 7506 744382",

  email: "info.nextmoveuk@gmail.com",

  description:
    "Next Move Estates London Limited provides property sales, lettings, room lets, landlord support and property management services in London and surrounding areas.",

  address: {
    "@type": "PostalAddress",
    streetAddress: "83 Garron Lane",
    addressLocality: "South Ockendon",
    postalCode: "RM15 5JQ",
    addressCountry: "GB",
  },

  contactPoint: {
    "@type": "ContactPoint",

    telephone: "+44 7506 744382",

    email: "info.nextmoveuk@gmail.com",

    contactType: "customer service",

    areaServed: "GB",

    availableLanguage: "English",
  },
};


// ========================================
// HOME PAGE
// ========================================

export default function Home() {
  return (
    <main>

      {/* ========================================
          GOOGLE STRUCTURED DATA
      ======================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(realEstateSchema),
        }}
      />


      {/* ========================================
          WEBSITE CONTENT
      ======================================== */}

      <Navbar />

      <Hero />

      <ServicesIntro />

      <FeaturedProperties />

      <ManagementServices />

      <ValuationCTA />

      <WhyChooseUs />

      <Testimonials />

      <ContactCTA />

      <Footer />

    </main>
  );
}