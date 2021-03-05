import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es";
import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import ProgressIndicator from "../components/progress/ProgressIndicator";
import { useStore } from "../redux/Store";
import "../styles/globals.scss";
import { motion } from "framer-motion";
import RefreshToken from "../components/utils/RefreshToken";
import CartRetriever from "../components/cart/CartRetriever";

function MyApp({ Component, pageProps, router }: AppProps) {
  if (TimeAgo.getDefaultLocale() == "en") {
    TimeAgo.addDefaultLocale(es);
  }

  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <Head>
          <title>WalenGa</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="shortcut icon"
            href="/assets/favicon.png"
            type="image/png"
          />
        </Head>
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },
          }}
        >
          <Component {...pageProps} />
          <ProgressIndicator />
          <RefreshToken />
          <CartRetriever />
        </motion.div>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
