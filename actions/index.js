import * as types from './types';

// Action creators
export const loadProducts = async (dispatch) => {
  dispatch({ type: types.LOAD_PRODUCTS_START });

  const response = await fetch('http://test.cfarma.cc/api/product');

  if (response.ok) {
    const responseJson = await response.json();
    return dispatch({ type: types.LOAD_PRODUCTS_END, payload: responseJson });
  }

  return dispatch({ type: types.LOAD_PRODUCTS_ERROR });
}

export const loadCart = async (dispatch) => {
  dispatch({ type: types.LOAD_CART_START });

  const response = await fetch('http://test.cfarma.cc/api/cart');

  if (response.ok) {
    const responseJson = await response.json();
    return dispatch({ type: types.LOAD_CART_END, payload: responseJson });
  }

  return dispatch({ type: types.LOAD_CART_ERROR });
}