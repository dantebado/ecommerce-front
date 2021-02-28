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
            [response.id]: response
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
        displayName: 'Cargando',
        featuredPhotoURL: '',
        measureUnit: '',
        currentStock: 1,
        unitaryPrice: 0,
        description: '',
        photosURL: [],
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
                <td>{findProductInCache(v.product).displayName}</td>
                <td><CurrencyDisplay amount={findProductInCache(v.product).unitaryPrice} /> / {findProductInCache(v.product).measureUnit}</td>
                <td>x {v.count} {findProductInCache(v.product).measureUnit}</td>
                <td><CurrencyDisplay amount={findProductInCache(v.product).unitaryPrice  * v.count}/></td>
                <td><button className="w-full py-2" onClick={() => removeFromCart(findProductInCache(v.product))}>Quitar</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
