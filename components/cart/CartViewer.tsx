import React from 'react'
import { useDispatch } from 'react-redux'
import { modifyProductInCart } from '../../api/api'
import { Cart, Product } from '../../interface/misc.model'
import { actionSetActiveCart } from '../../redux/reducers/ActiveCart'

export default function CartViewer(props: { cart: Cart }) {
  const dispatch = useDispatch()
  const cart = props.cart

  const removeFromCart = (product: Product) => {
    modifyProductInCart(cart.id, product.id, 0)
      .then(cart => {
        dispatch(actionSetActiveCart(cart))
      })
      .catch(console.error)
  }

  return (
    <div>
      <table className="w-full cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Precio Total</th>
            <th>Quitar</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.products.map((v, i, a) => (
              <tr key={i}>
                <td>{v.product.displayName}</td>
                <td>$ {v.product.unitaryPrice} / {v.product.measureUnit}</td>
                <td>x {v.count} {v.product.measureUnit}</td>
                <td>$ {v.product.unitaryPrice * v.count}</td>
                <td><button className="w-full py-2" onClick={() => removeFromCart(v.product)}>Quitar</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
