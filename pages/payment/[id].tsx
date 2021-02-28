import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { retrieveIndividualPurchase, retrievePayment } from '../../api/api'
import CartViewer from '../../components/cart/CartViewer'
import PaymentForm from '../../components/forms/PaymentForm'
import DefaultLayout from '../../components/layouts/DefaultLayout'
import CurrencyDisplay from '../../components/utils/CurrencyDisplay'
import { addressToReadableString, IndividualPurchase, Payment } from '../../interface/misc.model'

export default function PaymentView(props: {payment: Payment}) {
  const payment = props.payment
  
  const router = useRouter()
  const [processedPayment, setProcessedPayment] = useState(null)
  const [individualPurchase, setIndividualPurchase] = useState(null)
  const [isPaying, setIsPaying] = useState(false)

  let iPurchase: IndividualPurchase = individualPurchase
  let shipmentAddressString = iPurchase ? addressToReadableString(individualPurchase.shipment.shipmentAddress) : 'Cargando'

  useEffect(() => {
    retrieveIndividualPurchase(payment.individualPurchase)
      .then(individualPurchase => {
        if (individualPurchase.payment.status !== 'pending') {
          console.error("payment is not pending")
          router.push("/")
        } else {
          setIndividualPurchase(individualPurchase)
        }
      })
      .catch(console.error)
  }, [])

  const paymentProcessingCallback = (payment: Payment) => {
    setProcessedPayment(payment)
  }

  return (
    <DefaultLayout>
      <div className="container text-center px-2">
        <h1 className="my-5">Pagar</h1>
        {
          individualPurchase && !processedPayment ? (
            <div className="text-left my-3">
              <h3>Compra #{iPurchase.id}-#{iPurchase.purchase.id}</h3>
              <div className="my-3">
                <CartViewer cart={iPurchase.purchase.cart} />
              </div>

              <h3 className="my-3">Datos de Envío</h3>
              <p>Envío a {shipmentAddressString}</p>

              <h3 className="my-3">Compra Individual {iPurchase.id} / General {iPurchase.purchase.id}</h3>
              
              <div className="text-center">
                <h1 className="my-4">Pagar Ahora</h1>

                <h5 className="my-3">Productos</h5>
                <h4><CurrencyDisplay amount={iPurchase.purchase.cartPrice} /></h4>
                
                <h5 className="my-3">Envío</h5>
                <h4>$ 0.00</h4>

                <h5 className="my-3">Ahorro por Colaborativa</h5>
                <h4>- <CurrencyDisplay amount={iPurchase.purchase.discountAmount} /></h4>

                <h5 className="my-3 pt-3 border-top sm:w-1/2 sm:mx-auto">TOTAL</h5>
                <h4><CurrencyDisplay amount={iPurchase.purchase.amountToPay} /></h4>

                <button
                  className="display-block px-4 py-3 text-uppercase mx-auto my-6"
                  onClick={(e) => setIsPaying(true)} >
                  Pagar Ahora
                </button>

                {
                  isPaying ? (
                    <PaymentForm callback={paymentProcessingCallback} payment={iPurchase.payment} />
                  ) : ( <span></span> )
                }

              </div>
            </div>
          ) : (<span></span>)
        }
        {
          processedPayment ? (
            <Fragment>
              <h3 className="mb-3">Resultado del Pago</h3>

              <p>Pago resultado en <b>{processedPayment.status}</b></p>
              <div>
                <Link href={`/purchase/${iPurchase.purchase.id}`}>
                  <button className="mt-3 px-3 py-2">Ir a Estado de Compra</button>
                </Link>
              </div>
            </Fragment>
          ) : (<span></span>)
        }

        <h6 className="my-6">Ref#{payment.id}</h6>
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const paymentId: any = query.id
  const payment = await retrievePayment(paymentId)

  return {
    props: {
      payment: payment
    }
  }
}