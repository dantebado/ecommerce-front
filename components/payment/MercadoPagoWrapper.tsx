import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Payment } from "../../interface/misc.model";
import CurrencyDisplay from "../utils/CurrencyDisplay";
import style from "./mp.module.scss";

export default function MercadoPagoWrapper(props: {
  payment: Payment;
  callback: (payload: any) => any;
}) {
  const mpPublicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;
  const [processing, setProcessing] = useState(false);
  const { t } = useTranslation();

  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiringMonth: "",
    expiringYear: "",
    cardholderName: "",
    cvc: "",
    issuer: "",
    installments: 1,
  });

  const [payerDetails, setPayerDetails] = useState({
    email: "",
    idType: "",
    idNumber: "",
  });

  const inputPayerHandler = (field, value) => {
    let idTypeInput: any = document.getElementById("docType");
    let idTypeValue = idTypeInput.value;

    setPayerDetails({
      ...payerDetails,
      [field]: value,
      idType: idTypeValue,
    });
  };

  const inputCardHandler = (field, value) => {
    let issuerInput: any = document.getElementById("issuer");
    let issuerValue = issuerInput.value;

    if (field === "number") {
      value = value.replaceAll(" ", "");
    }
    setCardDetails({
      ...cardDetails,
      [field]: value,
      issuer: issuerValue,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      let w: any = window;
      w.Mercadopago.setPublishableKey(mpPublicKey);
      w.Mercadopago.getIdentificationTypes();
    }, 1000);
  }, []);

  const onFormSubmit = (e) => {
    setProcessing(true);
    e.preventDefault();
    let w: any = window;
    let form = document.getElementById("paymentForm");
    w.Mercadopago.createToken(form, setCardTokenAndPay);
  };

  const setCardTokenAndPay = (status, response) => {
    if (status == 200 || status == 201) {
      let form = document.getElementById("paymentForm");
      let card = document.createElement("input");
      card.setAttribute("name", "token");
      card.setAttribute("type", "hidden");
      card.setAttribute("value", response.id);
      form.appendChild(card);

      const cb = props.callback;
      const pmid: any = document.getElementById("paymentMethodId");
      if (cb) {
        cb({
          token: response.id,
          payment_method_id: pmid.value,
          installments: cardDetails.installments,
          payer_email: payerDetails.email,
          payment_vendor: "mercadopago",
        });
      }
    } else {
      console.log("Verify filled data!\n" + JSON.stringify(response, null, 4));
    }
    setProcessing(false);
  };

  const validPayer = () => {
    return (
      payerDetails.email != "" &&
      payerDetails.idNumber != "" &&
      payerDetails.idType != ""
    );
  };

  const validCard = () => {
    return (
      cardDetails.cardholderName &&
      cardDetails.cvc &&
      cardDetails.cvc &&
      cardDetails.expiringMonth &&
      cardDetails.expiringYear &&
      cardDetails.installments >= 1 &&
      cardDetails.number
    );
  };

  const allowed = validPayer();

  return (
    <div>
      <Head>
        <script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>
        <script src="/mp.js"></script>
      </Head>
      <form id="paymentForm" className={style.MPForm}>
        <p className="text-lg">{t("buyer-details-title")}</p>
        <div>
          <div>
            <label htmlFor="email">{t("form-label-email")}</label>
            <input
              id="email"
              name="email"
              disabled={processing}
              type="text"
              value={payerDetails.email}
              onChange={(e) => inputPayerHandler("email", e.target.value)}
            />
          </div>
          <div className="md:flex flex-row items-center justify-between">
            <div className="w-1/2 pr-3">
              <label htmlFor="docType">{t("form-label-id-type")}</label>
              <select
                id="docType"
                name="docType"
                disabled={processing}
                data-checkout="docType"
                value={payerDetails.idType}
                onChange={(e) => inputPayerHandler("idType", e.target.value)}
              >
                <option value={""}>{t("form-label-id-type")}</option>
              </select>
            </div>
            <div className="w-1/2 pl-3">
              <label htmlFor="docNumber">{t("form-label-id-number")}</label>
              <input
                id="docNumber"
                name="docNumber"
                disabled={processing}
                data-checkout="docNumber"
                type="text"
                value={payerDetails.idNumber}
                onChange={(e) => inputPayerHandler("idNumber", e.target.value)}
              />
            </div>
          </div>
        </div>
        <p className="text-lg">{t("card-details-title")}</p>
        <div>
          <div className="flex flex-row items-center justify-between">
            <div className="w-3/4">
              <label htmlFor="cardNumber">{t("form-label-card-number")}</label>
              <input
                type="text"
                id="cardNumber"
                disabled={processing}
                autoComplete="false"
                data-checkout="cardNumber"
                value={cardDetails.number}
                onChange={(e) => inputCardHandler("number", e.target.value)}
              />
            </div>
            <div className="w-1/4 pl-6">
              <label htmlFor="securityCode">{t("form-label-card-cvc")}</label>
              <input
                id="securityCode"
                data-checkout="securityCode"
                disabled={processing}
                autoComplete="false"
                type="text"
                maxLength={4}
                value={cardDetails.cvc}
                onChange={(e) => inputCardHandler("cvc", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="cardholderName">
              {t("form-label-cardholder-name")}
            </label>
            <input
              id="cardholderName"
              data-checkout="cardholderName"
              disabled={processing}
              type="text"
              value={cardDetails.cardholderName}
              onChange={(e) =>
                inputCardHandler("cardholderName", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="">{t("form-label-expiring-date")}</label>
            <div className="flex flex-row items-center justify-between">
              <input
                type="text"
                placeholder="MM"
                id="cardExpirationMonth"
                autoComplete="false"
                disabled={processing}
                data-checkout="cardExpirationMonth"
                maxLength={2}
                value={cardDetails.expiringMonth}
                onChange={(e) =>
                  inputCardHandler("expiringMonth", e.target.value)
                }
              />
              <span className="p-3 inline">/</span>
              <input
                type="text"
                placeholder="YY"
                id="cardExpirationYear"
                autoComplete="false"
                disabled={processing}
                data-checkout="cardExpirationYear"
                maxLength={2}
                value={cardDetails.expiringYear}
                onChange={(e) =>
                  inputCardHandler("expiringYear", e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div id="issuerInput" className="w-1/2 pr-3">
              <label htmlFor="issuer">{t("form-label-issuer")}</label>
              <select
                id="issuer"
                name="issuer"
                disabled={processing}
                data-checkout="issuer"
                value={cardDetails.issuer}
                onChange={(e) => inputCardHandler("issuer", e.target.value)}
              ></select>
            </div>
            <div className="w-1/2 pl-3">
              <label htmlFor="installments">
                {t("form-label-installments")}
              </label>
              <select
                id="installments"
                name="installments"
                disabled={processing}
                value={cardDetails.installments}
                onChange={(e) =>
                  inputCardHandler("installments", e.target.value)
                }
              ></select>
            </div>
          </div>
          <div>
            <input
              type="hidden"
              name="transactionAmount"
              id="transactionAmount"
              value={props.payment.amount_to_pay}
            />
            <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
            <input type="hidden" name="description" id="description" />

            <button
              className="mt-6 w-full py-2 uppercase font-bold"
              disabled={!(validCard() && validPayer()) || processing}
              onClick={onFormSubmit}
            >
              {t("pay-now-badge")}{" "}
              <CurrencyDisplay amount={props.payment.amount_to_pay} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
