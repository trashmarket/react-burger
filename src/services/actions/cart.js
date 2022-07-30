import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";
export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEM_CART = 'GET_ITEM_CART';
export const GET_INCREMENT_CART = 'GET_INCREMENT_CART';
export const GET_DECREMENT_CATR = 'GET_DECREMENT_CATR';
export const APPLY_ORDER_DETAILS = 'APPLY_ORDER_DETAILS';

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

