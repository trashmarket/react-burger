import OrderDetails from "../../components/order-details/order-details";
import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEM_CART,
  GET_INCREMENT_CART,
  GET_DECREMENT_CATR,
  APPLY_ORDER_DETAILS
} from "../actions/cart";

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,

  errorStatus: '',

  itemCart: {},

  selectedItems: [],

  currentModal: '',

  basketIngredients: {
    cost: 0,
    ingredientsId: []
  },

  orderDetails:{}
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false,
        errorStatus: action.status
      };
    }
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        itemsRequest: false,
        items: action.data,
      };
    }
    case GET_ITEM_CART: {
      return {
        ...state,
        itemCart: action.itemCart,
        currentModal: action.currentModal
      };
    }
    case GET_INCREMENT_CART: {
      return {
        ...state,
        basketIngredients: {
          cost: state.basketIngredients.cost + action.cost,
          ingredientsId: [...state.basketIngredients.ingredientsId, action.id]                     
        }
      };
    }
    case GET_DECREMENT_CATR: {
      return {
        ...state,
        basketIngredients: {
          cost: state.basketIngredients.cost ? state.cost + action.cost : 0,
          ingredientsId: [...state.basketIngredients.ingredientsId].filter(id => id !== action.id)
        }
      };
    }
    case APPLY_ORDER_DETAILS: {
      return {
        ...state,
        orderDetails: action.orderDetails,
        currentModal: action.currentModal
      }
    }
    default: {
        return state
    }
  }
};
