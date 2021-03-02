import axios from 'axios'
import cogoToast from 'cogo-toast'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { createIndividualPurchaseFromPurchase, geocodeAddress } from '../../api/api'
import { addressToReadableString, Purchase } from '../../interface/misc.model'
import AddressForm from '../forms/AddressForm'
import CurrencyDisplay from '../utils/CurrencyDisplay'

export default function JoinPurchaseComponent(props: {purchase: Purchase}) {
  const CoordinatesMap = dynamic(
    () => import('../../components/maps/CoordinatesMap'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  )
  
  const purchase = props.purchase

  const router = useRouter()
  const [shipmentAddress, setShipmentAddress] = useState({
    country: 'Argentina',
    address_line: '',
    floor_apt: '',
    state: '',
    city: '',
    postal_code: '',
    commentary: '',
    geocoding: null
  })

  const [email, setEmail] = useState('')

  const [validatedShipmentArea, setValidatedShipmentArea] = useState(false)

  const validateAddressHandler = () => {
    setValidatedShipmentArea(false)
    geocodeAddress(shipmentAddress)
      .then(geo => {
        axios.post(`/api/shipment-check`, {
          originAddress: purchase.shipment_area_center.geocoding,
          radius: purchase.shipment_area_radius,
          destinationAddress: geo
        })
        .then(v => {
          setValidatedShipmentArea(true)
          cogoToast.success("Estás dentro del área de cobertura de esta compra")
        })
        .catch(err => {
          cogoToast.error("Estás fuera del área de cobertura de esta compra")
        })
        setShipmentAddress({
          ...shipmentAddress,
          geocoding: geo
        })
      })
      .catch(err => cogoToast.error("Error encontrando tu dirección"))
  }

  const createIndividualPurchaseHandler = () => {
    createIndividualPurchaseFromPurchase(purchase.id, shipmentAddress, email)
      .then(individual => {
        cogoToast.success("Dirigiéndote a tu pago")
        router.push("/payment/" + individual.data.payment.id)
      })
      .catch(err => cogoToast.error("Error al crear tu compra"))
  }
  
  return (
    <div>
      { !purchase.clients_target_reached ? (
        <div>
          <h3>Unite a la Compra Colaborativa</h3>
          <p className="mt-3">Ingresá tu dirección de envío</p>

          <h1>Tus Datos</h1>
          <div className="mb-3">
            <input type="email" placeholder="Correo electrónico" className="px-2 py-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>

          <AddressForm value={shipmentAddress} onChange={setShipmentAddress} />

          {
            validatedShipmentArea && shipmentAddress.geocoding ? (
              <div className="mt-3">
                <h3>¡Estás en el área de entrega!</h3>

                <div className="my-3" style={{height: '20rem'}}>
                  <CoordinatesMap geocode={shipmentAddress.geocoding} popupText={addressToReadableString(shipmentAddress)} />
                </div>

                <p className="mt-3">Finalizá tu compra ahora.</p>

                <button className="px-4 py-2 mt-3 text-uppercase"
                  onClick={createIndividualPurchaseHandler}>
                  Pagar Ahora <CurrencyDisplay amount={purchase.amount_to_pay} />
                </button>

                <p className="mt-3">Te ahorrás <CurrencyDisplay amount={purchase.discount_amount} /></p>
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
      ) : (<span></span>)}
    </div>
  )
}
