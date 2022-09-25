import {
  WS_CONNECTION_START_ALL_ORDER,
  WS_CONNECTION_START_PRIVATE_ORDER,
  WS_GET_ITEMS_MESSAGE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED
} from "../actions/ws-action";
import { getCookie } from '../../utils/utils'

export const socketMiddleware = (wsUrl) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type } = action;
      
      if ( type === WS_CONNECTION_START_ALL_ORDER ) {
        socket = new WebSocket(wsUrl + '/' + 'all');
      }

      if ( type === WS_CONNECTION_START_PRIVATE_ORDER ) {
        socket = new WebSocket(wsUrl + '?token=' + getCookie('token'));
      }

      if ( type === WS_CONNECTION_CLOSED && socket) {
        socket.close();
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: WS_GET_ITEMS_MESSAGE, restParsedData });
        };

        socket.onclose = event => {
          console.log('helloCloseSocket')
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
          socket = null 
        };

      }

      next(action);
    };
  };
};