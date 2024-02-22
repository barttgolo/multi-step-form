import { AddressSection } from "@/components/summary-step/address-section";
import { PaymentSection } from "@/components/summary-step/payment-section";
import { ProductsSection } from "@/components/summary-step/products-section";

export const SummaryStep = () => {
  return (
    <div className="flex-col gap-4">
      <AddressSection />
      <ProductsSection />
      <PaymentSection />
    </div>
  );
};
