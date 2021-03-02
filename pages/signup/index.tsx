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
import { checkUserExistence, signupUser } from "../../api/api";
import cogoToast from "cogo-toast";
import Link from "next/link";

const Signup = (props) => {
  const [payload, setPayload] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });
  const loggedUser = useSelector((state: StateTypes) => state.loggedUser);
  const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_LINK_PUBLIC_KEY);
  const dispatch = useDispatch();

  const startSignup = () => {
    checkUserExistence(payload.email)
      .then((response) => {
        cogoToast.error(
          "Ya existe un usuario con ese correo electrónico. Intentá iniciar sesión."
        );
      })
      .catch((err) => {
        m.auth
          .loginWithMagicLink({
            email: payload.email,
          })
          .then((token) => {
            signupUser(payload, token)
              .then((response) => {
                console.log(response);
                cogoToast.success("Registrado con éxito");
              })
              .catch((err) => cogoToast.error("Error al registrar tu usuario"));
          })
          .catch(console.error);
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

  const inputHandler = (field, value) => {
    setPayload({
      ...payload,
      [field]: value,
    });
  };

  const valid = payload.email && payload.first_name && payload.last_name;

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
              <p className="text-center text-4xl font-bold mb-12">
                Registrarme
              </p>

              <div className="flex flex-row mb-4 space-x-3">
                <div className="w-1/2">
                  <input
                    type="text"
                    required={true}
                    className="w-full  px-4 py-2"
                    placeholder="Nombres"
                    value={payload.first_name}
                    onChange={(e) => inputHandler("first_name", e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    required={true}
                    className="w-full  px-4 py-2"
                    placeholder="Apellido"
                    value={payload.last_name}
                    onChange={(e) => inputHandler("last_name", e.target.value)}
                  />
                </div>
              </div>

              <input
                type="email"
                required={true}
                className="w-full mb-3 px-4 py-2"
                placeholder="Correo Electrónico"
                value={payload.email}
                onChange={(e) => inputHandler("email", e.target.value)}
              />

              <button
                className="px-4 py-2 w-full uppercase"
                disabled={!valid}
                onClick={startSignup}
              >
                Registrarme Ahora
              </button>
              <Link href="/login">
                <a className="block text-center uppercase text-sm mt-3">
                  Ya tengo cuenta
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
