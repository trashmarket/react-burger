import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";
export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";

export const getItems = () => (dispatch) => {
  dispatch({
    type: GET_ITEMS_REQUEST,
  });

  fetch(`${baseUrl}ingredients`)
    .then(checkResponse)
    .then((res) => {
      dispatch({
        type: GET_ITEMS_SUCCESS,
        data: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ITEMS_FAILED,
        status: error,
      });
    });
};
