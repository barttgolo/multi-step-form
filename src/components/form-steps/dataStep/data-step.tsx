import { useDataStep } from "@/components/form-steps/dataStep/useDataStep";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled-input";

export const DataStep = () => {
  const { control, handleSubmit, handleOnSubmit } = useDataStep();

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <ControlledInput
        control={control}
        name="nip"
        label="NIP firmy"
        placeholder="Wprowadź NIP"
        digitsOnly
        maxLength={10}
        data-testId="nip"
      />

      <ControlledInput
        control={control}
        name="city"
        label="Miasto"
        placeholder="Wprowadź miasto"
        data-testId="city"
      />

      <ControlledInput
        control={control}
        name="street"
        label="Ulica"
        placeholder="Wprowadź ulicę i numer mieszkania"
        data-testId="street"
      />

      <ControlledInput
        control={control}
        name="postCode"
        label="Kod pocztowy"
        placeholder="Wprowadź kod pocztowy"
        postCode
        data-testId="postCode"
      />

      <Button>Potwierdź</Button>
    </form>
  );
};
