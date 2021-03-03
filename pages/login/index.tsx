import React, { Component, Fragment, useState } from "react";
import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { StateTypes } from "../../redux/Store";
import {
  actionLoginMagicLink,
  actionSignoutMagicLink,
} from "../../redux/reducers/LoggedUser";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { checkUserExistence } from "../../api/api";
import cogoToast from "cogo-toast";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

const Login = (props) => {
  const [emailAddress, setEmailAddress] = useState("");
  const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_LINK_PUBLIC_KEY);
  const loggedUser = useSelector((state: StateTypes) => state.loggedUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const startLogin = () => {
    checkUserExistence(emailAddress)
      .then((response) => {
        m.auth
          .loginWithMagicLink({
            email: emailAddress,
          })
          .then((token) => {
            dispatch(actionLoginMagicLink(token));
            router.push("/");
          })
          .catch();
      })
      .catch((err) => {
        cogoToast.error(t("user-non-existent"));
      });
  };

  const signOut = () => {
    m.user
      .logout()
      .then((value) => {
        dispatch(actionSignoutMagicLink());
      })
      .catch((err) => {});
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto text-center py-36">
        <div className="md:w-1/2 mx-auto">
          {loggedUser.magicToken ? (
            <Fragment>
              <p className="text-center mb-3">{t("signout-title")}</p>
              <button className="px-4 py-2 w-full" onClick={signOut}>
                {t("signout-button")}
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="text-center text-4xl font-bold mb-3">
                {t("signin-title")}
              </p>
              <p className="my-3">{t("signin-instructions")}</p>

              <input
                type="email"
                required={true}
                placeholder={t("form-placeholder-email")}
                className="w-full mb-3 px-4 py-2"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />

              <button
                className="px-4 py-2 w-full uppercase"
                onClick={startLogin}
              >
                {t("signin-title")}
              </button>
              <Link href="/signup">
                <a className="block text-center uppercase text-sm mt-3">
                  {t("signup-now")}
                </a>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Login;
