import cogoToast from "cogo-toast";
import { EPERM } from "constants";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { createProductReview } from "../../api/api";
import { Product } from "../../interface/misc.model";

export default function ReviewForm(props: {
  product: Product;
  callback: (review) => any;
}) {
  const [payload, setPayload] = useState({
    author_name: "",
    commentary: "",
    rating: "",
  });

  const { t } = useTranslation("common");

  const inputHandler = (field, value) => {
    setPayload({
      ...payload,
      [field]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createProductReview(props.product.id, payload)
      .then((response) => {
        props.callback(response.data);
        cogoToast.success(t("create-review-success"));
      })
      .catch((err) => cogoToast.error(t("create-review-failure")))
      .finally(() => {
        setPayload({
          author_name: "",
          commentary: "",
          rating: "",
        });
      });
  };

  const valid = payload.commentary && payload.author_name && payload.rating;

  return (
    <div>
      <p className="font-bold text-lg mb-3">{t("send-review-title")}</p>
      <div className="flex flex-row space-x-3">
        <input
          className="w-1/2"
          type="text"
          placeholder={t("form-placeholder-name")}
          value={payload.author_name}
          onChange={(e) => inputHandler("author_name", e.target.value)}
        />
        <select
          className="w-1/2"
          value={payload.rating}
          onChange={(e) => inputHandler("rating", e.target.value)}
        >
          <option value="">{t("form-placeholder-review-stars")}</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <textarea
        className="w-full mb-1 mt-2"
        placeholder={t("form-placeholder-review-commentary")}
        value={payload.commentary}
        onChange={(e) => inputHandler("commentary", e.target.value)}
      ></textarea>

      <button
        disabled={!valid}
        className="block w-full"
        onClick={submitHandler}
      >
        {t("send-review-button")}
      </button>
    </div>
  );
}
