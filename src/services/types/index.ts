import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TcartActions } from '../actions/cart';
import { TPassWordActions } from '../actions/password';
import { TPersonActions } from '../actions/person';
import { TWsActions } from '../actions/ws-action';

type TApplicationActions = TcartActions | TPassWordActions | TPersonActions | TWsActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
