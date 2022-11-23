import { 
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ITEMS_MESSAGE
 } from '../constants';
import { TWsOrders } from '../types/data' 
import { TWsActions } from '../actions/ws-action';

 type TInitionState = {
  wsConnectede: boolean;
  getItemsSucces: boolean;
  orders: Array<TWsOrders>;
  total: number;
  totalToday: number
 }

 const initionState: TInitionState = {
  wsConnectede: false,
  getItemsSucces: false,
  orders: [],
  total: 0,
  totalToday: 0
 }

export const wsReduser = (state = initionState, action: TWsActions): TInitionState => {
  switch(action.type) {

    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnectede: true
      };
    }

    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnectede: false
      };
    }

    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnectede: false,
        orders: [],
      };
    }

    case WS_GET_ITEMS_MESSAGE: {
      return {
        ...state,
        orders: action.restParsedData.orders,
        total: action.restParsedData.total,
        totalToday: action.restParsedData.totalToday,
        getItemsSucces: true
      };
    }

    default: 
      return state;
  }
} 
