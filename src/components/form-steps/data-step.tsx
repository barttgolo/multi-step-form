import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled-input";
import { formStepAtom, formValuesAtom } from "@/utils/atoms";
import { DataStepForm, dataStepSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";

export const DataStep = () => {
  const [formValues, setFormValues] = useAtom(formValuesAtom);
  const [, setFormStep] = useAtom(formStepAtom);

  const { control, handleSubmit } = useForm<DataStepForm>({
    resolver: zodResolver(dataStepSchema),
    defaultValues: formValues["dataStep"],
  });

  const handleOnSubmit: SubmitHandler<DataStepForm> = (formData) => {
    setFormValues((draft) => {
      draft.dataStep = formData;
    });

    setFormStep("productsStep");
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <ControlledInput
        control={control}
        name="nip"
        label="Nip firmy"
        placeholder="np. 0123456789"
        digitsOnly
        maxLength={10}
      />

      <ControlledInput
        control={control}
        name="city"
        label="Miasto"
        placeholder="np. Warszawa"
      />

      <ControlledInput
        control={control}
        name="street"
        label="Ulica"
        placeholder="np. Długa 12"
      />

      <ControlledInput
        control={control}
        name="postCode"
        label="Kod pocztowy"
        placeholder="np. 00-005"
        postCode
      />

      <Button>Potwierdź</Button>
    </form>
  );
};
