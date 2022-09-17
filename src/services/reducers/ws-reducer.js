import { 
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ITEMS_MESSAGE
 } from '../actions/ws-action';

 const initionState = {
  wsConnectede: false,
  orders: [],
  total: 0,
  totalToday: 0
 }

export const wsReduser = (state = initionState, action) => {
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
        oreders: [],
      };
    }

    case WS_GET_ITEMS_MESSAGE: {
      return {
        ...state,
        orders: action.restParsedData.orders,
        total: action.restParsedData.total,
        totalToday: action.restParsedData.totalToday
      };
    }

    default: 
      return state;
  }
} 
