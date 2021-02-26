import React, { Component, Fragment, useState } from 'react'
import { Magic } from 'magic-sdk';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { StateTypes } from '../../redux/Store';
import { actionLoginMagicLink, actionSignoutMagicLink } from '../../redux/reducers/LoggedUser';
import DefaultLayout from '../../components/layouts/DefaultLayout';

const Login = (props) =>  {
  const [emailAddress, setEmailAddress] = useState('')
  const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_LINK_PUBLIC_KEY)
  const loggedUser = useSelector((state: StateTypes) => state.loggedUser)
  const router = useRouter()
  const dispatch = useDispatch()

  const startLogin = () => {
    m.auth.loginWithMagicLink({
      email: emailAddress
    })
    .then(token => {
      dispatch(actionLoginMagicLink(token))
      router.push("/")
    })
    .catch()
  }

  const signOut = () => {
    m.user.logout().then(value => {
      dispatch(actionSignoutMagicLink())
    }).catch(console.error)
  }

  return (
    <DefaultLayout>
      <div className="container text-center py-6">
        <div className="sm:w-1/2 mx-auto">
        {
          loggedUser.magicToken ? (
            <Fragment>
              <h1 className="text-center mb-3">Cerrar Sesión</h1>
              <button className="px-4 py-2 w-full" onClick={signOut}>Salir</button>
            </Fragment>
          ) : (
            <Fragment>
              <h1 className="text-center mb-3">Iniciar Sesión</h1>
      
              <input type="email" required={true} className="w-full mb-3 px-4 py-2"
                value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
      
              <button className="px-4 py-2 w-full" onClick={startLogin}>Iniciar Sesión</button>
            </Fragment>
          )
        }
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Login