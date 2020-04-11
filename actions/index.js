import * as types from './types';
import { Toast } from 'native-base';

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

export const addToCart = dispatch => async (sku, quantity) => {
  dispatch({ type: types.ADD_TO_CART_START });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sku, quantity })
  };

  const response = await fetch('http://test.cfarma.cc/api/cart/add', options);

  if (response.ok) {
    Toast.show({
      text: 'Adicionado ao carrinho!',
      duration: 3000
    });

    loadCart(dispatch);

    return dispatch({ type: types.ADD_TO_CART_END });
  }

  Toast.show({
    text: 'Ocorreu um problema, tente novamente',
    duration: 3000,
    type: 'warning'
  });

  return dispatch({ type: types.ADD_TO_CART_ERROR });
}

export const updateCart = dispatch => async (sku, quantity) => {
  dispatch({ type: types.UPDATE_CART_START });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sku, quantity })
  };

  const response = await fetch('http://test.cfarma.cc/api/cart/add', options);

  if (response.ok) {
    Toast.show({
      text: 'Carrinho atualizado!',
      duration: 3000
    });

    loadCart(dispatch);

    return dispatch({ type: types.UPDATE_CART_END });
  }

  Toast.show({
    text: 'Ocorreu um problema, tente novamente',
    duration: 3000,
    type: 'warning'
  });

  return dispatch({ type: types.UPDATE_CART_ERROR });
}

export const removeFromCart = dispatch => async (sku) => {
  dispatch({ type: types.REMOVE_FROM_CART_START });

  const options = { method: 'DELETE' };

  const response = await fetch(`http://test.cfarma.cc/api/cart/remove/${sku}`, options);

  if (response.ok) {
    Toast.show({
      text: 'Removido do carrinho!',
      duration: 3000
    });

    loadCart(dispatch);

    return dispatch({ type: types.REMOVE_FROM_CART_END });
  }

  Toast.show({
    text: 'Ocorreu um problema, tente novamente',
    duration: 3000,
    type: 'warning'
  });

  return dispatch({ type: types.REMOVE_FROM_CART_ERROR });
}

export const filterProducts = dispatch => (filterTerm) => dispatch({ type: types.FILTER_PRODUCTS, payload: filterTerm });

export const filterCart = dispatch => (filterTerm) => dispatch({ type: types.FILTER_CART, payload: filterTerm });