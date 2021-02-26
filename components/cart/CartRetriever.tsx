import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCart } from '../../api/api'
import { actionSetActiveCart } from '../../redux/reducers/ActiveCart'
import { StateTypes } from '../../redux/Store'

export default function CartRetriever() {
  const dispatch = useDispatch()
  const activeCart = useSelector((state: StateTypes) => state.activeCart)

  if (!activeCart) {
    createCart()
      .then(cart => {
        dispatch(actionSetActiveCart(cart))
      })
      .catch(console.error)
  }

  return (
    <div>
    </div>
  )
}
