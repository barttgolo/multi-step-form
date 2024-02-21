import { z } from "zod";

export const dataStepSchema = z.object({
  nip: z
    .string()
    .min(1, "Pole jest wymagane.")
    .min(10, "Minimalnie 10 znaków."),
  city: z
    .string()
    .min(1, "Pole jest wymagane.")
    .max(100, "Wpisana wartość jest za długa."),
  street: z
    .string()
    .min(1, "Pole jest wymagane.")
    .max(100, "Wpisana wartość jest za długa."),
  postCode: z
    .string()
    .min(1, "Pole jest wymagane.")
    .max(6, "Wpisana wartość jest za długa."),
});
export type DataStepForm = z.infer<typeof dataStepSchema>;

export const defaultDataStepValues: DataStepForm = {
  nip: "",
  city: "",
  street: "",
  postCode: "",
};
