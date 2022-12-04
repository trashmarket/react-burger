import {
  APPLY_PASS_REQUEST,
  APPLY_PASS_FAILED,
  APPLY_PASS_SUCCES
} from '../constants';
import { TpasswordMessage } from '../types/data';
import { TPassWordActions } from '../actions/password';

type TinitialState = {
  passRequest: boolean;
  passRequestFailed: boolean;
  passwordSuccess: boolean;
  passwordMessage?: TpasswordMessage
}

const initialState: TinitialState = {
  passRequest: false,
  passRequestFailed: false,
  passwordSuccess: false,
  passwordMessage: undefined
}

export const passReducer = (state = initialState, action: TPassWordActions): TinitialState => {
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