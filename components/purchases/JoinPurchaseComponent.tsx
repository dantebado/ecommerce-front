import axios from "axios";
import cogoToast from "cogo-toast";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  createIndividualPurchaseFromPurchase,
  geocodeAddress,
} from "../../api/api";
import { addressToReadableString, Purchase } from "../../interface/misc.model";
import AddressForm from "../forms/AddressForm";
import CurrencyDisplay from "../utils/CurrencyDisplay";

export default function JoinPurchaseComponent(props: { purchase: Purchase }) {
  const styles = {
    maxWidth: "560px",
    margin: "auto",
  };

  const CoordinatesMap = dynamic(
    () => import("../../components/maps/CoordinatesMap"),
    {
      loading: () => <p>A map is loading</p>,
      ssr: false,
    }
  );

  const purchase = props.purchase;

  const router = useRouter();
  const [shipmentAddress, setShipmentAddress] = useState({
    country: "Argentina",
    address_line: "",
    floor_apt: "",
    state: "",
    city: "",
    postal_code: "",
    commentary: "",
    geocoding: null,
  });

  const [email, setEmail] = useState("");
  const [validatedShipmentArea, setValidatedShipmentArea] = useState(false);
  const { t } = useTranslation("common");

  const validateAddressHandler = () => {
    setValidatedShipmentArea(false);
    geocodeAddress(shipmentAddress)
      .then((geo) => {
        if (!geo) {
          throw new Error("error fetching geocoding data");
        }

        axios
          .post(`/api/shipment-check`, {
            originAddress: purchase.shipment_area_center.geocoding,
            radius: purchase.shipment_area_radius,
            destinationAddress: geo,
          })
          .then((v) => {
            setValidatedShipmentArea(true);
            cogoToast.success(t("you-are-in-valid-address"));
          })
          .catch((err) => {
            cogoToast.error(t("you-are-in-invalid-address"));
          });
        setShipmentAddress({
          ...shipmentAddress,
          geocoding: geo,
        });
      })
      .catch((err) => cogoToast.error(t("address-not-found")));
  };

  const createIndividualPurchaseHandler = () => {
    createIndividualPurchaseFromPurchase(purchase.id, shipmentAddress, email)
      .then((individual) => {
        cogoToast.success("Dirigiéndote a tu pago");
        router.push("/payment/" + individual.data.payment.id);
      })
      .catch((err) => cogoToast.error(t("redirecting-to-payment")));
  };

  return (
    <div>
      {!purchase.clients_target_reached ? (
        <div>
          <div style={styles}>
            <p className="mt-6 font-bold text-2xl uppercase">
              {t("join-collab-and-save")}
            </p>

            <p className="my-3 text-lg font-bold">Tus Datos</p>
            <div className="mb-3">
              <input
                type="email"
                autoComplete="false"
                placeholder={t("form-placeholder-email")}
                className="px-2 py-2 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <p className="my-3 text-lg font-bold">
              {t("enter-shipment-address")}
            </p>
            <AddressForm
              value={shipmentAddress}
              onChange={setShipmentAddress}
            />

            {validatedShipmentArea && shipmentAddress.geocoding ? (
              <div className="mt-3">
                <p className="font-bold my-6">
                  {t("you-are-in-valid-address")}
                </p>

                <div className="my-3" style={{ height: "20rem" }}>
                  <CoordinatesMap
                    geocode={shipmentAddress.geocoding}
                    popupText={addressToReadableString(shipmentAddress)}
                  />
                </div>

                <p className="mt-3">
                  {t("purchase-and-save")}{" "}
                  <CurrencyDisplay amount={purchase.discount_amount} />
                </p>

                <button
                  className="px-4 py-2 mt-3 uppercase"
                  onClick={createIndividualPurchaseHandler}
                >
                  {t("pay-now-title")}{" "}
                  <CurrencyDisplay amount={purchase.amount} />
                </button>
              </div>
            ) : (
              <div className="mt-3">
                <p>{t("you-are-in-invalid-address")}</p>

                <button
                  className="px-4 py-2 mt-3 w-full"
                  onClick={validateAddressHandler}
                >
                  {t("validate-address-title")}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
}
