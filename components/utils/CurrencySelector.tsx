import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionSetCurrency } from "../../redux/reducers/Currency";
import { StateTypes } from "../../redux/Store";

export default function CurrencySelector() {
  const currency = useSelector((state: StateTypes) => state.currency);
  const [currencies, setCurrencies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://api.mercadopago.com/currencies")
      .then((response) => {
        setCurrencies(response.data);
      })
      .catch((err) => {});
  }, []);

  const handleInput = (value) => {
    dispatch(actionSetCurrency(value));
  };

  return (
    <div>
      <select
        className="text-black"
        value={currency.code}
        onChange={(e) => handleInput(e.target.value)}
      >
        {currencies.map((v, i, a) => (
          <option key={v.id} value={v.id}>
            {v.description}
          </option>
        ))}
      </select>
    </div>
  );
}
