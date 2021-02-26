
export interface ProgressStateTypes {
  active: boolean
  message: string
}

export const PROGRESS_INITIAL_STATE = {
  progress: {
    active: false
  }
}

function handleChange(state, data: ProgressStateTypes) {
  return data
}

export function actionSetProgress(message: string) {
  return  {
    type: 'SET_PROGRESS',
    message: message
  }
}

export function actionsHideProgress() {
  return  {
    type: 'HIDE_PROGRESS'
  }
}

export default function progressReducer(state = PROGRESS_INITIAL_STATE, action: {type: string, message?: string}) {
  switch(action.type) {
    case 'SET_PROGRESS':
      return handleChange(state, {
        active:true, message:action.message
      });
    case 'HIDE_PROGRESS':
      return handleChange(state, {
        active:false, message:null
      });
    default:
      return state;
  }
}