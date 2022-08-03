import update from 'immutability-helper';
import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEM_CART,
  GET_INCREMENT_CART,
  GET_DECREMENT_CATR,
  APPLY_ORDER_DETAILS,
  GET_CURRENT_TAB,
  GET_DROP_ITEM,
  GET_DROP_BUN
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

  orderDetails:{},

  currentTab: 'one'
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
        selectedItems: action.data.filter((item, index) => index !== 1),
        basketIngredients: {
          ingredientsId: action.data.filter((item, index) => index !== 1).map(item => item._id),
          cost: [...action.data.filter((item, index) => index !== 1)].reduce((previousValue, currentValue) => {
            if (currentValue.type === 'bun') return previousValue + currentValue.price * 2;
            return previousValue + currentValue.price;
          },0)
        }
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
          cost: state.selectedItems.reduce((previousValue, currentValue) => {
            if (currentValue.type === 'bun') return previousValue + currentValue.price * 2;
            return previousValue + currentValue.price;
          },0),
          ingredientsId: [...state.selectedItems.map(item => item._id)]                     
        }
      };
    }
    case GET_DECREMENT_CATR: {
      return {
        ...state,
        selectedItems: [...state.selectedItems.filter((item, index) => index !== action.index + 1)],
        basketIngredients: {
          cost: state.basketIngredients.cost - action.cost,
          ingredientsId: [...state.basketIngredients.ingredientsId].filter((id, index) => index !== action.index + 1)
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
    case GET_CURRENT_TAB: {
      return {
        ...state,
        currentTab: action.currentTab        
      }
    }
    case GET_DROP_ITEM: {
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.item]
      }
    }
    case GET_DROP_BUN: {
      return {
        ...state,
        selectedItems: [action.item, ...state.selectedItems.filter(item => item.type !== action.itemType )]
      }
    }
    default: {
        return state
    }
  }
};
// .filter(item => item.type !== action.itemType)