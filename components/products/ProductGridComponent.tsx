import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { useState } from "react";
import { Product } from "../../interface/misc.model";
import CurrencyDisplay from "../utils/CurrencyDisplay";

export default function ProductGridComponent(props: {
  product: Product | any;
}) {
  const [product] = useState(props.product);
  const { t } = useTranslation("common");

  const photoStyles = {
    backgroundImage: `url("${product.featured_photo_url}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "12rem",
  };

  return (
    <div className="text-center p-2">
      <div className="shadow-lg p-3 rounded-lg">
        <div style={photoStyles} className="border-b"></div>

        <p className="text-left my-3">{product.display_name}</p>
        <p className="text-left my-3 text-md font-bold">
          <CurrencyDisplay amount={product.unitary_price} /> /{" "}
          {product.measure_unit}
        </p>

        <Link href={`/product/${product.id}`}>
          <button className="w-full py-1 font-sm rounded-md">
            {t("view-product-details-button")}
          </button>
        </Link>
      </div>
    </div>
  );
}
