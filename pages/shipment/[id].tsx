import { GetServerSideProps } from "next";
import React from "react";
import { retrieveShipment } from "../../api/api";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { addressToReadableString, Shipment } from "../../interface/misc.model";

export default function ShipmentView(props: { shipment: Shipment }) {
  const shipment = props.shipment;
  const shipmentAddressString = addressToReadableString(
    shipment.shipment_address
  );

  return (
    <DefaultLayout>
      <div className="container text-center py-8">
        <p className="mb-6">Envío #{shipment.id}</p>

        <p className="my-3">
          Estado de Envío <b>{shipment.status}</b>
        </p>
        <p className="my-3">Dirección de Entrega: {shipmentAddressString}</p>

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
