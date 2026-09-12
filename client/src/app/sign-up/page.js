import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Building2,
  Heart,
  MessageSquareText,
} from "lucide-react";

import SignUpForm from "@/components/auth/SignUpForm";

export const metadata = {
  title: "Create Account",
  description:
    "Create your Next Move Estates London customer account.",

  robots: {
    index: false,
    follow: true,
  },
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#F6F8FA]">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">

        {/* LEFT SIDE */}

        <section className="relative hidden overflow-hidden bg-[#082D52] p-12 text-white lg:flex lg:flex-col">

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#D3A72F]/10" />

          <div className="absolute -bottom-40 -right-28 h-[500px] w-[500px] rounded-full border border-white/5" />


          {/* LOGO */}

          <div className="relative z-10">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Next Move Estates London"
                width={300}
                height={90}
                priority
                className="h-auto w-[230px]"
              />
            </Link>
          </div>


          {/* CONTENT */}

          <div className="relative z-10 my-auto max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#D3A72F]">
              Your property journey
            </p>

            <h2 className="mt-5 text-5xl font-semibold leading-[1.08] tracking-tight">
              Everything for your
              next move, in one place.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-8 text-white/70">
              Create your account to
              keep your property journey
              organised and make it
              easier to stay connected
              with Next Move Estates.
            </p>


            <div className="mt-10 space-y-5">

              <Feature
                icon={Heart}
                title="Save properties"
                text="Keep properties you like in one convenient place."
              />

              <Feature
                icon={MessageSquareText}
                title="Manage enquiries"
                text="Keep track of your property enquiries and requests."
              />

              <Feature
                icon={Building2}
                title="Property journey"
                text="Access your account as your requirements develop."
              />

            </div>
          </div>


          {/* COMPANY */}

          <div className="relative z-10 text-xs leading-6 text-white/45">
            NEXT MOVE ESTATES LONDON LIMITED
            <br />
            Company Registration No.
            17394368
          </div>
        </section>


        {/* RIGHT SIDE */}

        <section className="flex min-h-screen flex-col px-5 py-7 sm:px-8 lg:px-12">

          <div className="mx-auto flex w-full max-w-[680px] items-center justify-between">

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#082D52]"
            >
              <ArrowLeft size={17} />
              Back to website
            </Link>

            <Link
              href="/"
              className="lg:hidden"
            >
              <Image
                src="/logo.png"
                alt="Next Move Estates London"
                width={220}
                height={70}
                priority
                className="h-auto w-[150px]"
              />
            </Link>

          </div>


          <div className="flex flex-1 items-center justify-center py-12">
            <SignUpForm />
          </div>

        </section>

      </div>
    </main>
  );
}


function Feature({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="flex items-start gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#D3A72F]">
        <Icon
          size={21}
          strokeWidth={1.8}
        />
      </div>

      <div>
        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-white/55">
          {text}
        </p>
      </div>

    </div>
  );
}