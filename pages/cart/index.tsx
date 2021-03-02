import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import CartViewer from "../../components/cart/CartViewer";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { StateTypes } from "../../redux/Store";
import cogoToast from "cogo-toast";

export default function index() {
  const activeCart = useSelector((state: StateTypes) => state.activeCart);
  const router = useRouter();

  if (!activeCart) {
    router.push("/");
  }

  const checkoutTriggerHandler = () => {
    cogoToast.info("Dirigiéndote a Checkout");
    router.push("/checkout");
  };

  return (
    <DefaultLayout>
      {activeCart ? (
        <div className="container mx-auto py-6 text-center px-2">
          <p className="font-bold text-4xl">Carrito</p>
          <p className="mt-3">
            Aquí verás tu carrito. Para proceder con tu compra, hacé click en Ir
            a Checkout.
          </p>
          <div className="my-6">
            <CartViewer cart={activeCart} />
          </div>
          {activeCart.products.length > 0 ? (
            <div className="text-center">
              <button className="px-5 py-3" onClick={checkoutTriggerHandler}>
                Ir a Checkout
              </button>
            </div>
          ) : (
            <p>Tu Carrito está vacío</p>
          )}
        </div>
      ) : (
        <span></span>
      )}
    </DefaultLayout>
  );
}
