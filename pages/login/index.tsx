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

const Login = (props) => {
  const [emailAddress, setEmailAddress] = useState("");
  const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_LINK_PUBLIC_KEY);
  const loggedUser = useSelector((state: StateTypes) => state.loggedUser);
  const router = useRouter();
  const dispatch = useDispatch();

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
        cogoToast.error(
          "No existe un usuario con ese correo electrónico. Intentá registrarte."
        );
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
              <p className="text-center mb-3">Cerrar Sesión</p>
              <button className="px-4 py-2 w-full" onClick={signOut}>
                Salir
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="text-center text-4xl font-bold mb-3">
                Iniciar Sesión
              </p>
              <p className="my-3">
                Ingresá ahora. Enviaremos un link a tu correo electrónico que te
                dará acceso a la app.
              </p>

              <input
                type="email"
                required={true}
                placeholder="Correo Electrónico"
                className="w-full mb-3 px-4 py-2"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />

              <button
                className="px-4 py-2 w-full uppercase"
                onClick={startLogin}
              >
                Iniciar Sesión
              </button>
              <Link href="/signup">
                <a className="block text-center uppercase text-sm mt-3">
                  Registrarme ahora
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
