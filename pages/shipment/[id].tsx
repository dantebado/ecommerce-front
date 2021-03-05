import { GetServerSideProps } from "next";
import React from "react";
import { retrieveShipment } from "../../api/api";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { addressToReadableString, Shipment } from "../../interface/misc.model";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

export default function ShipmentView(props: { shipment: Shipment }) {
  const shipment = props.shipment;
  const { t } = useTranslation("common");
  const shipmentAddressString = addressToReadableString(
    shipment.shipment_address
  );

  return (
    <DefaultLayout>
      <Head>
        <title>{t("shipment-title")} - WalenGa</title>
        <meta name="description" content={t("meta-description-shipment")} />
      </Head>
      <div className="container mx-auto text-center px-4 py-8 dark:text-white">
        <p className="mb-6">
          {t("shipment-to-title", { shipmentId: shipment.id })}
        </p>

        <p className="my-3">
          {t("shipment-status-badge")}{" "}
          <b>{t("shipment-status-" + shipment.status)}</b>
        </p>
        <p className="my-3">
          {t("shipment-address-title")}: {shipmentAddressString}
        </p>

        <p className="mt-6">IP#{shipment.individual_purchase_id}</p>
      </div>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const shipmentId: any = query.id;
  const shipment = await retrieveShipment(shipmentId);

  return {
    props: {
      shipment: shipment.data,
    },
  };
};
