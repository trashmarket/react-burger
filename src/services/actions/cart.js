import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
import { postOrderRequest } from "../../utils/request"
import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  APPLY_ORDER_DETAILS_SUCCESS,
  APPLY_ORDER_DETAILS_REQUEST,
  APPLY_ORDER_DETAILS_FAILED,
  GET_CURRENT_CLICK_TAB,
} from "../constants";

export const selectCart = state => state.cart

export const clickTab = (currentTabClick) => ({
  type: GET_CURRENT_CLICK_TAB,
  currentTabClick 
})

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
