import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { useStore } from '../redux/Store'
import { appWithTranslation } from 'next-i18next'
import '../styles/globals.scss'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'


function MyApp({ Component, pageProps }) {
  if (TimeAgo.getDefaultLocale() == 'en') {
    TimeAgo.addDefaultLocale(es)
  }

  i18next.use(LanguageDetector).init()
  
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })

  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon.jpg" type="image/jpg"/>
          <title>ECommerce</title>
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default appWithTranslation(MyApp)
