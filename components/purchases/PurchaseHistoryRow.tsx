import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";
import { PurchaseHistory } from "../../interface/misc.model";
import CurrencyDisplay from "../utils/CurrencyDisplay";

export default function PurchaseHistoryRow(props: { elem: PurchaseHistory }) {
  const { elem } = props;
  const { t } = useTranslation("common");

  return (
    <Link href={`/individual/${elem.id}`}>
      <div className="flex flex-row items-center justify-between space-x-3 border-b py-3 cursor-pointer hover:bg-green-200 transition-all">
        <p className="w-1/3 pl-3">#{elem.id.substr(0, 8)}</p>
        <p className="w-1/3">
          {new Date(elem.creation_date).toLocaleDateString()}
        </p>
        <div className="flex flex-col space-y-1 w-1/3">
          <p className="font-bold">
            <CurrencyDisplay amount={elem.payment_amount} />
          </p>
          <p>{t("shipment-status-" + elem.shipment_status)}</p>
        </div>
      </div>
    </Link>
  );
}
