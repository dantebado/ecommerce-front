import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { retrieveUserRecommendations } from "../../api/api";
import { StateTypes } from "../../redux/Store";
import ProductGridComponent from "./ProductGridComponent";

export default function RecommendationsBar() {
  const loggedUser = useSelector((state: StateTypes) => state.loggedUser);
  const [recommendations, setRecommendations] = useState([]);
  const { t } = useTranslation("common");

  useEffect(() => {
    if (!loggedUser.email) return;

    retrieveUserRecommendations(loggedUser.email, loggedUser.magicToken)
      .then((response) => {
        setRecommendations(response.data);
      })
      .catch((err) => {});
  }, [loggedUser]);

  if (!loggedUser.email) return <div></div>;

  return (
    <div
      className={`border-t dark:text-white ${
        recommendations.length == 0 ? "hidden" : ""
      }`}
    >
      <p className="font-bold text-3xl my-4">{t("for-you-title")}</p>
      <div className="flex flex-row md:space-x-3 space-y-3 md:space-y-0">
        {recommendations.map((v, i) => (
          <div key={i} className="w-full md:w-1/4">
            <ProductGridComponent product={v} />
          </div>
        ))}
      </div>
    </div>
  );
}
