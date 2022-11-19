import { postRequest, getUserRequest, patchUserRequest, upadateToken } from "../../utils/request"
import { checkResponse, setCookieCompleteDoble, deleteCookie } from "../../utils/utils";
import { authToken } from '../../utils/constants'
import {
  APPLY_PERSON_REQUEST,
  APPLY_PERSON_FAILED,
  APPLY_PERSON_SUCCESS,
  APPLY_PERSON_EXIT_REQUEST,
  APPLY_PERSON_EXIT_FAILED,
  APPLY_PERSON_EXIT_SUCCESS,
  CLEAN_SUCCES_CONSTRUCTOR
} from '../constants'

export const selectPerson = state => state.person;

export const postPerson = (url, form) => (dispatch) => {
  dispatch({
    type: APPLY_PERSON_REQUEST
  });

  postRequest(url, form)
    .then(checkResponse)
    .then((res) => {
      dispatch({
        type: APPLY_PERSON_SUCCESS,
        person: res,
      });

      setCookieCompleteDoble(res)
    })
    .catch((error) => {
      dispatch({
        type: APPLY_PERSON_FAILED,
      });
    });
  }

export const postLogOut = (url, refreshToken) => (dispatch) => {
  dispatch({
    type: APPLY_PERSON_EXIT_REQUEST
  });

  postRequest(url, refreshToken)
    .then(checkResponse)
    .then((res) => {
      dispatch({
        type: APPLY_PERSON_EXIT_SUCCESS,
        exitBody: res
      })
    })
    .catch((error) => {
      dispatch({
        type: APPLY_PERSON_EXIT_FAILED
      })
    });
}

export const getUserAuth = (url) => {

return function updateUserAction(dispatch) {

  dispatch({
    type: APPLY_PERSON_REQUEST,
  });

  getUserRequest(url)
    .then(checkResponse)
    .then((res) => {
      console.log(res);
      dispatch({
        type: APPLY_PERSON_SUCCESS,
        person: res,
      });
    })
    .catch((error) => {
      if (error.message === "jwt expired") {
        upadateToken().then((res) => {
          setCookieCompleteDoble(res);
          updateUserAction(dispatch);
        });
        return;
      }

      dispatch({
        type: APPLY_PERSON_FAILED,
      });
    });
};
}

export const patchUserAuth = (url, body) => {
  return function updateUserAction(dispatch) {
  dispatch({
    type: APPLY_PERSON_REQUEST
  });

  patchUserRequest(url, body)
    .then(checkResponse)
    .then(res => {
      dispatch({
        type: APPLY_PERSON_SUCCESS,
        person: res
      })
    })
    .catch((error) => {
      if (error.message === "jwt expired") {
        upadateToken().then((res) =>{
          setCookieCompleteDoble(res)
          updateUserAction(dispatch)
        })
      }
      
      dispatch({
        type: APPLY_PERSON_FAILED
      });
    })  
}
}




