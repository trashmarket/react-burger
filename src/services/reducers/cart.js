import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
} from "../actions/cart";

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,

  errorStatus: '',

  selectedItems: [],
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
    default: {
        return state
    }
  }
};
