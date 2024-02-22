import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  // Controller Props
  control: Control<T>;
  name: Path<T>;

  // InputProps
  label: string;
  placeholder: string;
  options: string[];
};

export const ControlledSelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2">
          <Label htmlFor={field.name}>{label}</Label>

          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              className={`w-full ${field.value ? "" : "text-slate-500"}`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
      )}
    />
  );
};
