import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
import { postRequest, postOrderRequest } from "../../utils/request"
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";
export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_INCREMENT_CART = "GET_INCREMENT_CART";
export const GET_DECREMENT_CATR = "GET_DECREMENT_CATR";
export const APPLY_ORDER_DETAILS_SUCCESS = "APPLY_ORDER_DETAILS_SUCCESS";
export const APPLY_ORDER_DETAILS_REQUEST = "APPLY_ORDER_DETAILS_REQUEST";
export const APPLY_ORDER_DETAILS_FAILED = "APPLY_ORDER_DETAILS_FAILED";
export const GET_CURRENT_TAB = "GET_CURRENT_TAB";
export const GET_DROP_ITEM = "GET_DROP_ITEM";
export const GET_DROP_BUN = "GET_DROP_BUN";
export const GET_DRAG_DROP_LI = "GET_DRAG_DROP_LI";
export const GET_CURRENT_CLICK_TAB = "GET_CURRENT_CLICK_TAB";
export const GET_CURENT_LOCAL_STATE = "GET_CURENT_LOCAL_STATE";

export const selectCart = state => state.cart

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

export const postOrder = (url, ingredientsId) => (dispatch) => {
  dispatch({
    type: APPLY_ORDER_DETAILS_REQUEST,
  });

  postOrderRequest(url, ingredientsId)
    .then(checkResponse)
    .then((result) =>
      dispatch({
        type: APPLY_ORDER_DETAILS_SUCCESS,
        orderDetails: result,
        currentModal: "orderDetails",
      })
    )
    .catch((errorMessage) => {
      dispatch({
        type: APPLY_ORDER_DETAILS_FAILED,
      });
      console.log(errorMessage);
    });
};

export const clickTab = (currentTabClick) => ({
  type: GET_CURRENT_CLICK_TAB,
  currentTabClick 
})