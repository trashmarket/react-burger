import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";
import { postOrderRequest } from "../../utils/request";
import { TItems, TItemSelect } from '../types/data';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
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

export const selectCart = (state: any) => state.cart;

interface IgetDecrementCartAction {
  readonly type: typeof GET_DECREMENT_CATR;
  readonly index: number;
  readonly cost: number;
  readonly id: string;
}

export const getDecrementCartAction = (index: number, price: number, _id: string): IgetDecrementCartAction => ({
  type: GET_DECREMENT_CATR,
  index: index,
  cost: price,
  id: _id,
})

interface IgetcCurrentTabAction {
  readonly type: typeof GET_CURRENT_TAB;
  readonly currentTab: string;
}

export const getcCurrentTabAction = (tab: string): IgetcCurrentTabAction => ({
  type: GET_CURRENT_TAB,
  currentTab: tab,
})

interface IdragDropLiAction {
  readonly type: typeof GET_DRAG_DROP_LI;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export const dragDropLiAction = (dragIndex: number, hoverIndex: number): IdragDropLiAction => ({
  type: GET_DRAG_DROP_LI,
  dragIndex: dragIndex + 1,  
  hoverIndex: hoverIndex + 1
})

interface IgetCurrentLocalStateAction {
  readonly type: typeof GET_CURENT_LOCAL_STATE;
  readonly locationState: any; 
}

export const getCurrentLocalStateAction = (location: any): IgetCurrentLocalStateAction => ({
  type: GET_CURENT_LOCAL_STATE,
  locationState: location.state.fromLogin,
})

interface IdropBunAction {
  readonly type: typeof GET_DROP_BUN;
  readonly itemType: string;
  readonly item: TItemSelect
}

export const dropBunAction = (item: TItems): IdropBunAction => ({
  type: GET_DROP_BUN,
  itemType: item.type,
  item: { ...item, uuid:uuidv4() }
})

interface IdropItemAction {
 readonly type: typeof GET_DROP_ITEM;
 readonly itemType: string;
 readonly item: TItemSelect;
}

export const dropItemAction = (item: TItems): IdropItemAction => ({
  type: GET_DROP_ITEM,
  itemType: item.type,
  item: {...item, uuid:uuidv4()}
})

interface IclickTab {
  readonly type: typeof GET_CURRENT_CLICK_TAB;
  readonly currentTabClick: string;
}

export const clickTab = (currentTabClick: string): IclickTab => ({
  type: GET_CURRENT_CLICK_TAB,
  currentTabClick 
})

export type TcartActions = 
  | IgetDecrementCartAction
  | IgetcCurrentTabAction
  | IdragDropLiAction
  | IgetCurrentLocalStateAction
  | IdropBunAction
  | IdropItemAction
  | IclickTab;

export const getItems = () => (dispatch: any) => {
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

export const postOrder = (url: string, ingredientsId: any) => (dispatch: any) => {
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
