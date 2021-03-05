import { Magic } from "magic-sdk";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionLoginMagicLink } from "../../redux/reducers/LoggedUser";
import { StateTypes } from "../../redux/Store";

export default function RefreshToken() {
  const loggedUser = useSelector((state: StateTypes) => state.loggedUser);
  const [m, setM] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setM(new Magic(process.env.NEXT_PUBLIC_MAGIC_LINK_PUBLIC_KEY));
  }, []);

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (loggedUser.magicToken) {
      setIntervalId(
        setInterval(() => {
          m.user
            .getIdToken()
            .then((token) => {
              dispatch(actionLoginMagicLink(token, loggedUser.email));
            })
            .catch((err) => {});
        }, 1000 * 60 * 5)
      );
    }
  }, [loggedUser]);

  return <div></div>;
}
