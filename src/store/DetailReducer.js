import {
  FETCH_PRODUCTS,
  LOADING,
  SEARCH_PRODUCT,
  FETCH_PRODUCT,
} from './actions/types';

const initialState = {
  text: '',
  products: [
    {
      name: 'manho',
    },
  ],
  loading: false,
  product: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PRODUCT:
      return {
        ...state,
        text: action.payload,
        loading: false,
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default appReducer;
