import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { createIndividualPurchaseFromPurchase } from '../../api/api'
import { Purchase } from '../../interface/misc.model'
import AddressForm from '../forms/AddressForm'

export default function JoinPurchaseComponent(props: {purchase: Purchase}) {
  const purchase = props.purchase

  const router = useRouter()
  const [shipmentAddress, setShipmentAddress] = useState({
    country: 'Argentina',
    address: '',
    state: '',
    city: '',
    postalCode: '',
    commentary: ''
  })

  const [validatedShipmentArea, setValidatedShipmentArea] = useState(false)

  useEffect(() => {
    setValidatedShipmentArea(false)
  }, [shipmentAddress])

  const validateAddressHandler = () => {
    // TODO validate proximity
    setValidatedShipmentArea(true)
  }

  const createIndividualPurchaseHandler = () => {
    createIndividualPurchaseFromPurchase(purchase.id, shipmentAddress)
      .then(individual => {
        router.push("/payment/" + individual.payment.id)
      })
      .catch(console.error)
  }

  return (
    <div>
      { !purchase.clientsTargetReached ? (
        <div>
          <h3>Unite a la Compra Colaborativa</h3>
          <p className="mt-3">Ingresá tu dirección de envío</p>
          <AddressForm value={shipmentAddress} onChange={setShipmentAddress} />

          {
            validatedShipmentArea ? (
              <div className="mt-3">
                <h3>¡Estás en el área de entrega!</h3>
                <p className="mt-3">Finalizá tu compra ahora.</p>

                <button className="px-4 py-2 mt-3 text-uppercase"
                  onClick={createIndividualPurchaseHandler}>
                  Pagar Ahora $ {purchase.amountToPay}
                </button>

                <p className="mt-3">Te ahorrás $ {purchase.discountAmount}</p>
              </div>
            ) : (
              <div className="mt-3">
                <p>La dirección ingresada no está en el área de entrega.</p>

                <button className="px-4 py-2 mt-3"
                  onClick={validateAddressHandler} >
                  Validar Dirección
                </button>
              </div>
            )
          }
        </div>
      ) : (
        <span></span>
      )}
    </div>
  )
}
