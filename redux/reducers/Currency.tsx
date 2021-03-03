export interface CurrencyTypes {
  code: string;
}

export const CURRENCY_INITIAL_VALUE: CurrencyTypes = {
  code: "ARS",
};

export const CURRENCY_INITIAL_STATE = {
  currency: CURRENCY_INITIAL_VALUE,
};

function handleChange(state, code: string) {
  return {
    code: code,
  };
}

export function actionSetCurrency(code: string) {
  return {
    type: "SET_CURRENCY",
    code: code,
  };
}

export default function currencyReducer(
  state = CURRENCY_INITIAL_STATE,
  action: { type: "SET_CURRENCY"; code: string }
) {
  switch (action.type) {
    case "SET_CURRENCY":
      return handleChange(state, action.code);
    default:
      return state;
  }
}
