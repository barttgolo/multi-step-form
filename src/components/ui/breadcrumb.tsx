import { FormStepsAtom, formStepAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const stepsMap: Record<FormStepsAtom, string> = {
  dataStep: "Dane",
  productsStep: "Produkty",
  paymentStep: "Płatność",
  summaryStep: "Podsumowanie",
};

const steps = Object.entries(stepsMap) as [FormStepsAtom, string][];

export const Breadcrumbs = () => {
  const [reachedSteps, setReachedSteps] = useState<FormStepsAtom[]>([]);
  const [currentFormStep, setFormStep] = useAtom(formStepAtom);

  useEffect(() => {
    setReachedSteps((prev) => [...new Set([...prev, currentFormStep])]);
  }, [currentFormStep]);

  const handleClickStep = (step: FormStepsAtom) => {
    if (!reachedSteps.includes(step)) {
      return;
    }

    setFormStep(step);
  };

  return (
    <div className="flex gap-1">
      {steps.map(([step, title], index) => (
        <div
          key={step}
          className={`cursor-pointer text-xs flex gap-1 items-center ${
            reachedSteps.includes(step)
              ? "text-slate-900 hover:text-slate-500 hover:font-semibold "
              : "text-slate-200"
          }`}
          onClick={() => handleClickStep(step)}
        >
          <div>{title}</div>
          {index + 1 !== Object.keys(stepsMap).length && (
            <ArrowRight width={15} height={15} />
          )}
        </div>
      ))}
    </div>
  );
};
