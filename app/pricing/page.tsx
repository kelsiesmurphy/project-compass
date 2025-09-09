import { PricingTable } from "@clerk/nextjs";

export default function PricingPage() {
  return (
    <div className="bg-muted flex w-full flex-1 items-center justify-center p-6 md:p-10">
      <div className="max-w-4xl">
        <PricingTable />
      </div>
    </div>
  );
}
