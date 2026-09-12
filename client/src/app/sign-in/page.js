import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Heart,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";

import SignInForm from
  "@/components/auth/SignInForm";


export const metadata = {
  title:
    "Sign In | Next Move Estates London",

  description:
    "Sign in to your Next Move Estates London account.",

  robots: {
    index: false,
    follow: false,
  },
};


export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F8]">

      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">


        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <section className="relative hidden overflow-hidden bg-[#082D52] lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">

          {/* DECORATION */}

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full border border-white/10" />

          <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full border border-[#D3A72F]/20" />


          {/* LOGO */}

          <div className="relative z-10">

            <Link
              href="/"
              className="inline-block rounded-xl bg-white px-4 py-3"
            >
              <Image
                src="/logo.png"
                alt="Next Move Estates London"
                width={300}
                height={90}
                priority
                className="h-auto w-[220px]"
              />
            </Link>

          </div>


          {/* CONTENT */}

          <div className="relative z-10 max-w-xl">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D3A72F]">
              Your Property Journey
            </p>


            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white xl:text-5xl">
              Welcome back to
              your next move.
            </h1>


            <p className="mt-5 max-w-lg text-base leading-7 text-white/65">
              Sign in to manage your property
              journey and stay connected with
              Next Move Estates London.
            </p>


            <div className="mt-10 grid gap-4">

              <Feature
                icon={Heart}
                title="Save properties"
                description="Keep your favourite homes in one place."
              />

              <Feature
                icon={MessageSquareText}
                title="Manage enquiries"
                description="Keep track of your property enquiries."
              />

              <Feature
                icon={Building2}
                title="Find your next property"
                description="Browse homes for sale, rent and room lets."
              />

              <Feature
                icon={ShieldCheck}
                title="Secure account"
                description="Access your account with email or Google."
              />

            </div>

          </div>


          {/* FOOTER */}

          <p className="relative z-10 text-xs text-white/40">
            © 2026 Next Move Estates London Limited
          </p>

        </section>


        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">

          <div className="w-full max-w-[480px]">


            {/* MOBILE LOGO */}

            <div className="mb-8 flex justify-center lg:hidden">

              <Link href="/">

                <Image
                  src="/logo.png"
                  alt="Next Move Estates London"
                  width={300}
                  height={90}
                  priority
                  className="h-auto w-[210px]"
                />

              </Link>

            </div>


            {/* SIGN IN CARD */}

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-9">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D3A72F]">
                  Customer Account
                </p>


                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#082D52]">
                  Sign in
                </h2>


                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Welcome back. Sign in to
                  continue to your account.
                </p>

              </div>


              <div className="mt-7">

                <SignInForm />

              </div>

            </div>


            {/* LEGAL */}

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">

              By continuing, you agree to our{" "}

              <Link
                href="/terms"
                className="font-semibold text-slate-600 hover:text-[#082D52]"
              >
                Terms
              </Link>

              {" "}and{" "}

              <Link
                href="/privacy"
                className="font-semibold text-slate-600 hover:text-[#082D52]"
              >
                Privacy Policy
              </Link>.

            </p>

          </div>

        </section>

      </div>

    </main>
  );
}


// ========================================
// FEATURE
// ========================================

function Feature({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#D3A72F]">

        <Icon
          size={20}
          strokeWidth={1.8}
        />

      </div>


      <div>

        <h3 className="text-sm font-semibold text-white">
          {title}
        </h3>


        <p className="mt-1 text-sm leading-6 text-white/50">
          {description}
        </p>

      </div>

    </div>
  );
}