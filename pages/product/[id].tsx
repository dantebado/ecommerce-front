import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, retrieveProduct } from '../../api/api'
import CartRetriever from '../../components/cart/CartRetriever'
import DefaultLayout from '../../components/layouts/DefaultLayout'
import { Product } from '../../interface/misc.model'
import { actionSetActiveCart } from '../../redux/reducers/ActiveCart'
import { StateTypes } from '../../redux/Store'

export default function ProductViewer(props: {product: Product}) {
  const [product] = useState(props.product)
  const activeCart = useSelector((state: StateTypes) => state.activeCart)
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const router = useRouter()


  let countOptions = []
  for (let i=0 ; i<Math.min(10, product.currentStock) ; i++) {
    countOptions.push(i)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    let payload = {
      productId: product.id,
      count: count
    }
    addProductToCart(activeCart.id, [payload])
      .then(cart => {
        dispatch(actionSetActiveCart(cart))
        router.push("/cart")
      })
      .catch(console.error)
  }

  return (
    <DefaultLayout>
      <div className="container py-6 text-center">
        <h2 className="mb-3">Viendo {product.displayName}</h2>
        <p>{product.description}</p>

        <h1 className="my-3">$ {product.unitaryPrice} / {product.measureUnit}</h1>

        <p className="mt-6"><b>Fotografía Destacada</b></p>
        <div className="sm:w-1/2 mx-auto mt-3 mb-6">
          <img className="shadow-2" src={product.featuredPhotoURL}/>
        </div>

        <p className="mt-6"><b>Otras Fotografías</b></p>
        <div className="my-3 sm:flex flex-row overflow-x-auto border-top border-bottom">
          {
            product.photosURL.map((v, i, a) => (
              <Fragment key={i}>
                <img className="w-1/4" src={v} />
              </Fragment>
            ))
          }
        </div>

        <div className="flex flex-row items-center sm:w-1/2 sm:mx-auto mt-6">
          <div className="w-1/2">
            <select className="w-full py-2 px-2" value={count} onChange={(e) => setCount(parseInt(e.target.value))}>
              {
                countOptions.map((v, i, a) => (
                  <option key={v} value={v}>{v} {product.measureUnit}</option>
                ))
              }
            </select>
          </div>
          <div className="w-1/2">
            <button className="px-6 py-3"
              disabled={count == 0 || !activeCart}
              onClick={submitHandler}>
              {count === 0 ? 'Seleccioná la Cantidad' : 'Añadir al Carrito'}
            </button>
            <CartRetriever></CartRetriever>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const productId: any = query.id
  const product = await retrieveProduct(productId)

  return {
    props: {
      product: product
    }
  }
}