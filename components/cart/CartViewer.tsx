import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { modifyProductInCart, retrieveProduct } from "../../api/api";
import { Cart, Product } from "../../interface/misc.model";
import { actionSetActiveCart } from "../../redux/reducers/ActiveCart";
import CurrencyDisplay from "../utils/CurrencyDisplay";
import cogoToast from "cogo-toast";
import useTranslation from "next-translate/useTranslation";

export default function CartViewer(props: { cart: Cart }) {
  const [productsCache, setProductsCache] = useState({});
  const dispatch = useDispatch();
  const cart = props.cart;
  const { t } = useTranslation("common");

  useEffect(() => {
    cart.products.forEach((v, i, a) => {
      retrieveProduct(v.product)
        .then((response) => {
          setProductsCache({
            ...productsCache,
            [response.data.id]: response.data,
          });
        })
        .catch((err) => cogoToast.error(t("error-fetching-purchase")));
    });
  }, []);

  const findProductInCache = (id): Product => {
    const p = productsCache[id];

    if (!p) {
      return {
        id: -1,
        display_name: "---",
        featured_photo_url: "",
        measure_unit: "",
        current_stock: 1,
        unitary_price: 0,
        description: "",
        photos_url: [],
        tags: [],
        category: {
          id: 1,
          description: "---",
        },
      };
    }
    return p;
  };

  const removeFromCart = (product: Product) => {
    if (cart.is_locked) return;
    modifyProductInCart(cart.id, product.id, 0)
      .then((cart) => {
        dispatch(actionSetActiveCart(cart.data));
        cogoToast.success(t("item-removed-success"));
      })
      .catch((err) => cogoToast.error(t("item-removed-error")));
  };

  return (
    <div>
      <table className="w-full cart-table">
        <thead>
          <tr>
            <th>{t("product-table-head")}</th>
            <th>{t("product-table-unitary")}</th>
            <th>{t("product-table-quantity")}</th>
            <th>{t("product-table-total")}</th>
            <th>{t("product-table-remove")}</th>
          </tr>
        </thead>
        <tbody>
          {cart.products.map((v, i, a) => (
            <tr key={i}>
              <td>{findProductInCache(v.product).display_name}</td>
              <td>
                <CurrencyDisplay
                  amount={findProductInCache(v.product).unitary_price}
                />{" "}
                / {findProductInCache(v.product).measure_unit}
              </td>
              <td>
                x {v.count} {findProductInCache(v.product).measure_unit}
              </td>
              <td>
                <CurrencyDisplay
                  amount={findProductInCache(v.product).unitary_price * v.count}
                />
              </td>
              <td>
                <button
                  className="w-full py-2"
                  onClick={() => removeFromCart(findProductInCache(v.product))}
                >
                  {t("product-table-remove")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
