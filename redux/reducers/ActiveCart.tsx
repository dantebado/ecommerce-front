import { Cart } from "../../interface/misc.model";

function handleChange(state, cart: Cart) {
  return cart
}

export function actionSetActiveCart(cart: Cart) {
  return  {
    type: 'SET_ACTIVE_CART',
    activeCart: cart
  }
}

/* TODO: EXPORT ACTIONS */

export default function activeCartReducer(state = null, action: {type: string, activeCart: Cart}) {
  switch(action.type) {
    case 'SET_ACTIVE_CART':
      return handleChange(state, action.activeCart);
    default:
      return state;
  }
}