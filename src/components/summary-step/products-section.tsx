import { Button } from "@/components/ui/button";
import { formStepAtom, formValuesAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { EditIcon } from "lucide-react";

export const ProductsSection = () => {
  const [formValues] = useAtom(formValuesAtom);
  const [, setFormStep] = useAtom(formStepAtom);

  const { products } = formValues["productsStep"];

  return (
    <div className="flex flex-col gap-4 border-b border-slate-300 py-4">
      <div className="flex justify-between items-center">
        <div className="font-semibold">Produkty</div>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setFormStep("productsStep")}
        >
          <EditIcon />
        </Button>
      </div>
      {products.map(({ name, gross, vat, quantity }, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 bg-zinc-100 p-4 rounded-md"
        >
          <div className="font-semibold text-sm text-slate-800">
            Produkt nr. {index + 1}
          </div>
          <div className="text-sm text-slate-800">Nazwa: {name}</div>
          <div className="text-sm text-slate-800">Cena brutto: {gross} zł</div>
          <div className="text-sm text-slate-800">Vat: {vat}</div>
          <div className="text-sm text-slate-800">Ilość: {quantity}</div>
        </div>
      ))}
    </div>
  );
};
