import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled-input";
import { ControlledSelect } from "@/components/ui/controlled-select";
import { formValuesAtom, formStepAtom } from "@/utils/atoms";
import {
  ProductStepForm,
  defaultProductStepValues,
  productsStepSchema,
} from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { Trash } from "lucide-react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

export const ProductsStep = () => {
  const [formValues, setFormValues] = useAtom(formValuesAtom);
  const [, setFormStep] = useAtom(formStepAtom);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductStepForm>({
    resolver: zodResolver(productsStepSchema),
    defaultValues: formValues["productsStep"],
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const handleOnSubmit: SubmitHandler<ProductStepForm> = (formData) => {
    setFormValues((draft) => {
      draft.productsStep = formData;
    });

    setFormStep("paymentStep");
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <Button
        type="button"
        variant="secondary"
        onClick={() => append(defaultProductStepValues.products)}
      >
        Dodaj produkt
      </Button>

      {errors.products?.root?.message && (
        <p className="text-sm text-red-500">{errors.products?.root?.message}</p>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col gap-4 bg-zinc-100 p-3 rounded-md"
        >
          <div className="text-center font-bold">Produkt nr. {index + 1}</div>
          <ControlledInput
            control={control}
            name={`products.${index}.name`}
            label="Nazwa produktu"
            placeholder="Laptop"
          />

          <ControlledInput
            control={control}
            name={`products.${index}.gross`}
            label="Wartość brutto"
            placeholder="np. 2000"
            suffix="zł"
            type="number"
          />

          <ControlledSelect
            control={control}
            name={`products.${index}.vat`}
            label="Vat"
            options={["23%", "8%", "5%", "0%"]}
            placeholder="np. 23%"
          />

          <ControlledSelect
            control={control}
            name={`products.${index}.quantity`}
            label="Ilość produktów"
            options={Array.from({ length: 100 }, (_, index) =>
              String(index + 1)
            )}
            placeholder="np. 3"
          />

          <div className="w-full flex justify-end">
            <Button
              size="icon"
              variant="destructive"
              type="button"
              onClick={() => remove(index)}
            >
              <Trash />
            </Button>
          </div>
        </div>
      ))}

      <Button>Potwierdź</Button>
    </form>
  );
};