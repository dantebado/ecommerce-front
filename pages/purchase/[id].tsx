import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { retrievePurchase } from "../../api/api";
import CartViewer from "../../components/cart/CartViewer";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import JoinPurchaseComponent from "../../components/purchases/JoinPurchaseComponent";
import { Purchase } from "../../interface/misc.model";

export default function PaymentView(props: { purchase: Purchase }) {
  const [purchase, setPurchase] = useState(props.purchase);
  let expirationDate = new Date(purchase.expiration_date);
  const { t } = useTranslation("common");

  const expirationCallback = () => {
    setPurchase({
      ...purchase,
      status: "expired",
    });
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto text-center py-8 px-2 dark:text-white">
        <p className="mb-6 font-bold text-2xl">
          {t("purchase-title", { purchaseId: purchase.id })}
        </p>

        <p className="my-2">
          {t("collaborative-name-title")}:{" "}
          {t(`boolean-yn-${purchase.clients_target > 1}`)}
        </p>
        <p className="my-2">
          {t("necessary-buyers")}: {purchase.clients_target}
        </p>
        <p className="my-2">
          {t("current-buyers")}: {purchase.current_confirmed_clients}
        </p>
        <p className="my-2">
          {t("remaining-buyers")}: {purchase.clients_left}
        </p>
        <p className="my-2">
          {t("confirmed-buyers")}:{" "}
          {purchase.clients_target_reached ? "Sí" : "No"}
        </p>

        <div className="my-6">
          <CartViewer cart={purchase.cart} />
        </div>

        <div className="my-6">
          {purchase.status == "awaiting-peers" ? (
            <div>
              <div className="text-4xl font-bold">
                <Countdown
                  date={expirationDate}
                  onComplete={expirationCallback}
                />
              </div>
              <JoinPurchaseComponent purchase={purchase} />
            </div>
          ) : (
            <div className="font-lg font-bold">
              <p>
                {t("purchase-status-badge")}
                {": "}
                <b>{t("purchase-status-" + purchase.status)}</b>
              </p>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const purchaseId: any = query.id;
  const purchase = await retrievePurchase(purchaseId);

  return {
    props: {
      purchase: purchase.data,
    },
  };
};
