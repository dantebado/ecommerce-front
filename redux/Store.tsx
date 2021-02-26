import { useMemo } from 'react'
import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Cart } from '../interface/misc.model'
import GlobalReducer from './reducers'
import { CounterTypes, COUNTER_INITIAL_STATE } from './reducers/Counter'
import { LoggedUserTypes, LOGGED_USER_INITIAL_STATE } from './reducers/LoggedUser'

let store: Store

export interface StateTypes {
  counter: CounterTypes
  loggedUser: LoggedUserTypes
  activeCart: Cart
}

export const APP_INITIAL_STATE: StateTypes = {
  ...COUNTER_INITIAL_STATE,
  ...LOGGED_USER_INITIAL_STATE,
  activeCart: null
}

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['counter', 'loggedUser', 'activeCart'],
}

const persistedReducer = persistReducer(persistConfig, GlobalReducer)

function makeStore(initialState: any = APP_INITIAL_STATE) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState: StateTypes) => {
  let _store = store ?? makeStore(preloadedState)

  if (preloadedState && store) {

    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    
    store = undefined
  }

  if (typeof window === 'undefined') return _store
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}