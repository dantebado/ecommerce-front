import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCart,
  createIndividualPurchaseFromPurchase,
  createPurchase,
  geocodeAddress,
} from "../../api/api";
import CartViewer from "../../components/cart/CartViewer";
import AddressForm from "../../components/forms/AddressForm";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import CurrencyDisplay from "../../components/utils/CurrencyDisplay";
import { addressToReadableString, Purchase } from "../../interface/misc.model";
import { actionSetActiveCart } from "../../redux/reducers/ActiveCart";
import { StateTypes } from "../../redux/Store";
import cogoToast from "cogo-toast";
import useTranslation from "next-translate/useTranslation";
import {
  actionSetProgress,
  actionsHideProgress,
} from "../../redux/reducers/Progress";
import Head from "next/head";

export default function index() {
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

  const activeCart = useSelector((state: StateTypes) => state.activeCart);
  const [addressConfirmed, setAddressConfirmed] = useState(false);
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
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const promotionOptions = [
    {
      people: 1,
      discount: 10,
    },
    {
      people: 2,
      discount: 20,
    },
    {
      people: 3,
      discount: 30,
    },
  ];

  const createPurchaseHandler = (people: number) => {
    let finalPeople = people + 1;
    dispatch(actionSetProgress(""));
    createPurchase(activeCart.id, shipmentAddress, finalPeople)
      .then((purchase) => {
        createIndividualPurchase(purchase.data);
      })
      .catch((err) => {
        cogoToast.error(t("creating-individual-failed"));
        dispatch(actionsHideProgress());
      });
  };

  const createIndividualPurchase = (purchase: Purchase) => {
    createIndividualPurchaseFromPurchase(purchase.id, shipmentAddress, email)
      .then((individual) => {
        createCart()
          .then((cart) => {
            dispatch(actionSetActiveCart(cart.data));
          })
          .finally(() => {
            cogoToast.success(t("redirecting-to-payment"));
            dispatch(actionsHideProgress());
            router.push("/payment/" + individual.data.payment.id);
          });
      })
      .catch((err) => {
        cogoToast.error(t("creating-individual-failed"));
        dispatch(actionsHideProgress());
      });
  };

  const geocodeHandler = () => {
    geocodeAddress(shipmentAddress)
      .then((geo) => {
        setShipmentAddress({
          ...shipmentAddress,
          geocoding: geo,
        });
      })
      .catch((err) => {});
  };

  if (!activeCart?.id) {
    return <div></div>;
  }

  return (
    <DefaultLayout>
      <Head>
        <title>{t("checkout-title")} - WalenGa</title>
        <meta name="description" content={t("meta-description-checkout")} />
      </Head>
      {activeCart?.id ? (
        <div className="container mx-auto py-6 text-center px-2 dark:text-white">
          <p className="font-bold text-4xl">{t("checkout-title")}</p>
          <div className="my-6">
            <CartViewer cart={activeCart} />
          </div>

          <div style={styles}>
            <p className="font-bold text-lg mb-3">{t("your-data-title")}</p>
            <div>
              <input
                type="email"
                autoComplete="false"
                placeholder={t("form-placeholder-email")}
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <p className="mt-3 font-bold text-lg">{t("shipment-data-title")}</p>
            <div className="my-3">
              <AddressForm
                value={shipmentAddress}
                onChange={setShipmentAddress}
              ></AddressForm>
            </div>

            {shipmentAddress.geocoding ? (
              <div>
                <p>{t("found-address-message")}</p>

                <div className="my-3" style={{ height: "20rem" }}>
                  <CoordinatesMap
                    geocode={shipmentAddress.geocoding}
                    popupText={addressToReadableString(shipmentAddress)}
                  />
                </div>

                <div className="text-center mt-3">
                  <button
                    className="block mt-4 w-full"
                    disabled={!shipmentAddress.address_line}
                    onClick={(e) => setAddressConfirmed(true)}
                  >
                    {t("validate-address-is-correct")}
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="block mt-4 w-full"
                disabled={!email}
                onClick={geocodeHandler}
              >
                {t("validate-address-title")}
              </button>
            )}

            {addressConfirmed ? (
              <div className="mt-3">
                <p className="font-bold text-3xl">
                  {t("purchase-type-question")}
                </p>

                <div className="md:flex flex-row items-center mt-6">
                  <div className="md:w-1/2 text-center mb-6 md:mb-0">
                    <button
                      className="px-5 py-3"
                      onClick={() => createPurchaseHandler(0)}
                    >
                      {t("wanna-pay-amount")}{" "}
                      <CurrencyDisplay amount={activeCart.total} />
                    </button>
                  </div>
                  <div className="md:w-1/2 text-center">
                    {promotionOptions.map((v, i, a) => (
                      <button
                        key={v.people}
                        className={`px-5 py-3 uppercase block mx-auto ${
                          i !== a.length - 1 ? "mb-3" : ""
                        }`}
                        onClick={() => createPurchaseHandler(v.people)}
                      >
                        {t("wanna-pay-discount", {
                          discount: v.discount,
                          people: v.people,
                        })}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      ) : (
        <span></span>
      )}
    </DefaultLayout>
  );
}
