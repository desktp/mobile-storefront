import * as types from '../actions/types';

// Initial state
export const initialState = {
  loadingProducts: false,
  searchingProducts: false,
  loadingCart: false,
  searchingCart: false,
  products: [],
  filteredProducts: [],
  cart: [],
  filteredCart: []
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
    case types.FILTER_PRODUCTS: {
      if (!payload) return { ...state, filteredProducts: [], searchingProducts: false };
      
      const regex = new RegExp(payload.toLowerCase(), 'gi');
      return {
        ...state,
        filteredProducts: state.products.filter(product => product.name.toLowerCase().match(regex)),
        searchingProducts: true
      };
    }
    case types.FILTER_CART: {
      if (!payload) return { ...state, filteredCart: [], searchingCart: false };
      
      return {
        ...state,
        filteredCart: state.products.filter(product => product.item && product.item.name.toLowerCase().includes(payload.toLowerCase())),
        searchingCart: false
      };
    }
    default:
      return state;
  }
};
