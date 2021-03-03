import useTranslation from "next-translate/useTranslation";
import React from "react";
import { PurchaseHistory } from "../../interface/misc.model";
import CurrencyDisplay from "../utils/CurrencyDisplay";

export default function PurchaseHistoryRow(props: { elem: PurchaseHistory }) {
  const { elem } = props;
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-row">
      <p>#{elem.id}</p>
      <p>{elem.creation_date}</p>
      <div>
        <p>
          <CurrencyDisplay amount={elem.payment_amount} />
        </p>
        <p>{t("shipment-status-" + elem.shipment_status)}</p>
      </div>
    </div>
  );
}
