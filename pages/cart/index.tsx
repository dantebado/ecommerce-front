import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import CartViewer from '../../components/cart/CartViewer'
import DefaultLayout from '../../components/layouts/DefaultLayout'
import { StateTypes } from '../../redux/Store'

export default function index() {
  const activeCart = useSelector((state: StateTypes) => state.activeCart)
  const router = useRouter()

  if (!activeCart) {
    console.error("no cart retrieved from state")
    router.push("/")
  }

  const checkoutTriggerHandler = () => {
    router.push("/checkout")
  }

  return (
    <DefaultLayout>
      {
        activeCart ? (
          <div className="container py-6 text-center">
            <h1>Carrito</h1>
            <div className="my-6">
              <CartViewer cart={activeCart} />
            </div>
            {
              activeCart.products.length > 0 ? (
                <div className="text-center">
                  <button className="px-5 py-3"
                    onClick={checkoutTriggerHandler}>
                    Ir a Checkout
                  </button>
                </div>
              ) : (
                <p>Tu Carrito está vacío</p>
              )
            }
          </div>
        ) : (
          <span></span>
        )
      }
    </DefaultLayout>
  )
}
