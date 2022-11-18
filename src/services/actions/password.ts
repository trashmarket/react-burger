import { type } from "os";
import { postRequest } from "../../utils/request"
import { checkResponse } from "../../utils/utils";
import { 
  APPLY_PASS_REQUEST,
  APPLY_PASS_FAILED,
  APPLY_PASS_SUCCES
} from '../constants';
import {
  TPostEmailBody,
  TpasswordMessage
} from '../types/data'

export const selectPassword = (state: any) => state.password;

interface IapplyPassSuccesAction {
  readonly type: typeof APPLY_PASS_SUCCES;
  readonly message: TpasswordMessage; 
} 

interface IapplyPassRequest {
  readonly type: typeof APPLY_PASS_REQUEST; 
}

interface IapplyPassFailed {
  readonly type: typeof APPLY_PASS_FAILED 
}

export type TPassWordActions = 
  | IapplyPassFailed
  | IapplyPassRequest
  | IapplyPassSuccesAction

const applyPassFailed = (): IapplyPassFailed => ({
  type: APPLY_PASS_FAILED
})

const applyPassRequest = (): IapplyPassRequest => ({
  type: APPLY_PASS_REQUEST
})

const applyPassSuccesAction = (res: TpasswordMessage): IapplyPassSuccesAction => ({
  type: APPLY_PASS_SUCCES,
  message: res
})

export const postEmail = (url: string, email: TPostEmailBody) => (dispatch: any) => {
  dispatch(applyPassRequest());

  postRequest(url, email)
    .then(checkResponse)
    .then((res) => {
      dispatch(applyPassSuccesAction(res));
    })
    .catch((error) => {
      dispatch(applyPassFailed());
      console.log(error);
    });
  }
