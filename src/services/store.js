import { rootReduser } from "./reducers";
import thunk from "redux-thunk";
import { compose, createStore, applyMiddleware } from "redux";
import { socketMiddleware } from './middleware/socket-middleware';
import { wsUrl } from '../utils/constants';
import { 
  WS_CONNECTION_START_PRIVET,
  WS_CONNECTION_START_ALL
   } from './actions/ws-action'

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsUrl, WS_CONNECTION_START_ALL),
    socketMiddleware(wsUrl, WS_CONNECTION_START_PRIVET, true)
  )
);

export const store = createStore(rootReduser, enhancer);