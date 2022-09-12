import { combineReducers } from 'redux';
import { cartReducer } from './cart';
import { passReducer } from './password';
import { personReduser } from './person';
export const rootReduser = combineReducers({
    cart: cartReducer,
    password: passReducer,
    person: personReduser
})