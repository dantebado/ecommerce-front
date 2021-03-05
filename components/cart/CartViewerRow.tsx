import cogoToast from "cogo-toast";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { retrieveProduct } from "../../api/api";
import { ProductInCart } from "../../interface/misc.model";
import CurrencyDisplay from "../utils/CurrencyDisplay";

export default function CartViewerRow(props: {
  item: ProductInCart;
  removeCallback?: any;
}) {
  const { t } = useTranslation("common");

  const [product, setProduct] = useState({
    unitary_price: 0,
    measure_unit: "---",
    display_name: "---",
  });

  useEffect(() => {
    retrieveProduct(props.item.product)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => cogoToast.error(t("fetching-purchase-error")));
  }, []);

  return (
    <tr>
      <td>{product.display_name}</td>
      <td>
        <CurrencyDisplay amount={product.unitary_price} /> /{" "}
        {product.measure_unit}
      </td>
      <td>
        x {props.item.count} {product.measure_unit}
      </td>
      <td>
        <CurrencyDisplay amount={product.unitary_price * props.item.count} />
      </td>
      {props.removeCallback && (
        <td>
          <button
            className="w-full py-2"
            onClick={() => props.removeCallback(props.item.product)}
          >
            {t("product-table-remove")}
          </button>
        </td>
      )}
    </tr>
  );
}
