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
import { 
  AppDispatch,
  RootState,
  AppThunk
 } from '../types';

export const selectPerson = (state: RootState) => state.person;

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
  readonly success: boolean;
  readonly user: TUser
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

export const postPerson: AppThunk = (url: string, form: TForm) => (dispatch: AppDispatch) => {
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

export const postLogOut: AppThunk = (url: string, refreshToken: TRefreshToken) => (dispatch: AppDispatch) => {
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

export const getUserAuth: AppThunk = (url: string) => {

return function updateUserAction(dispatch: AppDispatch) {

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

export const patchUserAuth: AppThunk = (url: string, body: TForm) => {
  return function updateUserAction(dispatch: AppDispatch) {
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




