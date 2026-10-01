const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nextmoveestateslondon.co.uk";


async function getProperties() {
  try {
    const response = await fetch(`${API_URL}/api/properties`, {
        next: { revalidate: 3600 },
      });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    return data.properties || data || [];
  } catch (error) {
    console.error("Sitemap property fetch error:", error);
    return [];
  }
}


export default async function sitemap() {
  const properties = await getProperties();

  const staticPages = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${SITE_URL}/buy`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/rent`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/rooms`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/sell`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/landlords`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/property-management`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/valuation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${SITE_URL}/cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];


  const propertyPages = properties
    .filter(
      (property) =>
        property.slug &&
        property.status === "available"
    )
    .map((property) => ({
      url: `${SITE_URL}/properties/${property.slug}`,

      lastModified: property.created_at
        ? new Date(property.created_at)
        : new Date(),

      changeFrequency: "daily",

      priority: 0.8,
    }));


  return [
    ...staticPages,
    ...propertyPages,
  ];
}