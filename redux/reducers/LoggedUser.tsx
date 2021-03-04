import { StateTypes } from "../Store";

export interface LoggedUserTypes {
  magicToken: string;
  email: string;
}

export const LOGGED_USER_INITIAL_VALUE: LoggedUserTypes = {
  magicToken: null,
  email: null,
};

export const LOGGED_USER_INITIAL_STATE = {
  loggedUser: LOGGED_USER_INITIAL_VALUE,
};

function handleChange(state, token: string, email: string) {
  return {
    magicToken: token,
    email: email,
  };
}

export function actionLoginMagicLink(token: string, email: string) {
  return {
    type: "MAGIC_LINK_LOGIN",
    token: token,
    email: email,
  };
}

export function actionSignoutMagicLink() {
  return {
    type: "MAGIC_LINK_LOGIN",
    token: null,
    email: null,
  };
}

/* TODO: EXPORT ACTIONS */

export default function counterReducer(
  state = LOGGED_USER_INITIAL_STATE,
  action: { type: string; token: string; email: string }
) {
  switch (action.type) {
    case "MAGIC_LINK_LOGIN":
      return handleChange(state, action.token, action.email);
    default:
      return state;
  }
}
