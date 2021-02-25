import { StateTypes } from "../Store";

export interface CounterTypes {
  value: number
}

export const COUNTER_INITIAL_VALUE: CounterTypes = {
  value: 1
}

export const COUNTER_INITIAL_STATE = {
  counter: COUNTER_INITIAL_VALUE
}

function handleChange(state, step: number) {
  return {
    value: state.value + step
  }
}

/* TODO: EXPORT ACTIONS */

export default function counterReducer(state = COUNTER_INITIAL_STATE, action: {type: 'COUNTER_INCREASE' | 'COUNTER_DECREASE'}) {
  switch(action.type) {
    case 'COUNTER_INCREASE':
      return handleChange(state, 1);
    case 'COUNTER_DECREASE':
      return handleChange(state, -1);
    default:
      return state;
  }
}