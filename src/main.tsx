import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DataStepForm } from "@/routes/data-step";
import "@/index.css";
import { Layout } from "@/components/ui/layout";
import { ProductsStep } from "@/routes/products-step";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        index: true,
        element: <DataStep />,
      },
      {
        path: "/products-step",
        element: <ProductsStep />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Multi step form:
// Stwórz multistep form składający się z 4 kroków.
// 1. Na pierwszym ekranie wpisz NIP firmy, miasto, ulica, kod pocztowy
// 2. Na drugim ekranie stwórz dynamiczny formularz który pozwoli wpisać listę produktów. Produkt składa się z pól:
// * nazwa
// * wartość brutto
// * ilość
// * vat
// Tutaj chciałbym żeby user mógł sobie dodać X produktów
// 3. Na trzecim ekranie pozwól wybrać użytkownikowi ilość rat np. 12, 15, 18 (chodzi mi o jakiś zakres) i wpisać udział własny
// 4. Ekran podsumowania który wyświetli wszystkie wprowadzone dane w czytelnej dla użytkownika formie
