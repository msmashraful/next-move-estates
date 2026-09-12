export default function robots() {
  const baseUrl = "https://nextmoveestateslondon.co.uk";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}