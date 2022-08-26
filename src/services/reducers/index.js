import { combineReducers } from 'redux';
import { cartReducer } from './cart';
import { passReducer } from './password'
export const rootReduser = combineReducers({
    cart: cartReducer,
    password: passReducer
})