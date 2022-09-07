import {
  APPLY_PASS_REQUEST,
  APPLY_PASS_FAILED,
  APPLY_PASS_SUCCES
} from '../actions/password'

const initialState = {
  passRequest: false,
  passRequestFailed: false,
  passwordSuccess: false,
  passwordMessage: {}
}

export const passReducer = (state = initialState, action) => {
  switch(action.type) {
    case APPLY_PASS_REQUEST: {
      return {
        ...state,
        passRequest: true
      };
    }
    case APPLY_PASS_SUCCES: {
      return {
        ...state,
        passRequest: false,
        passRequestFailed: false,
        passwordMessage: action.message,
        passwordSuccess: action.message.success
      };
    }

    case APPLY_PASS_FAILED: {
      return {
        ...state,
        passRequest: false,
        passRequestFailed: true,
      };
    }
    default: {
      return state
    }
  }
}