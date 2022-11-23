import { type } from 'os';
import {
  WS_CONNECTION_START_ALL,
  WS_CONNECTION_START_PRIVATE,
  WS_CLOSE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ITEMS_MESSAGE
} from '../constants'


export const selectOrders = (state: any) => state.wsSocketOrders

type TWsConnection = 
  | typeof WS_CONNECTION_START_ALL
  | typeof  WS_CONNECTION_START_PRIVATE
  | typeof WS_CONNECTION_SUCCESS
  | typeof WS_CONNECTION_ERROR
  | typeof WS_CONNECTION_CLOSED
  | typeof WS_GET_ITEMS_MESSAGE

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

export const ConnectionWsAction = (type: TWsConnection) => ({
  type
})

export const startWsConnectionAction = (type: TWsConnection, payload: string): IStartWsConnectionAction => ({
  type,
  payload
}) 

export const closeWsAction = (): ICloseWsAction => ({
  type: WS_CLOSE
})
