import { AddressSection } from "@/components/form-steps/summary-step/address-section";
import { PaymentSection } from "@/components/form-steps/summary-step/payment-section";
import { ProductsSection } from "@/components/form-steps/summary-step/products-section";

export const SummaryStep = () => {
  return (
    <div className="flex-col gap-4">
      <AddressSection />
      <ProductsSection />
      <PaymentSection />
    </div>
  );
};
