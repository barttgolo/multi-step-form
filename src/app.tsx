import { useAtom } from "jotai";
import { DataStep } from "@/components/form-steps/data-step";
import { PaymentStep } from "@/components/form-steps/payment-step";
import { ProductsStep } from "@/components/form-steps/products-step";
import { SummaryStep } from "@/components/summary-step";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormStepsAtom,
  defaultFormValuesAtom,
  formStepAtom,
  formValuesAtom,
} from "@/utils/atoms";
import { Breadcrumbs } from "@/components/ui/breadcrumb";

const blockManager: Record<FormStepsAtom, JSX.Element> = {
  dataStep: <DataStep />,
  productsStep: <ProductsStep />,
  paymentStep: <PaymentStep />,
  summaryStep: <SummaryStep />,
};

export const App = () => {
  const [currentFormStep, setFormStep] = useAtom(formStepAtom);
  const [, setFormValues] = useAtom(formValuesAtom);

  const handleClearForm = () => {
    setFormStep("dataStep");
    setFormValues(defaultFormValuesAtom);
  };

  return (
    <div className="flex h-full min-h-screen items-center justify-center bg-gray-200">
      <Card className="my-6 w-[544px]">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <Breadcrumbs />
            <div
              onClick={handleClearForm}
              className="fade-in-30 cursor-pointer rounded-md border-2 border-solid border-slate-700 bg-slate-100 p-4 text-xl transition-colors duration-300 hover:bg-slate-700 hover:text-white"
            >
              Multi step form
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full items-center py-4">
            {blockManager[currentFormStep]}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
