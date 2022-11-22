import update from 'immutability-helper';
// import { v4 as uuidv4 } from 'uuid';
import { TItemSelect, TItems, TOrderDetails } from '../types/data';
import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_INCREMENT_CART,
  GET_DECREMENT_CATR,
  APPLY_ORDER_DETAILS_SUCCESS,
  APPLY_ORDER_DETAILS_REQUEST,
  APPLY_ORDER_DETAILS_FAILED,
  GET_CURRENT_TAB,
  GET_DROP_ITEM,
  GET_DROP_BUN,
  GET_DRAG_DROP_LI,
  GET_CURRENT_CLICK_TAB,
  GET_CURENT_LOCAL_STATE
} from "../constants";
import { TcartActions } from '../actions/cart'

type TInitialState = {
  items: ReadonlyArray<TItems>;
  itemsRequest: boolean;
  itemsFailed: boolean;
  errorStatus: number | string;
  selectedItems: Array<TItemSelect>;
  basketIngredients: {
    cost: number;
    ingredientsId: Array<string>;
  };
  orderDetails?: TOrderDetails;
  orderDetailsRequest: boolean;
  orderDetailsFailed: boolean;
  currentTab: string;
  currentTabClick: string;
  currentModal: string
}

const initialState: TInitialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,

  errorStatus: '',

  selectedItems: [],

  basketIngredients: {
    cost: 0,
    ingredientsId: []
  },

  orderDetails: undefined,
  orderDetailsRequest: false,
  orderDetailsFailed: false,
  currentTab: 'one',
  currentTabClick: '',
  currentModal: ''
};

export const cartReducer = (state = initialState, action: TcartActions): TInitialState => {
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
    case GET_INCREMENT_CART: {
      return {
        ...state,
        basketIngredients: {
          cost: state.selectedItems.reduce((previousValue, currentValue: TItemSelect) => {
            if (currentValue.type === 'bun') return previousValue + currentValue.price * 2;
            return previousValue + currentValue.price;
          },0),
          ingredientsId: [...state.selectedItems.map((item: TItemSelect) => item._id)]                     
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
    case APPLY_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderDetails: action.orderDetails,
        currentModal: action.currentModal,
        orderDetailsRequest: false,
        orderDetailsFailed: false,
        selectedItems: []
      }
    }
    case APPLY_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        orderDetailsRequest: true
      }
    }
    case APPLY_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        orderDetailsRequest: false,
        orderDetailsFailed: true
      }
    }
    case GET_CURRENT_TAB: {
      return {
        ...state,
        currentTab: action.currentTab        
      }
    }
    case GET_CURRENT_CLICK_TAB: {
      return {
        ...state,
        currentTabClick: action.currentTabClick
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
        selectedItems: [action.item, ...state.selectedItems.filter((item: TItemSelect) => item.type !== action.itemType )]
      }
    }
    case GET_DRAG_DROP_LI: {
      return {
        ...state,
        selectedItems: update(state.selectedItems, {$splice:[
          [action.dragIndex, 1],
          [action.hoverIndex, 0, state.selectedItems[action.dragIndex]]
        ]})
      }
    }
    case GET_CURENT_LOCAL_STATE: {
      return {
        ...state,
        selectedItems: action.locationState
      }
    }
    default: {
        return state
    }
  }
};