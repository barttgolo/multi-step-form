import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { DataStep } from "@/components/form-steps/dataStep/data-step";

describe("Tests for DataStep", () => {
  test("Validators on DataStep works correctly", () => {
    render(<DataStep />);
    const nipInput = screen.getByTestId("nip");
    expect(nipInput).toBeInTheDocument();

    //await fireEvent(..)
  });
});
