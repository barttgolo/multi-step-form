import { DataStep } from "@/components/form-steps/dataStep/data-step";
import { fireEvent, render, renderHook, screen, waitFor } from "@/setupTests";
import { formStepAtom, formValuesAtom } from "@/utils/atoms";
import { defaultDataStepValues } from "@/utils/schema";
import { useAtomValue } from "jotai";

describe("Tests for DataStep", () => {
  test("Validators - when submitting empty form show 4 error messages", async () => {
    render(<DataStep />);

    const submitButton = screen.getByRole("button", {
      name: "Potwierdź",
    });

    fireEvent.click(submitButton);

    const errorMessages = await screen.findAllByText("Pole jest wymagane.");

    expect(errorMessages.length).toBe(4);
  });

  test("Validators - error message displays when NIP is too short", async () => {
    render(<DataStep />);

    const nipInput = screen.getByTestId("nip");
    fireEvent.change(nipInput, { target: { value: "12345" } });

    const submitButton = screen.getByRole("button", { name: "Potwierdź" });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Minimalnie 10 znaków.")
    ).toBeInTheDocument();
  });

  test("Validators - error message displays when post code is too short", async () => {
    render(<DataStep />);

    const postCodeInput = screen.getByTestId("postCode");
    fireEvent.change(postCodeInput, { target: { value: "1234" } });

    const submitButton = screen.getByRole("button", { name: "Potwierdź" });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Wpisana wartość jest za krótka.")
    ).toBeInTheDocument();
  });

  test("Submitting with valid data updates form values and form step", async () => {
    render(<DataStep />);

    const { result: formValuesResult } = renderHook(() =>
      useAtomValue(formValuesAtom)
    );

    const { result: formStepResult } = renderHook(() =>
      useAtomValue(formStepAtom)
    );

    expect(formStepResult.current).toBe("dataStep");
    expect(formValuesResult.current.dataStep).toBe(defaultDataStepValues);

    const inputData = {
      nip: "1234567890",
      city: "Warszawa",
      street: "ul. Nowa 5",
      postCode: "00-001",
    };

    Object.entries(inputData).forEach(([field, value]) => {
      const input = screen.getByTestId(field);
      fireEvent.change(input, { target: { value } });
    });

    const submitButton = screen.getByRole("button", {
      name: "Potwierdź",
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(formStepResult.current).toBe("productsStep");
      expect(formValuesResult.current.dataStep).toStrictEqual(inputData);
    });
  });
});
