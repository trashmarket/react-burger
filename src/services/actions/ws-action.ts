import { type } from 'os';
import {
  WS_CONNECTION_START_ALL,
  WS_CONNECTION_START_PRIVATE,
  WS_CLOSE
} from '../constants'

export const WS_CONNECTION_START_PRIVATE_ORDER = 'WS_CONNECTION_START_PRIVATE_ORDER' 
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_ITEMS_MESSAGE = 'WS_GET_ITEMS_MESSAGE';

export const selectOrders = (state: any) => state.wsSocketOrders

type TWsConnection = typeof WS_CONNECTION_START_ALL | typeof  WS_CONNECTION_START_PRIVATE;

interface IStartWsConnectionAction {
  readonly type: TWsConnection;
  readonly payload: string;
}

interface ICloseWsAction {
  readonly type: typeof WS_CLOSE;
}

export type TWsActions = 
  | IStartWsConnectionAction
  | ICloseWsAction

export const startWsConnectionAction = (type: TWsConnection, payload: string): IStartWsConnectionAction => ({
  type,
  payload
}) 

export const closeWsAction = (): ICloseWsAction => ({
  type: WS_CLOSE
})
