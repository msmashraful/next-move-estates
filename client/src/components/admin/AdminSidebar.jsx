"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Building2,
  CirclePlus,
  MessageSquareText,
  ClipboardList,
  MessagesSquare,
  House,
  LogOut,
} from "lucide-react";


const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },

  {
    name: "Properties",
    href: "/admin/properties",
    icon: Building2,
  },

  {
    name: "Add Property",
    href: "/admin/properties/new",
    icon: CirclePlus,
  },

  {
    name: "Property Enquiries",
    href: "/admin/enquiries",
    icon: MessageSquareText,
  },

  {
    name: "Valuations",
    href: "/admin/valuations",
    icon: ClipboardList,
  },

  {
    name: "Contact Enquiries",
    href: "/admin/contact-enquiries",
    icon: MessagesSquare,
  },
];


export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();


  // ========================================
  // CHECK ACTIVE MENU
  // ========================================

  const isActive = (href) => {

    // Dashboard
    if (href === "/admin") {
      return pathname === "/admin";
    }


    // Add Property
    if (
      href === "/admin/properties/new"
    ) {
      return (
        pathname ===
        "/admin/properties/new"
      );
    }


    // Properties
    if (
      href === "/admin/properties"
    ) {
      return (
        pathname ===
          "/admin/properties" ||

        (
          pathname.startsWith(
            "/admin/properties/"
          ) &&

          pathname !==
            "/admin/properties/new"
        )
      );
    }


    // Other admin pages
    return (
      pathname === href ||
      pathname.startsWith(
        `${href}/`
      )
    );
  };


  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {

    localStorage.removeItem(
      "admin_token"
    );

    localStorage.removeItem(
      "admin_email"
    );

    router.replace(
      "/admin/login"
    );
  };


  return (
    <aside
      className="
        flex
        h-screen
        w-[280px]
        shrink-0
        flex-col
        bg-[#082D52]
        px-4
        py-6
        text-white
      "
    >

      {/* ========================================
          BRAND
      ======================================== */}

      <div className="border-b border-white/10 pb-6">

        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D3A72F]">
          Next Move Estates
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-white">
          Admin Panel
        </h1>

      </div>


      {/* ========================================
          NAVIGATION
      ======================================== */}

      <nav className="mt-7 space-y-2">

        {menuItems.map(
          (item) => {

            const Icon =
              item.icon;

            const active =
              isActive(
                item.href
              );


            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${
                    active
                      ? "bg-[#D3A72F] text-[#082D52] shadow-sm"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }
                `}
              >

                <Icon
                  size={20}
                  strokeWidth={1.8}
                />

                <span>
                  {item.name}
                </span>

              </Link>
            );
          }
        )}

      </nav>


      {/* ========================================
          BOTTOM ACTIONS
      ======================================== */}

      <div className="mt-auto border-t border-white/10 pt-5">

        {/* VIEW WEBSITE */}

        <Link
          href="/"
          target="_blank"
          className="
            flex
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-sm
            font-medium
            text-white/80
            transition
            hover:bg-white/10
            hover:text-white
          "
        >

          <House
            size={20}
            strokeWidth={1.8}
          />

          <span>
            View Website
          </span>

        </Link>


        {/* LOGOUT */}

        <button
          type="button"
          onClick={
            handleLogout
          }
          className="
            mt-2
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-left
            text-sm
            font-medium
            text-white/80
            transition
            hover:bg-white/10
            hover:text-white
          "
        >

          <LogOut
            size={20}
            strokeWidth={1.8}
          />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}