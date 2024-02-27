import { FormStepsAtom, formStepAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const titlesMap: Record<FormStepsAtom, string> = {
  dataStep: "Dane",
  productsStep: "Produkty",
  paymentStep: "Płatność",
  summaryStep: "Podsumowanie",
};

export const Breadcrumbs = () => {
  const [activeSteps, setActiveSteps] = useState<FormStepsAtom[]>([]);
  const [currentFormStep, setFormStep] = useAtom(formStepAtom);
  useEffect(() => {
    const activeStepIndex = Object.keys(titlesMap).findIndex(
      (el) => el === currentFormStep,
    );

    const activeSteps = Object.keys(titlesMap).slice(
      0,
      activeStepIndex + 1,
    ) as FormStepsAtom[];

    setActiveSteps(activeSteps);
  }, [currentFormStep]);

  return (
    <div className="flex gap-1">
      {activeSteps.map((step, index) => (
        <>
          <div
            key={step}
            className="cursor-pointer text-xs hover:text-slate-800"
            onClick={() => setFormStep(step)}
          >
            {titlesMap[step]}
          </div>
          {index + 1 !== activeSteps.length && (
            <div className="cursor-pointer text-xs hover:text-slate-800">/</div>
          )}
        </>
      ))}
    </div>
  );
};
