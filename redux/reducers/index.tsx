import { combineReducers } from "redux";
import counter from './Counter'
import loggedUser from './LoggedUser'

export default combineReducers({ counter, loggedUser });