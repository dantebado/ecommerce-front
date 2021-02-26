import Link from 'next/link'
import React, { useState } from 'react'
import { Product } from '../../interface/misc.model'

export default function ProductGridComponent(props: {product: Product}) {
  const [product] = useState(props.product)

  return (
    <div className="border p-5 text-center">
      <p>{product.displayName}</p>

      <h5 className="mb-0 mt-3">$ {product.unitaryPrice} / {product.measureUnit}</h5>

      <Link href={`/product/${product.id}`}><button className="w-full py-2 mt-4">Ver Más</button></Link>
    </div>
  )
}
