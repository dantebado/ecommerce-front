import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { queryProducts } from '../../api/api'
import { actionsHideProgress } from '../../redux/reducers/Progress'
import ProductGridComponent from '../products/ProductGridComponent'

export default function HomeProductsList() {
  const [products, setProducts] = useState({
    count: -1,
    results: []
  })
  const [loading, setLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(0)

  const fetchProducts = () => {
    setLoading(true)
    queryProducts(pageNumber)
    .then(page => {
      setProducts(page.data)
    })
    .catch(console.error)
    .finally(() => { setLoading(false) })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="flex flex-row items-center flex-wrap justify-around p-2">
      {
        loading ? (
          <p>Cargando</p>
        ) : (
          products.results.map((v, i, a) => (
            <div key={i} className="w-1/2 sm:w-1/4">
              <ProductGridComponent product={v} />
            </div>
          ))
        )
      }
    </div>
  )
}
