import { postRequest, getUserRequest, patchUserRequest, upadateToken } from "../../utils/request"
import { checkResponse, setCookieCompleteDoble, deleteCookie } from "../../utils/utils";
import { TUser, TExitBody } from '../types/data';
import {
  APPLY_PERSON_REQUEST,
  APPLY_PERSON_FAILED,
  APPLY_PERSON_SUCCESS,
  APPLY_PERSON_EXIT_REQUEST,
  APPLY_PERSON_EXIT_FAILED,
  APPLY_PERSON_EXIT_SUCCESS
} from '../constants';

export const selectPerson = (state: any) => state.person;

type TForm = {
  readonly email: string;
  readonly password: string;
  readonly name?: string;
}

type TRefreshToken = {
  readonly token: string
}

type TPostResponse = {
  readonly accessToken: string;
  readonly refreshToken: string;
} & TUser

interface IApplyPersonSuccesAction {
  readonly type: typeof APPLY_PERSON_SUCCESS;
  readonly person: TPostResponse; 
}

interface IApplyPersonRequestAction {
  readonly type: typeof APPLY_PERSON_REQUEST; 
}

interface IApplyPersonFailedActiopn {
  readonly type: typeof APPLY_PERSON_FAILED
}

interface IApplyPersonExitRequestAction {
  readonly type: typeof APPLY_PERSON_EXIT_REQUEST
}

interface IApplyPersonExitSuccessAction {
  readonly type: typeof APPLY_PERSON_EXIT_SUCCESS;
  readonly exitBody: TExitBody
}

interface IApplyPersonExitFailedAction {
  readonly type: typeof APPLY_PERSON_EXIT_FAILED
}

export type TPersonActions = 
  | IApplyPersonExitFailedAction
  | IApplyPersonExitSuccessAction
  | IApplyPersonExitRequestAction
  | IApplyPersonFailedActiopn
  | IApplyPersonRequestAction
  | IApplyPersonSuccesAction

const applyPersonSuccesAction = (person: TPostResponse): IApplyPersonSuccesAction => ({
  type: APPLY_PERSON_SUCCESS,
  person  
})

const applyPersonRequestAction = (): IApplyPersonRequestAction => ({
  type: APPLY_PERSON_REQUEST
})

const applyPersonFailedActiopn = (): IApplyPersonFailedActiopn => ({
  type: APPLY_PERSON_FAILED
})

const applyPersonExitRequest = (): IApplyPersonExitRequestAction => ({
  type: APPLY_PERSON_EXIT_REQUEST
})

const applyPersonExitSuccessAction = (exitBody: TExitBody): IApplyPersonExitSuccessAction => ({
  type: APPLY_PERSON_EXIT_SUCCESS,
  exitBody
})

const applyPersonExitFailedAction = (): IApplyPersonExitFailedAction => ({
  type: APPLY_PERSON_EXIT_FAILED
})

export const postPerson = (url: string, form: TForm) => (dispatch: any) => {
  dispatch(applyPersonRequestAction());

  postRequest(url, form)
    .then(checkResponse)
    .then((res) => {
      dispatch(applyPersonSuccesAction(res));
      setCookieCompleteDoble(res)
    })
    .catch((error) => {
      dispatch(applyPersonFailedActiopn());
    });
  }

export const postLogOut = (url: string, refreshToken: TRefreshToken) => (dispatch: any) => {
  dispatch(applyPersonExitRequest());

  postRequest(url, refreshToken)
    .then(checkResponse)
    .then((res) => {
      dispatch(applyPersonExitSuccessAction(res))
    })
    .catch((error) => {
      dispatch(applyPersonExitFailedAction())
    });
}

export const getUserAuth = (url: string) => {

return function updateUserAction(dispatch: any) {

  dispatch(applyPersonRequestAction());

  getUserRequest(url)
    .then(checkResponse)
    .then((res) => {
      dispatch(applyPersonSuccesAction(res));
    })
    .catch((error) => {
      if (error.message === "jwt expired") {
        upadateToken().then((res) => {
          setCookieCompleteDoble(res);
          updateUserAction(dispatch);
        });
        return;
      }

      dispatch(applyPersonFailedActiopn());
    });
};
}

export const patchUserAuth = (url: string, body: TForm) => {
  return function updateUserAction(dispatch: any) {
  dispatch(applyPersonRequestAction());

  patchUserRequest(url, body)
    .then(checkResponse)
    .then(res => {
      dispatch(applyPersonSuccesAction(res))
    })
    .catch((error) => {
      if (error.message === "jwt expired") {
        upadateToken().then((res) =>{
          setCookieCompleteDoble(res)
          updateUserAction(dispatch)
        })
      }
      
      dispatch(applyPersonFailedActiopn());
    })  
}
}




