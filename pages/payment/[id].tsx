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

export default function PaymentView(props: { payment: Payment }) {
  const payment = props.payment;

  const router = useRouter();
  const [processedPayment, setProcessedPayment] = useState(null);
  const [individualPurchase, setIndividualPurchase] = useState(null);
  const [isPaying, setIsPaying] = useState(false);

  let iPurchase: IndividualPurchase = individualPurchase;
  let shipmentAddressString = iPurchase
    ? addressToReadableString(individualPurchase.shipment.shipment_address)
    : "Cargando";

  useEffect(() => {
    retrieveIndividualPurchase(payment.individual_purchase_id)
      .then((individualPurchase) => {
        if (individualPurchase.data.payment.status !== "pending") {
          cogoToast.error("Tu pago no está pendiente");
          router.push("/");
        } else {
          setIndividualPurchase(individualPurchase.data);
        }
      })
      .catch((err) => cogoToast.error("Error obteniendo tu compra"));
  }, []);

  const paymentProcessingCallback = (result: boolean) => {
    //asd
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto text-center px-2">
        <p className="my-5 text-4xl font-bold">Pagar</p>
        {individualPurchase && !processedPayment ? (
          <div className="text-left my-3">
            <div className="my-3">
              <CartViewer cart={iPurchase.purchase.cart} />
            </div>

            <p className="my-3 font-bold text-lg">Datos de Envío</p>
            <p>Envío gratuito a {shipmentAddressString}</p>

            <div className="text-center">
              <p className="my-4 uppercase text-2xl font-bold">Pagar Ahora</p>

              <p className="my-3 font-bold text-lg">Productos</p>
              <p>
                <CurrencyDisplay amount={iPurchase.purchase.cart_price} />
              </p>

              <p className="my-3 font-bold text-lg">Envío</p>
              <p>$ 0.00</p>

              <p className="my-3 font-bold text-lg">Ahorro por Colaborativa</p>
              <p>
                -{" "}
                <CurrencyDisplay amount={iPurchase.purchase.discount_amount} />
              </p>

              <p className="my-3 pt-3 border-t uppercase font-bold text-lg">
                Total
              </p>
              <p>
                <CurrencyDisplay amount={iPurchase.purchase.amount} />
              </p>

              <button
                className="block px-4 py-3 uppercase mx-auto my-6"
                onClick={(e) => setIsPaying(true)}
              >
                Pagar Ahora
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
            <p className="mb-3">Resultado del Pago</p>

            <p>
              Pago resultado en <b>{processedPayment.status}</b>
            </p>
            <div>
              <Link href={`/purchase/${iPurchase.purchase.id}`}>
                <button className="mt-3 px-3 py-2">
                  Ir a Estado de Compra
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
