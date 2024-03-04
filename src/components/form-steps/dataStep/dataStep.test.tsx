import { DataStep } from "@/components/form-steps/dataStep/data-step";
import { render } from "@/setupTests";

describe("Tests for DataStep", () => {
  test("Validators on DataStep works correctly", () => {
    const screen = render(<DataStep />);

    const nipInput = screen.getByTestId("nip");
    expect(nipInput).toBeInTheDocument();

    //await fireEvent(..)
  });
});
