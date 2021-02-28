import Link from 'next/link'
import React, { useState } from 'react'
import { Product } from '../../interface/misc.model'
import CurrencyDisplay from '../utils/CurrencyDisplay'

export default function ProductGridComponent(props: {product: Product}) {
  const [product] = useState(props.product)

  return (
    <div className="m-2 text-center">
      <div className="shadow-2 p-3 border-radius-sm">
        <img className="border-radius-sm" src={product.featuredPhotoURL} alt=""/>

        <p className="text-left my-3">{product.displayName}</p>
        <h4 className="text-left mb-0 my-3"><CurrencyDisplay amount={product.unitaryPrice} /> / {product.measureUnit}</h4>

        <Link href={`/product/${product.id}`}><button className="w-full py-1 font-sm">Ver Más</button></Link>
      </div>
    </div>
  )
}
