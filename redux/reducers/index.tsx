import { combineReducers } from "redux";
import counter from './Counter'
import loggedUser from './LoggedUser'
import activeCart from './ActiveCart'
import progress from './Progress'

export default combineReducers({ counter, loggedUser, activeCart, progress });