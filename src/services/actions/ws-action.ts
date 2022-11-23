import {
  WS_CONNECTION_START_ALL,
  WS_CONNECTION_START_PRIVATE,
  WS_CLOSE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ITEMS_MESSAGE
} from '../constants'
import { TWsOrders } from '../types/data'; 


export const selectOrders = (state: any) => state.wsSocketOrders

type TrestParseData = {
  readonly orders: Array<TWsOrders>;
  readonly total: number;
  readonly totalToday: number;
}

type TWsConnection = 
  | typeof WS_CONNECTION_START_ALL
  | typeof  WS_CONNECTION_START_PRIVATE
  | typeof WS_CONNECTION_SUCCESS
  | typeof WS_CONNECTION_ERROR
  | typeof WS_CONNECTION_CLOSED;

interface IStartWsConnectionAction {
  readonly type: TWsConnection;
  readonly payload: string;
}

interface ICloseWsAction {
  readonly type: typeof WS_CLOSE;
}

interface IConnectionWsAction {
  readonly type: TWsConnection
}

interface IGetMessage {
  readonly type: typeof WS_GET_ITEMS_MESSAGE;
  readonly restParsedData: TrestParseData
}

export type TWsActions = 
  | IStartWsConnectionAction
  | ICloseWsAction
  | IGetMessage
  | IConnectionWsAction

export const connectionWsAction = (type: TWsConnection): IConnectionWsAction => ({
  type
})

export const startWsConnectionAction = (type: TWsConnection, payload: string): IStartWsConnectionAction => ({
  type,
  payload
})

export const getMessageAction = (restParsedData: TrestParseData): IGetMessage => ({
  type: WS_GET_ITEMS_MESSAGE,
  restParsedData
})

export const closeWsAction = (): ICloseWsAction => ({
  type: WS_CLOSE
})
