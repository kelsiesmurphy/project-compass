import Footer from "@/components/footer";
import { PricingTableSkeleton } from "@/components/skeletons/pricing-table-skeleton";
import { PricingTable } from "@clerk/nextjs";

export default function PricingPage() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-start pt-16 px-6 md:px-10">
      <div className="max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Choose Your Explorer Plan
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started with our free Explorer plan, or unlock premium features
            with Explorer Plus. Both plans give you access to interactive
            challenges and a community of fellow explorers.
          </p>
        </div>
        <PricingTable fallback={<PricingTableSkeleton />} />
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Have questions?{" "}
            <a href="/contact" className="underline text-primary">
              Contact us
            </a>{" "}
            for help choosing the best plan.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
