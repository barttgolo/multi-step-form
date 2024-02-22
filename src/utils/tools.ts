import { ProductStepForm } from "@/utils/schema";

export const calculateInstalmentValue = ({
  products,
  ownContribution,
  numberOfInstalment,
}: {
  products: ProductStepForm["products"];
  ownContribution: string;
  numberOfInstalment: string;
}) => {
  const productsValues = products.reduce((acc, curr) => {
    const { gross, quantity } = curr;

    const productFinalPrice = Number(gross) * Number(quantity);

    return acc + productFinalPrice;
  }, 0);

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
  const productsValues = products.reduce((acc, curr) => {
    const { gross, quantity } = curr;

    const productFinalPrice = Number(gross) * Number(quantity);

    return acc + productFinalPrice;
  }, 0);

  if (productsValues <= Number(ownContribution)) {
    return true;
  }

  return false;
};
