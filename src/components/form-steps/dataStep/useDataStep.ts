import { formStepAtom, formValuesAtom } from "@/utils/atoms";
import { DataStepForm, dataStepSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";

export const useDataStep = () => {
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

  return { control, handleSubmit, handleOnSubmit };
};
