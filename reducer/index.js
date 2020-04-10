import * as types from '../actions/types';

// Initial state
export const initialState = {
  loadingProducts: false,
  loadingCart: false,
  products: [],
  cart: []
};

export default (state, { type, payload }) => {
  switch (type) {
    case types.LOAD_PRODUCTS_START:
      return { ...state, loadingProducts: true };
    case types.LOAD_PRODUCTS_END:
      return { ...state, products: payload, loadingProducts: false };
    case types.LOAD_CART_START:
      return { ...state, loadingCart: true };
    case types.LOAD_CART_END:
      return { ...state, cart: payload.items, loadingCart: false };
    default:
      return state;
  }
};
