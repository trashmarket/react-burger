import { rootReduser } from "./reducers";
import thunk from "redux-thunk";
import { compose, createStore, applyMiddleware } from "redux";
import { socketMiddleware } from './middleware/socket-middleware';
import { wsUrl } from '../utils/constants';
import {
  WS_CONNECTION_START_PRIVATE,
  WS_CONNECTION_START_ALL,
  WS_GET_ITEMS_MESSAGE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CLOSE
   } from './constants'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose 

export type TWsActions = {
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClosed: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_ITEMS_MESSAGE;
  onClose: typeof WS_CLOSE;
  wsType?: typeof WS_CONNECTION_START_ALL | typeof WS_CONNECTION_START_PRIVATE;
}

const wsActions: TWsActions = {
  onOpen: WS_CONNECTION_SUCCESS,
  onClosed: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ITEMS_MESSAGE,
  onClose: WS_CLOSE
}

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsUrl, {...wsActions, wsType: WS_CONNECTION_START_ALL}),
    socketMiddleware(wsUrl, {...wsActions, wsType: WS_CONNECTION_START_PRIVATE}, true)
  )
);

export const store = createStore(rootReduser, enhancer);