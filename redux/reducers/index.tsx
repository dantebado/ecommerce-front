import { combineReducers } from "redux";
import counter from "./Counter";
import loggedUser from "./LoggedUser";
import activeCart from "./ActiveCart";
import progress from "./Progress";
import currency from "./Currency";

export default combineReducers({
  counter,
  loggedUser,
  activeCart,
  progress,
  currency,
});
