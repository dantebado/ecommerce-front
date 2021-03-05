import cogoToast from "cogo-toast";
import { m } from "framer-motion";
import { Magic } from "magic-sdk";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUserExistence, signupUser } from "../../api/api";
import ImageUploader from "../../components/forms/ImageUploader";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import {
  actionLoginMagicLink,
  actionSignoutMagicLink,
} from "../../redux/reducers/LoggedUser";
import {
  actionSetProgress,
  actionsHideProgress,
} from "../../redux/reducers/Progress";
import { StateTypes } from "../../redux/Store";

const Signup = (props) => {
  const avatars = [
    "https://i.imgur.com/0QnCYdD.png",
    "https://i.imgur.com/eqv9do9.png",
  ];

  const [payload, setPayload] = useState({
    email: "",
    first_name: "",
    last_name: "",
    avatar_url: avatars[Math.floor(avatars.length * Math.random())],
  });
  const loggedUser = useSelector((state: StateTypes) => state.loggedUser);
  const [m, setM] = useState(null);
  const router = useRouter();
  const { t } = useTranslation("common");

  const dispatch = useDispatch();

  useEffect(() => {
    setM(new Magic(process.env.NEXT_PUBLIC_MAGIC_LINK_PUBLIC_KEY));
  }, []);

  const startSignup = () => {
    dispatch(actionSetProgress(""));
    checkUserExistence(payload.email)
      .then((response) => {
        cogoToast.error(t("user-already-exists"));
        dispatch(actionsHideProgress());
      })
      .catch((err) => {
        m.auth
          .loginWithMagicLink({
            email: payload.email,
          })
          .then((token) => {
            signupUser(payload, token)
              .then((response) => {
                cogoToast.success(t("signup-success"));
                dispatch(actionLoginMagicLink(token, payload.email));
                router.push("/");
              })
              .catch((err) => cogoToast.error(t("signup-error")));
          })
          .catch((err) => {})
          .finally(() => dispatch(actionsHideProgress()));
      });
  };

  const signOutHandler = () => {
    dispatch(actionSetProgress(""));
    m.user
      .logout()
      .then((value) => {
        dispatch(actionSignoutMagicLink());
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(actionsHideProgress());
        router.push("/");
      });
  };

  const inputHandler = (field, value) => {
    setPayload({
      ...payload,
      [field]: value,
    });
  };

  const valid =
    payload.email &&
    payload.first_name &&
    payload.last_name &&
    payload.avatar_url;

  return (
    <DefaultLayout>
      <Head>
        <title>{t("signup-title")} - WalenGa</title>
        <meta name="og:title" content={`${t("signup-title")} - WalenGa`} />
        <meta name="description" content={t("meta-description-signup")} />
      </Head>
      <div className="container mx-auto text-center px-4 py-12 dark:text-white">
        <div className="md:w-1/2 mx-auto">
          {loggedUser.magicToken ? (
            <Fragment>
              <p className="text-center mb-3">{t("signout-title")}</p>
              <button className="px-4 py-2 w-full" onClick={signOutHandler}>
                {t("signout-button")}
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="text-center text-4xl font-bold mb-12">
                {t("signup-title")}
              </p>

              <div className="mb-6">
                <img
                  className="w-1/2 mx-auto rounded-full border-4"
                  src={payload.avatar_url}
                />
              </div>

              <div className="mb-4">
                <ImageUploader
                  text={t("upload-avatar-message")}
                  callback={(e) => inputHandler("avatar_url", e)}
                />
              </div>

              <div className="flex flex-row mb-4 space-x-3">
                <div className="w-1/2">
                  <input
                    type="text"
                    required={true}
                    autoComplete="false"
                    className="w-full px-4 py-2"
                    placeholder={t("form-placeholder-firstname")}
                    value={payload.first_name}
                    onChange={(e) => inputHandler("first_name", e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    required={true}
                    autoComplete="false"
                    className="w-full  px-4 py-2"
                    placeholder={t("form-placeholder-lastname")}
                    value={payload.last_name}
                    onChange={(e) => inputHandler("last_name", e.target.value)}
                  />
                </div>
              </div>

              <input
                type="email"
                required={true}
                autoComplete="false"
                className="w-full mb-3 px-4 py-2"
                placeholder={t("form-placeholder-email")}
                value={payload.email}
                onChange={(e) => inputHandler("email", e.target.value)}
              />

              <button
                className="px-4 py-2 w-full uppercase"
                disabled={!valid}
                onClick={startSignup}
              >
                {t("signup-button")}
              </button>
              <Link href="/login">
                <a className="block text-center uppercase text-sm mt-3">
                  {t("already-have-account-title")}
                </a>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Signup;
