import { getCookie } from '../../utils/utils'

export const socketMiddleware = (wsUrl, typesAction, isAuth = false) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { onOpen, onClose, onError, onMessage, onClosed, wsType} = typesAction
      if ( type === wsType ) {
        socket = isAuth ? new WebSocket(wsUrl + payload + getCookie('token')) : new WebSocket(wsUrl + payload);
      } else if ( type === onClose && socket) {
        socket.close();
      }

      if (socket) {
        socket.onopen = event => {
        
          dispatch({ type: onOpen });
        };

        socket.onerror = event => {
          dispatch({ type: onError });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          console.log(restParsedData);
          dispatch({ type: onMessage, restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClosed, payload: event });
          socket = null 
        };

      }

      next(action);
    };
  };
};