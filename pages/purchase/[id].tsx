import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { retrievePurchase } from '../../api/api'
import CartViewer from '../../components/cart/CartViewer'
import DefaultLayout from '../../components/layouts/DefaultLayout'
import JoinPurchaseComponent from '../../components/purchases/JoinPurchaseComponent'
import { Purchase } from '../../interface/misc.model'

export default function PaymentView(props: {purchase: Purchase}) {
  const [purchase, setPurchase] = useState(props.purchase)
  let expirationDate = new Date(purchase.expirationDate)

  const expirationCallback = () => {
    setPurchase({
      ...purchase,
      status:'expired'
    })
  }

  return (
    <DefaultLayout>
      <div className="container text-center py-8 px-2">
        <h1 className="mb-6">Compra #{purchase.id}</h1>

        <p className="my-2">Compra Colaborativa: {purchase.clientsTarget > 1 ? 'Sí' : 'No'}</p>
        <p className="my-2">Compradores Necesarios: {purchase.clientsTarget}</p>
        <p className="my-2">Compradores Actuales: {purchase.currentConfirmedClients}</p>
        <p className="my-2">Compradores Restantes: {purchase.clientsLeft}</p>
        <p className="my-2">Compradores Alcanzados: {purchase.clientsTargetReached ? 'Sí' : 'No'}</p>

        <div className="my-6">
          <CartViewer cart={purchase.cart} />
        </div>

        <div className="my-6">
          {
            purchase.status == 'awaiting-peers' ? (
              <div>
                <div className="font-lg font-bold">
                  <Countdown date={expirationDate} onComplete={expirationCallback} />
                </div>
                <JoinPurchaseComponent purchase={purchase} />     
              </div>       
            ) : (
              <div className="font-lg font-bold">
                <p>Estado de Compra <b>{purchase.status}</b></p>
              </div>
            )
          }
        </div>
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const purchaseId: any = query.id
  const purchase = await retrievePurchase(purchaseId)

  return {
    props: {
      purchase: purchase
    }
  }
}