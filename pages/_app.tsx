import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { useStore } from '../redux/Store'
import '../styles/globals.scss'


function MyApp({ Component, pageProps }: AppProps)  {
  if (TimeAgo.getDefaultLocale() == 'en') {
    TimeAgo.addDefaultLocale(es)
  }

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

export default MyApp
