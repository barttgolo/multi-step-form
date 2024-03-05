import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
