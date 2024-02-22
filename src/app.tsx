import { DataStep } from "@/components/form-steps/data-step";
import { PaymentStep } from "@/components/form-steps/payment-step";
import { ProductsStep } from "@/components/form-steps/products-step";
import { SummaryStep } from "@/components/summary-step";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormStepsAtom,
  defaultFormValuesAtom,
  formStepAtom,
  formValuesAtom,
} from "@/utils/atoms";
import { useAtom } from "jotai";
import { ChevronLeft } from "lucide-react";

const blockManager: Record<FormStepsAtom, JSX.Element> = {
  dataStep: <DataStep />,
  productsStep: <ProductsStep />,
  paymentStep: <PaymentStep />,
  summaryStep: <SummaryStep />,
};

export const App = () => {
  const [currentFormStep, setFormStep] = useAtom(formStepAtom);
  const [, setFormValues] = useAtom(formValuesAtom);

  const currentStepIndex = Object.keys(blockManager).findIndex(
    (el) => el === currentFormStep
  );

  const handleGoBack = () => {
    const prevStep = Object.keys(blockManager)[
      currentStepIndex - 1
    ] as FormStepsAtom;

    setFormStep(prevStep);
  };

  const handleClearForm = () => {
    setFormStep("dataStep");
    setFormValues(defaultFormValuesAtom);
  };

  return (
    <div className="bg-gray-200 flex items-center justify-center min-h-screen h-full">
      <Card className="w-[544px] my-6">
        <CardHeader>
          <CardTitle
            className={`flex items-center ${
              currentStepIndex ? "justify-between" : "justify-end"
            }`}
          >
            {!!currentStepIndex && (
              <Button size="icon" variant="outline" onClick={handleGoBack}>
                <ChevronLeft />
              </Button>
            )}
            <div
              onClick={handleClearForm}
              className="text-xl p-4 border-2 bg-slate-100 border-solid border-slate-700 hover:bg-slate-700 hover:text-white transition-colors duration-300 fade-in-30 cursor-pointer rounded-md"
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
