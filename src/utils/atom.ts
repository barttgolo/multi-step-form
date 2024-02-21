import { DataStepForm, defaultDataStepValues } from "@/utils/schema";
import { atomWithStorage } from "jotai/utils";
import { withImmer } from "jotai-immer";

type FormAtom = {
  dataStep: DataStepForm;
};

const defaultFormAtomValues: FormAtom = {
  dataStep: defaultDataStepValues,
};

export const formAtom = withImmer(
  atomWithStorage<FormAtom>("form-data", defaultFormAtomValues)
);
