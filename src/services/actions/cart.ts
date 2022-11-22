import { baseUrl } from "../../utils/constants";
import { checkResponse, checkResponseCart } from "../../utils/utils";
import { postOrderRequest } from "../../utils/request";
import { TItems, TItemSelect } from '../types/data';
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
  GET_DECREMENT_CATR,
  GET_INCREMENT_CART
} from "../constants";
import { v4 as uuidv4 } from 'uuid';
import { AppThunk } from '../types'
import { TOrderDetails } from '../types/data'
export const selectCart = (state: any) => state.cart;

interface IgetDecrementCartAction {
  readonly type: typeof GET_DECREMENT_CATR;
  readonly index: number;
  readonly cost: number;
  readonly id: string;
}

interface IgetcCurrentTabAction {
  readonly type: typeof GET_CURRENT_TAB;
  readonly currentTab: string;
}

interface IdragDropLiAction {
  readonly type: typeof GET_DRAG_DROP_LI;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

interface IgetCurrentLocalStateAction {
  readonly type: typeof GET_CURENT_LOCAL_STATE;
  readonly locationState: any; 
}

interface IdropBunAction {
  readonly type: typeof GET_DROP_BUN;
  readonly itemType: string;
  readonly item: TItemSelect
}

interface IdropItemAction {
  readonly type: typeof GET_DROP_ITEM;
  readonly itemType: string;
  readonly item: TItemSelect;
 }

interface IclickTab {
  readonly type: typeof GET_CURRENT_CLICK_TAB;
  readonly currentTabClick: string;
}

interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}

interface IGetItemsSucces {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly data: Array<TItems>;
}

interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
  readonly status: number
}

interface IGetIncrementCart {
  type: typeof GET_INCREMENT_CART 
}

interface IApplyOrderDetailsRequest {
  type: typeof APPLY_ORDER_DETAILS_REQUEST  
}

interface IApplyOrderDetailsSucces {
  type: typeof APPLY_ORDER_DETAILS_SUCCESS;
  orderDetails: TOrderDetails;
  currentModal: string
}

interface IApplyOrderDetailsFailed {
  type: typeof APPLY_ORDER_DETAILS_FAILED;
}

export const getIncrementCartAction = ():IGetIncrementCart => ({
  type: GET_INCREMENT_CART
})

export const getDecrementCartAction = (index: number, price: number, _id: string): IgetDecrementCartAction => ({
  type: GET_DECREMENT_CATR,
  index: index,
  cost: price,
  id: _id,
})

export const getcCurrentTabAction = (tab: string): IgetcCurrentTabAction => ({
  type: GET_CURRENT_TAB,
  currentTab: tab,
})

export const dragDropLiAction = (dragIndex: number, hoverIndex: number): IdragDropLiAction => ({
  type: GET_DRAG_DROP_LI,
  dragIndex: dragIndex + 1,  
  hoverIndex: hoverIndex + 1
})

export const getCurrentLocalStateAction = (location: any): IgetCurrentLocalStateAction => ({
  type: GET_CURENT_LOCAL_STATE,
  locationState: location.state.fromLogin,
})

export const dropBunAction = (item: TItems): IdropBunAction => ({
  type: GET_DROP_BUN,
  itemType: item.type,
  item: { ...item, uuid:uuidv4() }
})

export const dropItemAction = (item: TItems): IdropItemAction => ({
  type: GET_DROP_ITEM,
  itemType: item.type,
  item: {...item, uuid:uuidv4()}
})

export const clickTab = (currentTabClick: string): IclickTab => ({
  type: GET_CURRENT_CLICK_TAB,
  currentTabClick 
})

const getItemsRequest = (): IGetItemsRequest => ({
  type: GET_ITEMS_REQUEST
})

const getItemsSucces = (data: Array<TItems>): IGetItemsSucces => ({
  type: GET_ITEMS_SUCCESS,
  data
})

const getItemsFailed = (status: number): IGetItemsFailed => ({
  type: GET_ITEMS_FAILED,
  status
});

const applyOrderDetailsRequestAction = (): IApplyOrderDetailsRequest => ({
  type: APPLY_ORDER_DETAILS_REQUEST
}); 

const applyOrderDetailsSuccesAction = (orderDetails: TOrderDetails): IApplyOrderDetailsSucces => ({
  type: APPLY_ORDER_DETAILS_SUCCESS,
  orderDetails,
  currentModal: "orderDetails"
});

const applyOrderDetailsFailedAction = (): IApplyOrderDetailsFailed => ({
  type: APPLY_ORDER_DETAILS_FAILED
})

export type TcartActions = 
  | IgetDecrementCartAction
  | IgetcCurrentTabAction
  | IdragDropLiAction
  | IgetCurrentLocalStateAction
  | IdropBunAction
  | IdropItemAction
  | IclickTab
  | IGetItemsRequest
  | IGetItemsSucces
  | IGetItemsFailed
  | IGetIncrementCart
  | IApplyOrderDetailsRequest
  | IApplyOrderDetailsSucces
  | IApplyOrderDetailsFailed
  
export const getItems: AppThunk = () => (dispatch: any) => {
  dispatch(getItemsRequest());
   
  fetch(`${baseUrl}ingredients`)
    .then(checkResponseCart)
    .then((res) => {
      dispatch(getItemsSucces(res.data));
    })
    .catch((error) => {
      console.log(error)
      dispatch(getItemsFailed(error));
    });
};

export const postOrder = (url: string, ingredientsId: any) => (dispatch: any) => {
  dispatch(applyOrderDetailsRequestAction());

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
      dispatch(applyOrderDetailsFailedAction());
      console.log(errorMessage);
    });
};
