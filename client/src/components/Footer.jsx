import Link from "next/link";

import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const quickLinks = [
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Rooms", href: "/rooms" },
  { label: "Sell", href: "/sell" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Property Sales", href: "/buy" },
  { label: "Residential Lettings", href: "/rent" },
  { label: "Room Let", href: "/rooms" },
  {
    label: "Property Management",
    href: "/property-management",
  },
  {
    label: "Landlord Services",
    href: "/landlords",
  },
  {
    label: "Free Valuation",
    href: "/valuation",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#061F38] text-white">

      {/* ================= MAIN FOOTER ================= */}
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* ================= BRAND ================= */}
          <div>

            <Link href="/" className="inline-block">

              <h2 className="text-2xl font-semibold tracking-wide">
                NEXT MOVE
              </h2>

              <p className="mt-1 text-sm font-medium tracking-[0.22em] text-[#D3A72F]">
                ESTATES LONDON
              </p>

            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Helping buyers, tenants, sellers and landlords make their next
              move with confidence.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex items-center gap-3">

              {/* Facebook */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-lg
                  border border-white/10
                  bg-white/5
                  text-white/80
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#D3A72F]
                  hover:bg-[#D3A72F]
                  hover:text-[#082D52]
                "
              >
                <FaFacebookF size={17} />
              </a>

              {/* Instagram */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-lg
                  border border-white/10
                  bg-white/5
                  text-white/80
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#D3A72F]
                  hover:bg-[#D3A72F]
                  hover:text-[#082D52]
                "
              >
                <FaInstagram size={18} />
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-lg
                  border border-white/10
                  bg-white/5
                  text-white/80
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#D3A72F]
                  hover:bg-[#D3A72F]
                  hover:text-[#082D52]
                "
              >
                <FaLinkedinIn size={18} />
              </a>

            </div>

          </div>


          {/* ================= QUICK LINKS ================= */}
          <div>

            <h3 className="text-lg font-semibold">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="
                    w-fit
                    text-sm
                    text-white/65
                    transition-all duration-300
                    hover:translate-x-1
                    hover:text-[#D3A72F]
                  "
                >
                  {link.label}
                </Link>
              ))}

            </div>

          </div>


          {/* ================= SERVICES ================= */}
          <div>

            <h3 className="text-lg font-semibold">
              Our Services
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              {serviceLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="
                    w-fit
                    text-sm
                    text-white/65
                    transition-all duration-300
                    hover:translate-x-1
                    hover:text-[#D3A72F]
                  "
                >
                  {link.label}
                </Link>
              ))}

            </div>

          </div>


          {/* ================= CONTACT ================= */}
          <div>

            <h3 className="text-lg font-semibold">
              Get In Touch
            </h3>

            <div className="mt-5 space-y-5">

              {/* Phone */}
              <div className="flex items-start gap-3">

                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#D3A72F]">
                  <Phone size={17} />
                </div>

                <div>

                  <p className="text-xs text-white/45">
                    Phone
                  </p>

                  <a
                    href="tel:+447506744382"
                    className="
                      mt-1 block
                      text-sm text-white/75
                      transition
                      hover:text-[#D3A72F]
                    "
                  >
                    +44 (0) 7506 744382
                  </a>

                </div>

              </div>


              {/* Email */}
              <div className="flex items-start gap-3">

                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#D3A72F]">
                  <Mail size={17} />
                </div>

                <div>

                  <p className="text-xs text-white/45">
                    Email
                  </p>

                  <a
                    href="mailto:info.nextmoveuk@gmail.com"
                    className="
                      mt-1 block
                      break-all
                      text-sm text-white/75
                      transition
                      hover:text-[#D3A72F]
                    "
                  >
                    info.nextmoveuk@gmail.com
                  </a>

                </div>

              </div>


              {/* Address */}
              <div className="flex items-start gap-3">

                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#D3A72F]">
                  <MapPin size={17} />
                </div>

                <div>

                  <p className="text-xs text-white/45">
                    Office
                  </p>

                  <address className="mt-1 text-sm not-italic leading-6 text-white/75">
                    83 Garron Lane
                    <br />
                    South Ockendon
                    <br />
                    RM15 5JQ, United Kingdom
                  </address>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================= BOTTOM FOOTER ================= */}
      <div className="border-t border-white/10">

        <div
          className="
            mx-auto flex max-w-7xl
            flex-col gap-5
            px-4 py-6
            text-sm text-white/50
            md:px-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* Copyright */}
          <p>
            © {new Date().getFullYear()} Next Move Estates London.
            All rights reserved.
          </p>


          {/* Legal Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">

            <Link
              href="/privacy"
              className="transition hover:text-[#D3A72F]"
            >
              Privacy Policy
            </Link>

            <Link href="/cookies" className="transition hover:text-[#D3A72F]">
              Cookie Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-[#D3A72F]"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/complaints"
              className="transition hover:text-[#D3A72F]"
            >
              Complaints Procedure
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}