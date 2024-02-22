import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type Props<T extends FieldValues> = {
  // Controller Props
  control: Control<T>;
  name: Path<T>;

  // InputProps
  label: string;
  min: number;
  max: number;
  step: number;
};

export const ControlledSlider = <T extends FieldValues>({
  control,
  name,
  label,
  min,
  max,
  step,
}: Props<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState: { error } }) => (
      <div className="flex flex-col gap-4">
        <Label htmlFor={field.name}>
          {label}: {field.value}
        </Label>
        <Slider
          value={[Number(field.value)]}
          onValueChange={(val) => field.onChange(String(val[0]))}
          min={min}
          max={max}
          step={step}
          className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {error && <p className="text-sm text-red-500">{error.message}</p>}
      </div>
    )}
  />
);
