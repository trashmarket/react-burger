import { postRequest } from "../../utils/request"
import { checkResponse } from "../../utils/utils";
import { 
  APPLY_PASS_REQUEST,
  APPLY_PASS_FAILED,
  APPLY_PASS_SUCCES
} from '../constants'

export const selectPassword = state => state.password;

export const postEmail = (url, email) => (dispatch) => {
  dispatch({
    type: APPLY_PASS_REQUEST
  });

  postRequest(url, email)
    .then(checkResponse)
    .then((res) => {
      dispatch({
        type: APPLY_PASS_SUCCES,
        message: res,
      });
    })
    .catch((error) => {
      dispatch({
        type: APPLY_PASS_FAILED,
      });
      console.log(error);
    });
  }
