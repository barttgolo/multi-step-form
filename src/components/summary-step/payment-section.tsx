import { Button } from "@/components/ui/button";
import { formValuesAtom, formStepAtom } from "@/utils/atoms";
import { calculateInstalmentValue } from "@/utils/tools";
import { useAtom } from "jotai";
import { EditIcon } from "lucide-react";
import { useMemo } from "react";

export const PaymentSection = () => {
  const [formValues] = useAtom(formValuesAtom);
  const [, setFormStep] = useAtom(formStepAtom);

  const { numberOfInstalment, ownContribution } = formValues["paymentStep"];

  const calculatedInstallmentValue = useMemo(
    () =>
      calculateInstalmentValue({
        products: formValues["productsStep"].products,
        ownContribution,
        numberOfInstalment,
      }),
    [formValues, numberOfInstalment, ownContribution]
  );

  return (
    <div className="flex flex-col gap-1 py-4">
      <div className="flex justify-between items-center">
        <div className="font-semibold">Płatność</div>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setFormStep("paymentStep")}
        >
          <EditIcon />
        </Button>
      </div>
      <div className="flex flex-col gap-1 px-4">
        <div className="text-sm text-slate-800">
          Ilość rat: {numberOfInstalment}
        </div>
        <div className="text-sm text-slate-800">
          Wysokość raty: {calculatedInstallmentValue} zł
        </div>
        <div className="text-sm text-slate-800">
          Wpłata własna: {ownContribution} zł
        </div>
      </div>
    </div>
  );
};
