import { GetServerSideProps } from "next";
import React from "react";
import { retrieveShipment } from "../../api/api";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { addressToReadableString, Shipment } from "../../interface/misc.model";
import useTranslation from "next-translate/useTranslation";

export default function ShipmentView(props: { shipment: Shipment }) {
  const shipment = props.shipment;
  const { t } = useTranslation("common");
  const shipmentAddressString = addressToReadableString(
    shipment.shipment_address
  );

  return (
    <DefaultLayout>
      <div className="container text-center px-4 py-8">
        <p className="mb-6">
          {t("shipment-title", { shipmentId: shipment.id })}
        </p>

        <p className="my-3">
          {t("shipment-status-badge")}{" "}
          <b>{t("shipment-status-shipment.status")}</b>
        </p>
        <p className="my-3">
          {t("shipment-address")}: {shipmentAddressString}
        </p>

        <p className="mt-6">IP#{shipment.individual_purchase}</p>
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
