import { z } from "zod";

export const BASE_VALIDATORS={
  NIP:  z
    .string()
    .min(1, "Pole jest wymagane.")
    .min(10, "Minimalnie 10 znaków.")
}

export const dataStepSchema = z.object({
  nip: BASE_VALIDATORS.NIP,
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
    .min(6, "Wpisana wartość jest za krótka."),
});

export type DataStepForm = z.infer<typeof dataStepSchema>;

export const defaultDataStepValues: DataStepForm = {
  nip: "",
  city: "",
  street: "",
  postCode: "",
};

export const productsStepSchema = z.object({
  products: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, "Pole jest wymagane.")
          .max(100, "Wpisana wartość jest za długa."),
        gross: z
          .string()
          .min(1, "Pole jest wymagane.")
          .refine((val) => Number(val) > 0, {
            message: "Wartość musi być większa od 0.",
          }),
        quantity: z.string().min(1, "Pole jest wymagane."),
        vat: z.string().min(1, "Pole jest wymagane."),
      }),
    )
    .min(1, "Wymagane jest dodanie przynajmniej jednego produktu"),
});

export type ProductStepForm = z.infer<typeof productsStepSchema>;

export const defaultProductStepValues: ProductStepForm = {
  products: [
    {
      name: "",
      gross: "",
      quantity: "",
      vat: "",
    },
  ],
};

export const paymentStepSchema = z.object({
  numberOfInstalment: z.string(),
  ownContribution: z
    .string()
    .min(1, "Pole jest wymagane.")
    .max(10, "Wpisana wartość jest za długa"),
});

export type PaymentStepForm = z.infer<typeof paymentStepSchema>;

export const defaultPaymentStepValues: PaymentStepForm = {
  numberOfInstalment: "12",
  ownContribution: "0",
};
