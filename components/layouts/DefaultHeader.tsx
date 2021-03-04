import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { StateTypes } from "../../redux/Store";

export default function DefaultHeader() {
  const loggedUser = useSelector((state: StateTypes) => state.loggedUser);
  const { t } = useTranslation("common");

  return (
    <header
      className={`py-3 text-center flex flex-row items-center bg-comm-l justify-between text-white`}
    >
      <div className="w-1/3">
        <Link href="/cart">
          <a className="block">{t("cart-title")}</a>
        </Link>
      </div>
      <div className="w-1/3">
        <Link href="/">
          <a className="mx-auto">
            <img className="w-1/2 md:w-1/4 mx-auto" src="/assets/logo.png" />
          </a>
        </Link>
      </div>
      <div className="w-1/3 text-white">
        {loggedUser.magicToken ? (
          <Link href="/account">
            <button className="px-2 py-1">{t("account-button")}</button>
          </Link>
        ) : (
          <Link href="/login">
            <a className="block">{t("signin-title")}</a>
          </Link>
        )}
      </div>
    </header>
  );
}
