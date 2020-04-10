import React, { useEffect } from 'react';
import { Text, View, Button } from 'react-native';

import { useStateValue } from '../state';
import { loadProducts, loadCart } from '../actions';

export default ({ navigation }) => {
  const [{ products, loadingProducts }, dispatch] = useStateValue();

  useEffect(() => {
    loadProducts(dispatch);
    loadCart(dispatch);
  }, [loadProducts, loadCart]);

  return (
    <View>
      <Text>Product list page</Text>
      <Text>{loadingProducts.toString()}</Text>
      <Text>{products.length}</Text>
      <Button onPress={() => navigation.navigate('Cart')} title='Go to Cart' />
    </View>
  );
}