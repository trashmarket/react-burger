import { postRequest } from "../../utils/request"
import { checkResponse } from "../../utils/utils";
import { setCookie } from '../../utils/utils'

export const APPLY_PERSON_REQUEST = 'APPLY_NEW_PERSON_REQUEST';
export const APPLY_PERSON_FAILED = 'APPLY_NEW_PERSON_FAILED';
export const APPLY_PERSON_SUCCESS = 'APPLY_NEW_PERSON_SUCCESS';
export const MAKE_PERSON_TOKE = 'MAKE_PERSON_TOKE';
export const APPLY_PERSON_EXIT_REQUEST = 'APPLY_PERSON_EXIT_REQUEST';
export const APPLY_PERSON_EXIT_FAILED = 'APPLY_PERSON_EXIT_FAILED';
export const APPLY_PERSON_EXIT_SUCCESS = 'APPLY_PERSON_EXIT_SUCCESS';

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

      let authToken = res.accessToken.split('Bearer ')[1];
      setCookie('token', authToken);
      setCookie('refreshToken', res.refreshToken);
    })
    .catch((error) => {
      dispatch({
        type: APPLY_PERSON_FAILED,
      });
      console.log(error);
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
      console.log(error);
    })
}