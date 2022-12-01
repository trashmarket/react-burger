import { getCookie } from '../../utils/utils';
import { Middleware, Dispatch, MiddlewareAPI} from 'redux';
import { TWsActions } from '../store';
import { connectionWsAction } from '../actions/ws-action';


export const socketMiddleware = (wsUrl: string, typesAction: TWsActions, isAuth = false) => {
   const loggerMiddleware: Middleware = (store: MiddlewareAPI) => {
    let socket: any = null;

    return (next: Dispatch) => action => {

      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { onOpen, onClose, onError, onMessage, onClosed, wsType} = typesAction
      if ( type === wsType ) {
        socket = isAuth ? new WebSocket(wsUrl + payload + getCookie('token')) : new WebSocket(wsUrl + payload);
      } else if ( type === onClose && socket) {
        socket.close();
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(connectionWsAction(onOpen));
        };

        socket.onerror = () => {
          dispatch(connectionWsAction(onError));
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, restParsedData });
        };

        socket.onclose = () => {
          dispatch(connectionWsAction(onClosed));
          socket = null 
        };

      }

      next(action);
    };
  };
  return loggerMiddleware
};
