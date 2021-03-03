import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCart } from "../../api/api";
import { actionSetActiveCart } from "../../redux/reducers/ActiveCart";
import { StateTypes } from "../../redux/Store";
import cogoToast from "cogo-toast";
import useTranslation from "next-translate/useTranslation";

export default function CartRetriever() {
  const dispatch = useDispatch();
  const activeCart = useSelector((state: StateTypes) => state.activeCart);
  const { t } = useTranslation("common");

  if (!activeCart) {
    createCart()
      .then((cart) => {
        dispatch(actionSetActiveCart(cart.data));
      })
      .catch((err) => cogoToast.error(t("retrieving-cart-error")));
  }

  return <Fragment></Fragment>;
}
