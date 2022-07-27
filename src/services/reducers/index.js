import { combineReducers } from 'redux';
import { cartReducer } from './cart';

export const rootReduser = combineReducers({
    cart: cartReducer,
})