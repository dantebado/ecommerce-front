import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import CartViewer from "../../components/cart/CartViewer";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { StateTypes } from "../../redux/Store";
import cogoToast from "cogo-toast";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

export default function index() {
  const activeCart = useSelector((state: StateTypes) => state.activeCart);
  const router = useRouter();
  const { t } = useTranslation("common");

  const checkoutTriggerHandler = () => {
    cogoToast.info(t("redirecting-to-checkout"));
    router.push("/checkout");
  };

  return (
    <DefaultLayout>
      <Head>
        <title>{t("cart-title")} - WalenGa</title>
        <meta name="og:title" content={`${t("cart-title")} - WalenGa`} />
        <meta name="description" content={t("meta-description-cart")} />
      </Head>
      {activeCart?.id ? (
        <div className="container mx-auto py-6 text-center px-2 dark:text-white">
          <p className="font-bold text-4xl">{t("cart-title")}</p>
          <div className="my-6">
            <CartViewer cart={activeCart} />
          </div>
          {activeCart.products.length > 0 ? (
            <div className="text-center">
              <button className="px-5 py-3" onClick={checkoutTriggerHandler}>
                {t("go-to-checkout-button")}
              </button>
            </div>
          ) : (
            <p>{t("empty-cart-disclamer")}</p>
          )}
        </div>
      ) : (
        <span></span>
      )}
    </DefaultLayout>
  );
}
