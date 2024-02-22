import { InputHTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props<T extends FieldValues> = {
  // Controller Props
  control: Control<T>;
  name: Path<T>;

  // InputProps
  label: string;
  placeholder: string;
  digitsOnly?: boolean;
  postCode?: boolean;
  suffix?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const ControlledInput = <T extends FieldValues>({
  control,
  name,
  label,
  digitsOnly,
  postCode,
  suffix,
  type,
  ...restProps
}: Props<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState: { error } }) => {
      const inputType = digitsOnly ? "text" : type;

      const handleDigitsOnly = (value: string) => {
        const hasValueLetters = value
          .split("")
          .some((digit) => isNaN(parseInt(digit)));

        if (hasValueLetters) {
          return;
        }

        field.onChange(value);
      };

      const handlePostCode = (value: string) => {
        const transformedValue = value.replace("-", "");

        if (transformedValue.length > 5) {
          return;
        }

        const hasValueLetters = transformedValue
          .split("")
          .some((digit) => isNaN(parseInt(digit)));

        if (hasValueLetters) {
          return;
        }

        let formattedInputValue = "";

        for (let i = 0; i < transformedValue.length; i++) {
          if (i === 2) {
            formattedInputValue += "-";
          }
          formattedInputValue += transformedValue[i];
        }

        field.onChange(formattedInputValue);
      };

      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (digitsOnly) {
          return handleDigitsOnly(value);
        }

        if (postCode) {
          return handlePostCode(value);
        }

        if (type === "number") {
          const validated = value.match(/^(\d*\.{0,1}\d{0,2}$)/);

          if (!validated) {
            return;
          }

          return field.onChange(value);
        }

        field.onChange(value);
      };

      return (
        <div className="flex flex-col gap-2">
          <Label htmlFor={field.name}>{label}</Label>
          <Input
            {...restProps}
            {...field}
            onChange={onChange}
            type={inputType}
            error={error}
            suffix={suffix}
          />
          {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
      );
    }}
  />
);
