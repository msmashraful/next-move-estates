import { Suspense } from "react";
import ValuationForm from "@/components/ValuationForm";

export const metadata = {
  title: "Free Property Valuation | Next Move Estates London",
  description:
    "Book a free property valuation with Next Move Estates London for sales or lettings.",
};

export default function ValuationPage() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="min-h-[500px] flex items-center justify-center">
            <p>Loading valuation form...</p>
          </div>
        }
      >
        <ValuationForm />
      </Suspense>
    </main>
  );
}