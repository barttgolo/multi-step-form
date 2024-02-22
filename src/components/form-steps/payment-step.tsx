import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled-input";
import { ControlledSlider } from "@/components/ui/controlled-slider";
import { formStepAtom, formValuesAtom } from "@/utils/atoms";
import { PaymentStepForm, paymentStepSchema } from "@/utils/schema";
import {
  calculateInstalmentValue,
  checkIfPaymentExceedsOrder,
} from "@/utils/tools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";

export const PaymentStep = () => {
  const [formValues, setFormValues] = useAtom(formValuesAtom);
  const [, setFormStep] = useAtom(formStepAtom);

  const { control, handleSubmit, setError, watch } = useForm<PaymentStepForm>({
    resolver: zodResolver(paymentStepSchema),
    defaultValues: formValues["paymentStep"],
  });

  const instalmentValue = calculateInstalmentValue({
    products: formValues["productsStep"].products,
    ...watch(),
  });

  const handleOnSubmit: SubmitHandler<PaymentStepForm> = (formData) => {
    const isPaymentExceedsOrder = checkIfPaymentExceedsOrder({
      products: formValues["productsStep"].products,
      ownContribution: formData.ownContribution,
    });

    if (isPaymentExceedsOrder) {
      return setError("ownContribution", {
        message: "Wpłata własna jest równa lub przewyższa wartość zamówienia.",
      });
    }

    setFormValues((draft) => {
      draft.paymentStep = formData;
    });

    setFormStep("summaryStep");
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <ControlledSlider
        control={control}
        name="numberOfInstalment"
        label="Ilość rat"
        min={12}
        max={36}
        step={3}
      />

      <ControlledInput
        control={control}
        name="ownContribution"
        label="Udział własny"
        placeholder="Wpisz udział własny"
        suffix="zł"
        type="number"
      />

      {instalmentValue > 0 && (
        <div className="text-sm text-slate-800">
          Wysokość raty: {instalmentValue} zł
        </div>
      )}

      <Button>Potwierdź</Button>
    </form>
  );
};
