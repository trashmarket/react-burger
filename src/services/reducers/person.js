import {
  APPLY_PERSON_REQUEST,
  APPLY_PERSON_FAILED,
  APPLY_PERSON_SUCCESS,
  APPLY_PERSON_EXIT_REQUEST,
  APPLY_PERSON_EXIT_FAILED,
  APPLY_PERSON_EXIT_SUCCESS,
  CLEAN_SUCCES_CONSTRUCTOR
} from '../actions/person'

const initialState = {
  passRequest: false,
  passRequestFailed: false,
  success: false,
  accessToken: '',
  refreshToken: '',
  user: {},
  isLoaded: false,

  exitRequest: false,
  exitSuccess: false,
  exitFailed: false,
  exitBody: {}

  
}

const personReduser = (state = initialState, action) => {
  switch(action.type) {

    case CLEAN_SUCCES_CONSTRUCTOR: {
      return {
        ...state,
        success: false
      }
    }

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
        user: {}
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