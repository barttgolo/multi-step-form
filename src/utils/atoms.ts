import {
  DataStepForm,
  PaymentStepForm,
  ProductStepForm,
  defaultDataStepValues,
  defaultPaymentStepValues,
  defaultProductStepValues,
} from "@/utils/schema";
import { withImmer } from "jotai-immer";
import { atom } from "jotai";

export type FormStepsAtom =
  | "dataStep"
  | "productsStep"
  | "paymentStep"
  | "summaryStep";

export const formStepAtom = atom<FormStepsAtom>("dataStep");

type FormValuesAtom = {
  dataStep: DataStepForm;
  productsStep: ProductStepForm;
  paymentStep: PaymentStepForm;
};

const defaultFormValuesAtom: FormValuesAtom = {
  dataStep: defaultDataStepValues,
  productsStep: defaultProductStepValues,
  paymentStep: defaultPaymentStepValues,
};

export const formValuesAtom = withImmer(
  atom<FormValuesAtom>(defaultFormValuesAtom)
);
