import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  metadataBase: new URL(
    "https://nextmoveestateslondon.co.uk"
  ),

  title: {
    default: "Next Move Estates London",
    template: "%s | Next Move Estates London",
  },

  description:
    "Next Move Estates London Limited provides property sales, lettings, room lets, landlord support and property management services in London and surrounding areas.",

  keywords: [
    "Next Move Estates London",
    "estate agents London",
    "property for sale London",
    "property to rent London",
    "rooms to rent London",
    "letting agents London",
    "property management London",
    "landlord services London",
    "free property valuation London",
    "houses for sale London",
    "flats to rent London",
  ],

  authors: [
    {
      name: "NEXT MOVE ESTATES LONDON LIMITED",
    },
  ],

  creator:
    "NEXT MOVE ESTATES LONDON LIMITED",

  publisher:
    "NEXT MOVE ESTATES LONDON LIMITED",


  // ========================================
  // SEARCH ENGINE SETTINGS
  // ========================================

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },


  // ========================================
  // OPEN GRAPH
  // Facebook / WhatsApp / LinkedIn
  // ========================================

  openGraph: {
    type: "website",

    locale: "en_GB",

    url:
      "https://nextmoveestateslondon.co.uk",

    siteName:
      "Next Move Estates London",

    title:
      "Next Move Estates London",

    description:
      "Property sales, lettings, room lets, landlord services and property management in London and surrounding areas.",

    images: [
      {
        url: "/og-image.png",

        width: 1200,

        height: 630,

        alt:
          "Next Move Estates London - Property Sales, Lettings and Property Management",
      },
    ],
  },


  // ========================================
  // TWITTER / X
  // ========================================

  twitter: {
    card: "summary_large_image",

    title:
      "Next Move Estates London",

    description:
      "Property sales, lettings, room lets, landlord services and property management in London and surrounding areas.",

    images: [
      "/og-image.png",
    ],
  },


  // ========================================
  // CANONICAL
  // ========================================

  alternates: {
    canonical: "/",
  },
};


export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}