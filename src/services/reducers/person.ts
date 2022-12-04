import { TUser, TExitBody } from '../types/data'
import {
  APPLY_PERSON_REQUEST,
  APPLY_PERSON_FAILED,
  APPLY_PERSON_SUCCESS,
  APPLY_PERSON_EXIT_REQUEST,
  APPLY_PERSON_EXIT_FAILED,
  APPLY_PERSON_EXIT_SUCCESS,
} from '../constants'
import { TPersonActions } from '../actions/person'

export type TInitialStatePerson = {
  passRequest: boolean;
  passRequestFailed: boolean;
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUser;
  isLoaded: boolean;
  exitRequest: boolean;
  exitSuccess?: boolean;
  exitFailed: boolean;
  exitBody: TExitBody
}

const initialState: TInitialStatePerson = {
  passRequest: false,
  passRequestFailed: false,
  success: false,
  accessToken: '',
  refreshToken: '',
  user: {
    email: '',
    name: ''
  },
  isLoaded: false,

  exitRequest: false,
  exitSuccess: false,
  exitFailed: false,
  exitBody: {}  
}

const personReduser = (state = initialState, action: TPersonActions): TInitialStatePerson => {
  switch(action.type) {

    case APPLY_PERSON_REQUEST: {
      return {
        ...state,
        passRequest: true
      };
    }

    case APPLY_PERSON_SUCCESS: {
      return {
        ...state,
        passRequest: false,
        passRequestFailed: false,
        success: action.person.success,
        user: action.person.user,
        isLoaded: true
      };
    }

    case APPLY_PERSON_FAILED: {
      return {
        ...state,
        passRequest: false,
        passRequestFailed: true,
        success: false,
        isLoaded: true
      };
    }

    case APPLY_PERSON_EXIT_REQUEST: {
      return {
        ...state,
        exitRequest: true
      };
    }

    case APPLY_PERSON_EXIT_SUCCESS: {
      return {
        ...state,
        exitBody: action.exitBody,
        exitRequest: false,
        exitFailed: false,
        exitSuccess: action.exitBody.success,
        success: false,
        user: {
          name: '',
          email: ''
        }
      };
    }

    case APPLY_PERSON_EXIT_FAILED: {
      return {
        ...state,
        exitFailed: true,
        exitRequest: false,
        exitSuccess: true
      }
    }

    default: {
      return state
    }
  }
}

export { personReduser }