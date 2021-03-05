import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { modifyProductInCart, retrieveProduct } from "../../api/api";
import { Cart, Product } from "../../interface/misc.model";
import { actionSetActiveCart } from "../../redux/reducers/ActiveCart";
import CurrencyDisplay from "../utils/CurrencyDisplay";
import cogoToast from "cogo-toast";
import useTranslation from "next-translate/useTranslation";
import CartViewerRow from "./CartViewerRow";

export default function CartViewer(props: { cart: Cart }) {
  const dispatch = useDispatch();
  const cart = props.cart;
  const { t } = useTranslation("common");

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
            {!cart.is_locked && <th>{t("product-table-remove")}</th>}
          </tr>
        </thead>
        <tbody>
          {cart.products.map((v, i, a) => (
            <Fragment key={v.product}>
              <CartViewerRow
                item={v}
                removeCallback={cart.is_locked ? null : removeFromCart}
              />
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
