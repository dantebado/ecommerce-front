import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StateTypes } from "../../redux/Store";

export default function CurrencyDisplay(props: { amount: number }) {
  const currency = useSelector((state: StateTypes) => state.currency);
  const [convertedAmount, setConvertedAmount] = useState(props.amount);

  useEffect(() => {
    if (currency.code == "ARS") {
      setConvertedAmount(props.amount);
    }
    axios
      .get(
        `https://api.mercadopago.com/currency_conversions/search?from=ARS&to=${currency.code}`
      )
      .then((response) => {
        setConvertedAmount(props.amount * response.data.ratio);
      })
      .catch((err) => {});
  }, [currency]);

  return <span>{`${currency.code} ${convertedAmount.toFixed(2)}`}</span>;
}
