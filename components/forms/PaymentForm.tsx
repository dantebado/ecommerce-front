import React, { useState } from 'react'
import { processPayment } from '../../api/api'
import { Payment } from '../../interface/misc.model'

export default function PaymentForm(props: {payment: Payment, callback: (payment: Payment) => any}) {
  const [payment] = useState(props.payment)

  const processPaymentHandler = () => {
    processPayment(payment.id, null)
      .then(proccesedPayment => {
        props.callback(proccesedPayment.data)
      })
      .catch(console.error)
  }

  return (
    <div className="mx-auto sm:w-3/4 p-4 border-radius-lg shadow-2">
      <h5>Procesando Pago ${payment.id}</h5>

      <button className="px-5 py-4 mt-3"
        onClick={processPaymentHandler} >
        Simular Pago JEJE
      </button>
    </div>
  )
}
