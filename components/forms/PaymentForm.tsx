import React, { useState } from 'react'
import { processPayment } from '../../api/api'
import { Payment } from '../../interface/misc.model'
import MercadoPagoWrapper from '../payment/MercadoPagoWrapper'
import cogoToast from 'cogo-toast';
import { useRouter } from 'next/router';

export default function PaymentForm(props: {payment: Payment, purchaseId: string | number, amount: number, callback: (result: boolean) => any}) {
  const [payment] = useState(props.payment)
  const router = useRouter()

  const processPaymentHandler = (payload) => {
    processPayment(payment.id, payload)
      .then(proccesedPayment => {
        props.callback(true)
        cogoToast.success("Tu pago fue procesado con éxito")
        router.push("/purchase/" + props.purchaseId)
      })
      .catch(err => {
        props.callback(false)
        cogoToast.error("Error al procesar tu pago")
        router.push("/")
      })
  }

  return (
    <div className="mx-auto sm:w-3/4 p-4 border-radius-lg shadow-2">
      <MercadoPagoWrapper payment={payment} callback={processPaymentHandler} amount={props.amount} />
    </div>
  )
}
