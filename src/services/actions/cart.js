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
  GET_DROP_BUN,
  GET_DROP_ITEM,
  GET_CURENT_LOCAL_STATE,
  GET_DRAG_DROP_LI,
  GET_CURRENT_TAB,
  GET_DECREMENT_CATR
} from "../constants";
import { v4 as uuidv4 } from 'uuid';

export const selectCart = state => state.cart

export const getDecrementCartAction = (index, price, _id) => ({
  type: GET_DECREMENT_CATR,
  index: index,
  cost: price,
  id: _id,
})

export const getcCurrentTabAction = (tab) => ({
  type: GET_CURRENT_TAB,
  currentTab: tab,
})

export const dragDropLiAction = (dragIndex, hoverIndex) => ({
  type: GET_DRAG_DROP_LI,
  dragIndex: dragIndex + 1,  
  hoverIndex: hoverIndex + 1
})

export const getCurrentLocalStateAction = (location) => ({
  type: GET_CURENT_LOCAL_STATE,
  locationState: location.state.fromLogin,
})

export const dropBunAction = (item) => ({
  type: GET_DROP_BUN,
  itemType: item.type,
  item: { ...item, uuid:uuidv4() }
})

export const dropItemAction = (item) => ({
  type: GET_DROP_ITEM,
  itemType: item.type,
  item: {...item, uuid:uuidv4()}
})

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
