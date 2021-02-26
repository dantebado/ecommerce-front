import { GetServerSideProps } from 'next'
import React from 'react'
import { retrieveShipment } from '../../api/api'
import DefaultLayout from '../../components/layouts/DefaultLayout'
import { addressToReadableString, Shipment } from '../../interface/misc.model'

export default function ShipmentView(props: {shipment: Shipment}) {
  const shipment = props.shipment
  const shipmentAddressString = addressToReadableString(shipment.shipmentAddress)

  return (
    <DefaultLayout>
      <div className="container text-center py-8">
        <h1 className="mb-6">Envío #{shipment.id}</h1>

        <p className="my-3">Estado de Envío <b>{shipment.status}</b></p>
        <p className="my-3">Dirección de Entrega: {shipmentAddressString}</p>

        <h4 className="mt-6">IP#{shipment.individualPurchaseId}</h4>
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const shipmentId: any = query.id
  const shipment = await retrieveShipment(shipmentId)

  return {
    props: {
      shipment: shipment
    }
  }
}