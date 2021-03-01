import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Payment } from '../../interface/misc.model'
import style from './mp.module.scss'

export default function MercadoPagoWrapper(props: {payment: Payment}) {
  const mpPublicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY
  const [processing, setProcessing] = useState(false)

  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiringMonth: '',
    expiringYear: '',
    cardholderName: '',
    cvc: '',
    issuer: '',
    installments: 1
  })

  const [payerDetails, setPayerDetails] = useState({
    email: '',
    idType: '',
    idNumber: ''
  })

  const inputPayerHandler = (field, value) => {
    let idTypeInput: any = document.getElementById('docType')
    let idTypeValue = idTypeInput.value

    setPayerDetails({
      ...payerDetails,
      [field]: value,
      idType: idTypeValue
    })

  }

  const inputCardHandler = (field, value) => {
    let issuerInput: any = document.getElementById('issuer')
    let issuerValue = issuerInput.value

    if (field === 'number') {
      value = value.replaceAll(' ', '')
    }
    setCardDetails({
      ...cardDetails,
      [field]: value,
      issuer: issuerValue
    })
  }

  useEffect(() => {
    setTimeout(() => {
      let w: any = window
      w.Mercadopago.setPublishableKey(mpPublicKey);
      w.Mercadopago.getIdentificationTypes();
    }, 1000);
  }, [])

  const onFormSubmit = (e) => {
    setProcessing(true)
    e.preventDefault()
    let w: any = window
    let form = document.getElementById('paymentForm');
    w.Mercadopago.createToken(form, setCardTokenAndPay);
  }

  const setCardTokenAndPay = (status, response) => {
    if (status == 200 || status == 201) {
        let form = document.getElementById('paymentForm');
        let card = document.createElement('input');
        card.setAttribute('name', 'token');
        card.setAttribute('type', 'hidden');
        card.setAttribute('value', response.id);
        form.appendChild(card);
        console.log("mprseponse", response)
    } else {
        console.log("Verify filled data!\n"+JSON.stringify(response, null, 4));
        setProcessing(false)
    }
 };

 const validPayer = () => {
   return payerDetails.email != '' && payerDetails.idNumber != '' && payerDetails.idType != ''
 }

 const validCard = () => {
   return cardDetails.cardholderName && cardDetails.cvc && cardDetails.cvc &&
    cardDetails.expiringMonth && cardDetails.expiringYear && cardDetails.installments >= 1 &&
    cardDetails.number
 }

 const allowed = validPayer()

  return (
    <div>
      <Head>
        <script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>
        <script src="/mp.js"></script>
      </Head>
      <form id="paymentForm" className={style.MPForm}>
        <h3>Detalles del comprador</h3>
        <div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" disabled={processing} type="text" value={payerDetails.email} onChange={(e) => inputPayerHandler('email', e.target.value)} />
          </div>
          <div className="md:flex flex-row items-center justify-between">
            <div className="w-1/2 pr-3">
              <label htmlFor="docType">Tipo de documento</label>
              <select id="docType" name="docType" disabled={processing} data-checkout="docType" value={payerDetails.idType} onChange={(e) => inputPayerHandler('idType', e.target.value)}>
                <option value={''}>Tipo de Documento</option>
              </select>
            </div>
            <div className="w-1/2 pl-3">
              <label htmlFor="docNumber">Número de documento</label>
              <input id="docNumber" name="docNumber" disabled={processing} data-checkout="docNumber" type="text" value={payerDetails.idNumber} onChange={(e) => inputPayerHandler('idNumber', e.target.value)}/>
            </div>
          </div>
        </div>
        <h3>Detalles de la tarjeta</h3>
        <div>
          <div className="flex flex-row items-center justify-between">
            <div className="w-3/4">
              <label htmlFor="cardNumber">Número de la tarjeta</label>
              <input type="text" id="cardNumber" disabled={processing} autoComplete="false" data-checkout="cardNumber" value={cardDetails.number} onChange={(e) => inputCardHandler('number', e.target.value)} />
            </div>
            <div className="w-1/4 pl-6">
              <label htmlFor="securityCode">CVC</label>
              <input id="securityCode" data-checkout="securityCode" disabled={processing} autoComplete="false" type="text" maxLength={4} value={cardDetails.cvc} onChange={(e) => inputCardHandler('cvc', e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="cardholderName">Titular de la tarjeta</label>
            <input id="cardholderName" data-checkout="cardholderName" disabled={processing} type="text" value={cardDetails.cardholderName} onChange={(e) => inputCardHandler('cardholderName', e.target.value)} />
          </div>
          <div>
            <label htmlFor="">Fecha de vencimiento</label>
            <div className="flex flex-row items-center justify-between">
              <input type="text" placeholder="MM" id="cardExpirationMonth" autoComplete="false" disabled={processing} data-checkout="cardExpirationMonth" maxLength={2} value={cardDetails.expiringMonth} onChange={(e) => inputCardHandler('expiringMonth', e.target.value)} />
              <span className="p-3 display-inline">/</span>
              <input type="text" placeholder="YY" id="cardExpirationYear" autoComplete="false" disabled={processing} data-checkout="cardExpirationYear" maxLength={2} value={cardDetails.expiringYear} onChange={(e) => inputCardHandler('expiringYear', e.target.value)} />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div id="issuerInput" className="w-1/2 pr-3">
              <label htmlFor="issuer">Banco emisor</label>
              <select id="issuer" name="issuer" disabled={processing} data-checkout="issuer" value={cardDetails.issuer} onChange={(e) => inputCardHandler('issuer', e.target.value)} ></select>
            </div>
            <div className="w-1/2 pl-3">
              <label htmlFor="installments">Cuotas</label>
              <select id="installments" name="installments" disabled={processing} value={cardDetails.installments} onChange={(e) => inputCardHandler('installments', e.target.value)} ></select>
            </div>
          </div>
          <div>
            <input type="hidden" name="transactionAmount" id="transactionAmount" value="100" />
            <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
            <input type="hidden" name="description" id="description" />

            <button className="mt-3 w-full py-2 text-uppercase font-bold" disabled={!(validCard() && validPayer()) || processing} onClick={onFormSubmit}>Pagar Ahora</button>
          </div>
        </div>
      </form>
    </div>
  )
}
