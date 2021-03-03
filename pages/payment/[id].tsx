import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { retrieveIndividualPurchase, retrievePayment } from "../../api/api";
import CartViewer from "../../components/cart/CartViewer";
import PaymentForm from "../../components/forms/PaymentForm";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import CurrencyDisplay from "../../components/utils/CurrencyDisplay";
import {
  addressToReadableString,
  IndividualPurchase,
  Payment,
} from "../../interface/misc.model";
import cogoToast from "cogo-toast";
import useTranslation from "next-translate/useTranslation";

export default function PaymentView(props: { payment: Payment }) {
  const payment = props.payment;

  const router = useRouter();
  const [processedPayment] = useState(null);
  const [individualPurchase, setIndividualPurchase] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const { t } = useTranslation("common");

  let iPurchase: IndividualPurchase = individualPurchase;
  let shipmentAddressString = iPurchase
    ? addressToReadableString(individualPurchase.shipment.shipment_address)
    : t("loading");

  useEffect(() => {
    retrieveIndividualPurchase(payment.individual_purchase_id)
      .then((individualPurchase) => {
        if (individualPurchase.data.payment.status !== "pending") {
          cogoToast.error(t("payment-not-pending"));
          router.push("/");
        } else {
          setIndividualPurchase(individualPurchase.data);
        }
      })
      .catch((err) => cogoToast.error(t("error-fetching-purchase")));
  }, []);

  const paymentProcessingCallback = (result: boolean) => {
    //asd
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto text-center px-2">
        <p className="my-5 text-4xl font-bold">{t("pay-title")}</p>
        {individualPurchase && !processedPayment ? (
          <div className="text-left my-3">
            <div className="my-3">
              <CartViewer cart={iPurchase.purchase.cart} />
            </div>

            <p className="my-3 font-bold text-lg">{t("shipment-data-title")}</p>
            <p>
              {t("free-shipment-to")} {shipmentAddressString}
            </p>

            <div className="text-center">
              <p className="my-4 uppercase text-2xl font-bold">
                {t("pay-now-badge")}
              </p>

              <p className="my-3 font-bold text-lg">{t("products-badge")}</p>
              <p>
                <CurrencyDisplay amount={iPurchase.purchase.cart_price} />
              </p>

              <p className="my-3 font-bold text-lg">{t("shipment-badge")}</p>
              <p>$ 0.00</p>

              <p className="my-3 font-bold text-lg">{t("collab-savings")}</p>
              <p>
                -{" "}
                <CurrencyDisplay amount={iPurchase.purchase.discount_amount} />
              </p>

              <p className="my-3 pt-3 border-t uppercase font-bold text-lg">
                {t("total-badge")}
              </p>
              <p>
                <CurrencyDisplay amount={iPurchase.purchase.amount} />
              </p>

              <button
                className="block px-4 py-3 uppercase mx-auto my-6"
                onClick={(e) => setIsPaying(true)}
              >
                {t("pay-now-badge")}
              </button>

              {isPaying ? (
                <PaymentForm
                  callback={paymentProcessingCallback}
                  payment={iPurchase.payment}
                  purchaseId={iPurchase.purchase.id}
                />
              ) : (
                <span></span>
              )}
            </div>
          </div>
        ) : (
          <span></span>
        )}
        {processedPayment ? (
          <Fragment>
            <p className="mb-3">{t("payment-result-title")}</p>

            <p>
              {t("payment-in-current-status")}{" "}
              <b>{t("payment-status-" + processedPayment.status)}</b>
            </p>
            <div>
              <Link href={`/purchase/${iPurchase.purchase.id}`}>
                <button className="mt-3 px-3 py-2">
                  {t("go-to-purchase-status")}
                </button>
              </Link>
            </div>
          </Fragment>
        ) : (
          <span></span>
        )}

        <p className="my-6">Ref#{payment.id}</p>
      </div>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const paymentId: any = query.id;
  const payment = await retrievePayment(paymentId);

  return {
    props: {
      payment: payment.data,
    },
  };
};
