import Link from "next/link";
import React, { useState } from "react";
import { Product } from "../../interface/misc.model";
import CurrencyDisplay from "../utils/CurrencyDisplay";

export default function ProductGridComponent(props: { product: Product }) {
  const [product] = useState(props.product);

  return (
    <div className="m-2 text-center">
      <div className="shadow-lg p-3 border-radius-sm">
        <img
          className="border-radius-sm"
          src={product.featured_photo_url}
          alt=""
        />

        <p className="text-left my-3">{product.display_name}</p>
        <p className="text-left my-3 text-md font-bold">
          <CurrencyDisplay amount={product.unitary_price} /> /{" "}
          {product.measure_unit}
        </p>

        <Link href={`/product/${product.id}`}>
          <button className="w-full py-1 font-sm">Ver Más</button>
        </Link>
      </div>
    </div>
  );
}
