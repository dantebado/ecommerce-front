import { combineReducers } from "redux";
import counter from './Counter'
import loggedUser from './LoggedUser'
import activeCart from './ActiveCart'

export default combineReducers({ counter, loggedUser, activeCart });