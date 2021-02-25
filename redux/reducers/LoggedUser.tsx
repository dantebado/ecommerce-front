import { StateTypes } from "../Store";

export interface LoggedUserTypes {
  magicToken: string
}

export const LOGGED_USER_INITIAL_VALUE: LoggedUserTypes = {
  magicToken: null
}

export const LOGGED_USER_INITIAL_STATE = {
  loggedUser: LOGGED_USER_INITIAL_VALUE
}

function handleChange(state, token: string) {
  return {
    magicToken: token
  }
}

/* TODO: EXPORT ACTIONS */

export default function counterReducer(state = LOGGED_USER_INITIAL_STATE, action: {type: 'MAGIC_LINK_LOGIN', token: string}) {
  switch(action.type) {
    case 'MAGIC_LINK_LOGIN':
      return handleChange(state, action.token);
    default:
      return state;
  }
}