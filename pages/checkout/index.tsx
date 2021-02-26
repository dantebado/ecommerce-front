import { spawn, SpawnOptions } from 'child_process'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCart, createIndividualPurchaseFromPurchase, createPurchase } from '../../api/api'
import CartViewer from '../../components/cart/CartViewer'
import AddressForm from '../../components/forms/AddressForm'
import DefaultLayout from '../../components/layouts/DefaultLayout'
import { addressToReadableString, Purchase } from '../../interface/misc.model'
import { actionSetActiveCart } from '../../redux/reducers/ActiveCart'
import { StateTypes } from '../../redux/Store'

export default function index() {
  const activeCart = useSelector((state: StateTypes) => state.activeCart)
  const [addressConfirmed, setAddressConfirmed] = useState(false)
  const [shipmentAddress, setShipmentAddress] = useState({
    country: 'Argentina',
    address: '',
    state: '',
    city: '',
    postalCode: '',
    commentary: ''
  })
  const router = useRouter()
  const dispatch = useDispatch()
  let shipmentAddressReadable: string = ''

  if (!activeCart) {
    console.error("no cart retrieved from state")
    router.push("/")
  }

  const promotionOptions = [
    {
      people: 1,
      discount: 10
    },
    {
      people: 2,
      discount: 20
    },
    {
      people: 3,
      discount: 30
    },
  ]

  shipmentAddressReadable = addressToReadableString(shipmentAddress)
  
  const createPurchaseHandler = (people: number) => {
    let finalPeople = people + 1
    createPurchase(activeCart.id, shipmentAddress, finalPeople)
      .then(purchase => {
        createIndividualPurchase(purchase)
      })
      .catch(console.error)
  }

  const createIndividualPurchase = (purchase: Purchase) => {
    createIndividualPurchaseFromPurchase(purchase.id, shipmentAddress)
      .then(individual => {
        createCart()
          .then(cart => {
            dispatch(actionSetActiveCart(cart))
          })
          .finally(() => {
            router.push("/payment/" + individual.payment.id)
          })
      })
      .catch(console.error)
  }

  return (
    <DefaultLayout>
      {
        activeCart ? (
          <div className="container py-6 text-center px-2">
            <h1>Checkout</h1>
            <div className="my-6">
              <CartViewer cart={activeCart} />
            </div>

            <h1>Dirección de Entrega</h1>

            <div className="my-3">
              <AddressForm value={shipmentAddress} onChange={setShipmentAddress}></AddressForm>
            </div>

            <p>Leímos tu dirección como {shipmentAddressReadable}</p>
            <div className="text-center mt-3">
              <button className="px-4 py-2"
                disabled={!shipmentAddress.address}
                onClick={(e) => setAddressConfirmed(true)}>Mi Dirección es Correcta</button>
            </div>

            {
              addressConfirmed ? (
                <div className="mt-3">
                  <h1>¿Qué tipo de compra querés?</h1>
                  
                  <div className="sm:flex flex-row items-center mt-6">
                    <div className="sm:w-1/2 text-center mb-6 sm:mb-0">
                      <button className="px-5 py-3" onClick={() => createPurchaseHandler(0)}>Quiero pagar $ {activeCart.productsPrice}</button>
                    </div>
                    <div className="sm:w-1/2 text-center">
                      {
                        promotionOptions.map((v, i, a) => (
                          <button key={v.people}
                            className={`px-5 py-3 text-uppercase display-block mx-auto ${i !== (a.length-1) ? 'mb-3' : ''}`}
                            onClick={() => createPurchaseHandler(v.people)} >
                            Quiero pagar {v.discount}% menos invitando a {v.people} persona{v.people > 1 ? 's' : ''}
                          </button>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ) : (<span></span>)
            }
          </div>
        ) : (
          <span></span>
        )
      }
    </DefaultLayout>
  )
}
