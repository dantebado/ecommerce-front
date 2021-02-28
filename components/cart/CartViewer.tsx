import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { modifyProductInCart, retrieveProduct } from '../../api/api'
import { Cart, Product } from '../../interface/misc.model'
import { actionSetActiveCart } from '../../redux/reducers/ActiveCart'
import CurrencyDisplay from '../utils/CurrencyDisplay'

export default function CartViewer(props: { cart: Cart }) {
  const [productsCache, setProductsCache] = useState({})
  const dispatch = useDispatch()
  const cart = props.cart

  useEffect(() => {
    cart.products.forEach((v, i, a) => {
      retrieveProduct(v.product)
        .then(response => {
          setProductsCache({
            ...productsCache,
            [response.data.id]: response.data
          })
        })
    })
  }, [])

  console.log(productsCache)

  const findProductInCache = (id):Product => {
    const p = productsCache[id]

    if (!p) {
      return {
        id: -1,
        display_name: 'Cargando',
        featured_photo_url: '',
        measure_unit: '',
        current_stock: 1,
        unitary_price: 0,
        description: '',
        photos_url: [],
        tags: [],
        category: {
          id: 1,
          description: 'Cargando'
        }
      }
    }
    return p
  }

  const removeFromCart = (product: Product) => {
    modifyProductInCart(cart.id, product.id, 0)
      .then(cart => {
        dispatch(actionSetActiveCart(cart.data))
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
                <td>{findProductInCache(v.product).display_name}</td>
                <td><CurrencyDisplay amount={findProductInCache(v.product).unitary_price} /> / {findProductInCache(v.product).measure_unit}</td>
                <td>x {v.count} {findProductInCache(v.product).measure_unit}</td>
                <td><CurrencyDisplay amount={findProductInCache(v.product).unitary_price  * v.count}/></td>
                <td><button className="w-full py-2" onClick={() => removeFromCart(findProductInCache(v.product))}>Quitar</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
