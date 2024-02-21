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
} & InputHTMLAttributes<HTMLInputElement>;

export const ControlledInput = <T extends FieldValues>({
  control,
  name,
  label,
  digitsOnly = false,
  postCode = false,
  ...restProps
}: Props<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState: { error } }) => {
      const { inputMode, type } = restProps;

      const inputKeyboardType = digitsOnly ? "numeric" : inputMode;

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
            inputMode={inputKeyboardType}
            className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
      );
    }}
  />
);
