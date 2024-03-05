import { ProductStepForm } from "@/utils/schema";

export const getTotalProductsPrice = (
  products: ProductStepForm["products"]
) => {
  return products.reduce((acc, curr) => {
    const { gross, quantity } = curr;

    const productFinalPrice = Number(gross) * Number(quantity);

    return acc + productFinalPrice;
  }, 0);
};

export const calculateInstalmentValue = ({
  products,
  ownContribution,
  numberOfInstalment,
}: {
  products: ProductStepForm["products"];
  ownContribution: string;
  numberOfInstalment: string;
}) => {
  const productsValues = getTotalProductsPrice(products);

  const instalmentValue =
    (productsValues - Number(ownContribution)) / Number(numberOfInstalment);

  return Number(instalmentValue.toFixed(2));
};

export const checkIfPaymentExceedsOrder = ({
  products,
  ownContribution,
}: {
  products: ProductStepForm["products"];
  ownContribution: string;
}) => {
  const productsValues = getTotalProductsPrice(products);

  return productsValues <= Number(ownContribution);
};
