import { Button } from "@/components/ui/button";
import { formStepAtom, formValuesAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { EditIcon } from "lucide-react";

export const AddressSection = () => {
  const [formValues] = useAtom(formValuesAtom);
  const [, setFormStep] = useAtom(formStepAtom);

  const { nip, street, postCode, city } = formValues["dataStep"];

  return (
    <div className="flex flex-col gap-1 border-b border-slate-300 py-4">
      <div className="flex justify-between items-center">
        <div className="font-semibold">Dane</div>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setFormStep("dataStep")}
        >
          <EditIcon />
        </Button>
      </div>
      <div className="flex flex-col gap-1 px-4">
        <div className="text-sm text-slate-800">NIP: {nip}</div>
        <div className="text-sm text-slate-800">
          Adres: {street}, {postCode} {city}
        </div>
      </div>
    </div>
  );
};
