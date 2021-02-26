import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionSignoutMagicLink } from '../../redux/reducers/LoggedUser'
import { StateTypes } from '../../redux/Store'
import styles from './styles.module.scss'

export default function DefaultHeader() {
  const loggedUser = useSelector((state: StateTypes) => state.loggedUser)
  const { t, lang } = useTranslation('common')
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(actionSignoutMagicLink())
  }

  return (
    <header className={`py-3 text-center flex flex-row items-center background-bg-g-1 justify-between ${styles.Header}`}>
      <div className="w-1/3">

      </div>
      <div className="w-1/3">
        <Link href="/">
          <a><img src="/assets/logo.png" /></a>
        </Link>
      </div>
      <div className="w-1/3">
      {
        loggedUser.magicToken ?
          <button className="px-2 py-1" onClick={logoutHandler}>Cerrar Sesión</button>
          :
          <Link href="/login"><a className="display-block">Iniciar Sesión</a></Link>
      }
      </div>
    </header>
  )
}
