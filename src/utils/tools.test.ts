import { ProductStepForm } from "@/utils/schema";
import {
  calculateInstalmentValue,
  checkIfPaymentExceedsOrder,
  getTotalProductsPrice,
} from "@/utils/tools";

const products: ProductStepForm["products"] = [
  { name: "Product 1", gross: "10", quantity: "2", vat: "5" },
  { name: "Product 2", gross: "20", quantity: "1", vat: "5" },
];

describe("getTotalProductsPrice function", () => {
  test("returns 0 if there are no products", () => {
    const emptyProducts: ProductStepForm["products"] = [];

    expect(getTotalProductsPrice(emptyProducts)).toBe(0);
  });

  test("correctly calculates total price for products", () => {
    const result = getTotalProductsPrice(products);

    expect(result).toBe(40);
  });
});

describe("calculateInstalmentValue function", () => {
  test("correctly calculates instalment value", () => {
    const ownContribution = "20";
    const numberOfInstalment = "2";

    const result = calculateInstalmentValue({
      products,
      ownContribution,
      numberOfInstalment,
    });

    expect(result).toBe(10);
  });
});

describe("checkIfPaymentExceedsOrder function", () => {
  test("returns true if payment exceeds order", () => {
    const ownContribution = "100";

    const result = checkIfPaymentExceedsOrder({ products, ownContribution });

    expect(result).toBe(true);
  });

  test("returns false if payment does not exceed order", () => {
    const ownContribution = "30";

    const result = checkIfPaymentExceedsOrder({ products, ownContribution });

    expect(result).toBe(false);
  });
});
