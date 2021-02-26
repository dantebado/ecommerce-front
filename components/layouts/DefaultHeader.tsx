import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionSignoutMagicLink } from '../../redux/reducers/LoggedUser'
import { StateTypes } from '../../redux/Store'
import Link from 'next/link'

export default function DefaultHeader() {
  const loggedUser = useSelector((state: StateTypes) => state.loggedUser)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(actionSignoutMagicLink())
  }

  return (
    <header className="border-bottom py-3 text-center">
      <Link href="/">
        <a><h2 className="mb-3">HEADER</h2></a>
      </Link>
      {
        loggedUser.magicToken ? <button className="px-4 py-2" onClick={logoutHandler}>Cerrar Sesión</button> : <Link href="/login"><a className="display-block">Iniciar Sesión</a></Link>
      }
    </header>
  )
}
