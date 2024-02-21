import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DataStepForm,
  dataStepSchema,
  defaultDataStepValues,
} from "@/utlis/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

// NIP firmy, miasto, ulica, kod pocztowy

export const DataStep = () => {
  const { handleSubmit } = useForm<DataStepForm>({
    resolver: zodResolver(dataStepSchema),
    defaultValues: defaultDataStepValues,
  });

  const handleOnSubmit: SubmitHandler<DataStepForm> = (formData) => {
    console.log(formData);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="nip">NIP firmy</Label>
        <Input id="nip" placeholder="np. 0123456789" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="city">Miasto</Label>
        <Input id="city" placeholder="np. Warszawa" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="street">Ulica</Label>
        <Input id="street" placeholder="np. Długa 12" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="postCode">Kod pocztowy</Label>
        <Input id="postCode" placeholder="np. 00-005" />
      </div>
      <Button>Potwierdź</Button>
    </form>
  );
};
