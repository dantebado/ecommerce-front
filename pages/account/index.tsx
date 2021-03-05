import cogoToast from "cogo-toast";
import { Magic } from "magic-sdk";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveUserDetails,
  retrieveUserHistory,
  updateUserDetails,
} from "../../api/api";
import ImageUploader from "../../components/forms/ImageUploader";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import PurchaseHistoryRow from "../../components/purchases/PurchaseHistoryRow";
import { actionSignoutMagicLink } from "../../redux/reducers/LoggedUser";
import {
  actionSetProgress,
  actionsHideProgress,
} from "../../redux/reducers/Progress";
import { StateTypes } from "../../redux/Store";

export default function index() {
  const loggedUser = useSelector((state: StateTypes) => state.loggedUser);
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState("");
  const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_LINK_PUBLIC_KEY);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar_url: "",
  });
  const [history, setHistory] = useState([]);

  if (!loggedUser) {
    return <div></div>;
  }

  useEffect(() => {
    retrieveUserDetails(loggedUser.email, loggedUser.magicToken)
      .then((response) => {
        setUser(response.data);
        setAvatarUrl(response.data.avatar_url);
      })
      .catch((err) => cogoToast.error(t("profile-fetching-error")));

    retrieveUserHistory(loggedUser.email, loggedUser.magicToken)
      .then((response) => {
        setHistory(response.data);
      })
      .catch((err) => cogoToast.error(t("history-fetching-error")));
  }, []);

  const inputHandler = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  const logoutHandler = () => {
    m.user.logout();
    dispatch(actionSignoutMagicLink());
    router.push("/");
  };

  const updateProfileHandler = (e) => {
    e.preventDefault();
    dispatch(actionSetProgress(""));
    updateUserDetails(user.email, loggedUser.magicToken, {
      ...user,
      avatar_url: avatarUrl,
    })
      .then((response) => {
        cogoToast.success(t("save-account-success"));
      })
      .catch((err) => {
        cogoToast.error(t("save-account-failed"));
      })
      .finally(() => dispatch(actionsHideProgress()));
  };

  return (
    <DefaultLayout>
      <div
        className="mx-auto p-4 dark:text-white"
        style={{ maxWidth: "560px" }}
      >
        <div className="mb-6">
          <img
            className="w-1/2 mx-auto rounded-full border-4"
            src={avatarUrl}
          />
        </div>

        <div className="mb-4">
          <ImageUploader
            text={t("upload-avatar-message")}
            callback={setAvatarUrl}
          />
        </div>

        <div className="flex flex-row mb-4 space-x-3">
          <div className="w-1/2">
            <input
              type="text"
              required={true}
              className="w-full px-4 py-2"
              placeholder={t("form-placeholder-firstname")}
              value={user.first_name}
              onChange={(e) => inputHandler("first_name", e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <input
              type="text"
              required={true}
              className="w-full  px-4 py-2"
              placeholder={t("form-placeholder-lastname")}
              value={user.last_name}
              onChange={(e) => inputHandler("last_name", e.target.value)}
            />
          </div>
        </div>

        <button className="block w-full mb-4" onClick={updateProfileHandler}>
          {t("save-account-button")}
        </button>

        <button className="block w-full" onClick={logoutHandler}>
          {t("signout-title")}
        </button>

        <p className="my-3 font-bold text-lg">{t("history-title")}</p>
        {history.map((v) => (
          <PurchaseHistoryRow key={v.id} elem={v} />
        ))}
      </div>
    </DefaultLayout>
  );
}
